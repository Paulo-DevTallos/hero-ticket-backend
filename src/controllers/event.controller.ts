import { NextFunction, Request, Response } from "express";
import { EventUseCase } from "../useCases/eventUseCase";
import { EventEntity } from "../entities/Event";

export class EventController {
    constructor(private eventUseCase: EventUseCase) {}

    async create(req: Request, res: Response, next: NextFunction) {
        let eventData: EventEntity = req.body;
        const files = req.files as any;

        if (files) {
            const banner = files.banner[0];
            const flyers = files.flyers;

            eventData = {
                ...eventData,
                banner: banner.filename,
                flyers: flyers.map((flyer: any) => flyer.filename)
            }

            console.log(eventData)
        }

        try {
            await this.eventUseCase.create(eventData);

            return res.status(201).json({ message: 'Evento criado com sucesso!' });
        } catch (error) {
            next(error);
            // verifica se tem erro e repassa next para o interceptor
        }
    };

    async findEventByLocation(req: Request, res: Response, next: NextFunction) {
        const { lat, lng } = req.query;

        try {
            const latitude = String(lat)
            const longitude = String(lng)

            const events = await this.eventUseCase.findEventByLocation(latitude, longitude);
            return res.status(200).json(events);
        } catch (error) {
            
        }
    };

    async findEventByCategory(req: Request, res: Response, next: NextFunction) {
        const { category } = req.params;

        try {
            const events = await this.eventUseCase.findEventsByCategory(String(category));
            return res.status(200).json(events)
        } catch (error) {
            next(error)
        }
    };
}