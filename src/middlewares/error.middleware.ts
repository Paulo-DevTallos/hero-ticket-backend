import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../interfaces/httpExceptions";

export const errorMiddleware = (error: HttpExceptions, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = error.status ?? 500;
    const message: string = error.message ?? 'Internal server error';

    res.status(statusCode).json({
        statusCode,
        message
    });
}