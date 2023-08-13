import { EventEntity } from "../entities/Event";
import { EventRepository } from "../repositories/EventRepository";
import { EventUseCase } from "../useCases/eventUseCase"

const MockeventRepository = {
    add: jest.fn(),
    findEventsByCity: jest.fn(),
    findByLocationAndDate: jest.fn(),
    findEventsByCategory: jest.fn(),
}

const eventUseCase = new EventUseCase(MockeventRepository);
const event: EventEntity = {
    title: 'Evento de teste',
    price: [{ sector: 'Pista', amount: '20' }],
    description: 'Evento descrição',
    city: 'Fortaleza',
    location: { latitude: '-3.7645871', longitude: '-38.4837626' },
    coupons: [],
    date: new Date(),
    participants: [],
    categories: ["Show"],
    banner: "banner.png",
    flyers: ["flyer1.png", "flyer2.png"]
}

describe('Unit test for categories functions', () => {
    // limpar os mocks depois que tudo for alocado
    afterEach(() => {
        jest.clearAllMocks();
    })

    it ('Should test the flow to return an Array of events by category', async () => {
        MockeventRepository.findEventsByCategory.mockResolvedValue([event]);
        const result = await eventUseCase.findEventsByCategory('Show')
        console.log(result)

        expect(result).toEqual([event]);
        expect(MockeventRepository.findEventsByCategory).toHaveBeenCalledWith('Show')
    });
})  