import { NextFunction, Request, Response } from "express";
import { errorMiddleware } from "../middlewares/error.middleware";
import { HttpExceptions } from "../interfaces/httpExceptions";

describe('Testing error Middleware', () => {
    it ('Should respond with correct status and message HttpException', () => {
        const httpExpection: HttpExceptions = {
            name: 'HttpException',
            status: 404,
            message: 'Not found'
        };

        /**
         * aplicação de mocks 
         * é preciso implementar as req e res para conseguir simular os casos
         * 
         */
        const req: Partial<Request> = {}
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next: NextFunction = jest.fn();

        errorMiddleware(httpExpection, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ 
            statusCode: 404,
            message: 'Not found' 
        });
    })
})