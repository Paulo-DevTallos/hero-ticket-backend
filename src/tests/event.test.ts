import request from "supertest";
import { EventEntity } from "../entities/Event";
import { App } from "../app";

const app = new App();
const express = app.app;

describe('Event integration test', () => {
    it ('Should test POST caller to create an event', async () => {
        const event: EventEntity = {
            title: 'Evento de teste',
            price: [{ sector: 'Pista', amount: '20' }],
            description: 'Evento descrição',
            city: 'Fortaleza',
            location: { latitude: '-3.8877611', longitude: '-38.6767966' },
            coupons: [],
            date: new Date(),
            participants: [],
            categories: ['Show sertanejo'],
            banner: "",
            flyers: ""
        }

        const response = await request(express)
            .post('/events')
            .field('title', event.title)
            .field('description', event.description)
            .field('city', event.city)
            .field('coupons', event.coupons)
            .field('location[latitude]', event.location.latitude)
            .field('location[longitude]', event.location.longitude)
            .field('price[sector]', event.price[0].sector)
            .field('price[amount]', event.price[0].amount)
            .attach('banner', '/Users/paulo.sergio/Desktop/development-paulo/projetos/banner.png')
            .attach('flyers', '/Users/paulo.sergio/Desktop/development-paulo/projetos/flyer1.png')
            .attach('flyers', '/Users/paulo.sergio/Desktop/development-paulo/projetos/flyer2.png');

        if (response.error) {
            console.log(response.error)
        }

        expect(response.status).toBe(201)
        expect(response.body).toEqual({ message: 'Evento criado com sucesso!' })
    })
})