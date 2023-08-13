import axios from 'axios';
import { EventEntity } from "../entities/Event";
import { HttpExceptions } from "../interfaces/httpExceptions";
import { EventRepository } from "../repositories/EventRepository";

export class EventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async create(eventData: EventEntity) {
        // tentar uma logica aplicando o includes para diminuir os ifs
        if (!eventData.banner) throw new HttpExceptions(400, 'Banner is required');

        if (!eventData.flyers) throw new HttpExceptions(400, 'Flyers is required');

        if (!eventData.location) throw new HttpExceptions(400, 'Location is required');

        if (!eventData.date) throw new HttpExceptions(400, 'Date is required');

        // verifica se ja existe um evento no mesmo local e horário
        const verifyEvent = await this.eventRepository.findByLocationAndDate(eventData.location, eventData.date);

        if (verifyEvent) throw new HttpExceptions(409, 'Event already exists');

        const cityName = await this.getCityNameByCordinates(
            eventData.location.latitude,
            eventData.location.longitude,
        );

        eventData = { ...eventData, city: cityName }

        const result = await this.eventRepository.add(eventData);
        return result;
    }

    private async getCityNameByCordinates(latitude: string, longitude: string) {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.API_KEY_GOOGLE_MAPS}`
            );

            if (response.data.status === 'OK' && response.data.results.length > 0) {
                // verficar a possibilidade de aplicar o retorno do estado e pais
                const address = response.data.results[0].address_components;
                const cityTypes = address.find((type: any) => 
                    type.types.includes('administrative_area_level_2') && 
                    type.types.includes('political')
                );
    
                return cityTypes.long_name;
            } 

            throw new HttpExceptions(404, 'City not found');
        } catch (error) {
            throw new HttpExceptions(401, 'Error request city name');
        }
    }

    async findEventByLocation(latitude: string, longitude: string) {
        // busca a cidade e depois todos os eventos da cidade
        const cityName = await this.getCityNameByCordinates(latitude, longitude);

        const findEventsByCity = await this.eventRepository.findEventsByCity(cityName);

        const eventWithRadius = findEventsByCity.filter(event => {
            const distance = this.calculateDistantes(
                Number(latitude),
                Number(longitude),
                Number(event.location.latitude),
                Number(event.location.longitude)
            )

            return distance <= 3; // raio de distancia a partir da posição do usuario
        })

        return eventWithRadius;
    }

    public async findEventsByCategory(category: string) {
        if (!category) throw new HttpExceptions(400, 'Category id required');

        const events = await this.eventRepository.findEventsByCategory(category);
        return events;
    }

    // Formula de Haversine
    private calculateDistantes(
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number,
    ): number {
        const radius = 6371 //raio da terra em quilimetros
        const distanceLat = this.deg2rad(lat2 - lat1);
        const distanceLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) + 
            Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) * 
            Math.sin(distanceLng / 2) *
            Math.sin(distanceLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = radius * c;
        
        return d;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}