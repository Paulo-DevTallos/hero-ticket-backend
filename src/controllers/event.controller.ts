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
        }

        try {
            await this.eventUseCase.create(eventData);

            return res.status(201).json({ message: 'Evento criado com sucesso!' });
        } catch (error) {
            next(error);
            // verifica se tem erro e repassa next para o interceptor
        }
    }
}