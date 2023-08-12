import { EventEntity } from "../entities/Event";

export interface EventRepository {
    add(event: EventEntity): Promise<EventEntity>
}