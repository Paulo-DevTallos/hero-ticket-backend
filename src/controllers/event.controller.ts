import { NextFunction, Request, Response } from "express";
import { EventUseCase } from "../useCases/eventUseCase";
import { EventEntity } from "../entities/Event";

export class EventController {
    constructor(private eventUseCase: EventUseCase) {}

    async create(req: Request, res: Response, next: NextFunction) {
        const eventData: EventEntity = req.body;

        console.log(req.files)
        try {
            await this.eventUseCase.create(eventData);

            return res.status(201).json({ message: 'Evento criado com sucesso!' });
        } catch (error) {
            next(error);
            // verifica se tem erro e repassa next para o interceptor
        }
    }
}