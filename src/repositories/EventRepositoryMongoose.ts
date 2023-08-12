import mongoose from "mongoose";
import { EventEntity } from "../entities/Event";
import { EventRepository } from "./EventRepository";

const eventSchema = new mongoose.Schema({
    title: String,
    location: {
        latitude: String,
        longitude: String,
    },
    date: Date,
    created_at: {
        type: Date,
        default: Date.now
    },
    description: String,
    categories: [String],
    banner: String,
    flyers: [String],
    price: {
        type: Array,
    },
    city: String,
    participants: {
        type: Array,
        ref: 'User'
    }
})

const EventModel = mongoose.model('Event', eventSchema)

export class EventRepositoryMongoose implements EventRepository {
    async add(event: EventEntity): Promise<EventEntity> {
        const eventModel = new EventModel(event);

        await eventModel.save();
        return event;
    }
}