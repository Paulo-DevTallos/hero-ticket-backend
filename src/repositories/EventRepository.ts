import { EventEntity } from "../entities/Event";
import { LocationEntity } from "../entities/Location";

export interface EventRepository {
    add(event: EventEntity): Promise<EventEntity>;
    findByLocationAndDate(location: LocationEntity, date: Date): Promise<EventEntity | undefined>;
    findEventsByCity(city: string): Promise<EventEntity[]>;
    findEventsByCategory(category: string): Promise<EventEntity[]>;
}