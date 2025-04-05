import type { Request, Response, NextFunction } from "express";
import { AppError } from "../types";

export const auth = () => (req: Request, res: Response, next: NextFunction): void => {
    const apiKeyHeaderName: string = 'X-API-KEY';
    const apiKeyValue: string = `${process.env.API_KEY}`;

    const apiHeader = req.get(apiKeyHeaderName);
    if (!apiHeader && apiHeader !== apiKeyValue) {
        next({ status: 401, message: 'Unauthorized' } as AppError);
    }

    next();
};
