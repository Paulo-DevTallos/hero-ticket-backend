import mongoose from "mongoose";
import { EventEntity } from "../entities/Event";
import { EventRepository } from "./EventRepository";
import { LocationEntity } from "../entities/Location";

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

    async findByLocationAndDate(location: LocationEntity, date: Date): Promise<EventEntity | undefined> {
        const findEvent = await EventModel.findOne({ location, date }).exec();
        
        return findEvent ? findEvent.toObject() : undefined;
    }
}