import { EventEntity } from "../entities/Event";
import { EventRepository } from "../repositories/EventRepository";

export class EventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async create(eventData: EventEntity) {
        const result = await this.eventRepository.add(eventData);

        return result;
    }
}