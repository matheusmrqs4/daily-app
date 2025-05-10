import { Request, Response } from 'express';
import * as dailyService from '../../services/Entity/dailyService';

const handleError = (res: Response, message: string, statusCode: number) => {
  res.status(statusCode).json({ error: message });
};

export const createDaily = async (req: Request, res: Response) => {
    const { title, description, date } = req.body;
    const userId = req.userId;

    if (!userId) {
        return handleError(res, "Unauthorized", 401);
    }

    if (!title || !description) {
        return handleError(res, "Title and description are required", 400);
    }

    try {
        const daily = await dailyService.createDaily({ title, description, date, userId });
        res.status(201).json(daily);
  } catch (err) {
        handleError(res, "Error creating daily", 500);
  }
};

export const getAllDailies = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
        return handleError(res, "Unauthorized", 401);
        }

        const dailies = await dailyService.getAllDailies(req.userId);
        res.json(dailies);
  } catch (err) {
        handleError(res, "Error fetching dailies", 500);
  }
};

export const getDailyById = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
        return handleError(res, "Unauthorized", 401);
        }

        const daily = await dailyService.getDailyById(req.params.id, req.userId);
        if (!daily) return handleError(res, "Daily not found", 404);
        res.json(daily);
  } catch (err) {
        handleError(res, "Error fetching daily", 500);
  }
};

export const updateDaily = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return handleError(res, "Unauthorized", 401);
        }

        const updated = await dailyService.updateDaily(req.params.id, req.userId, req.body);
        if (!updated) return handleError(res, "Daily not found", 404);
        res.json(updated);
  } catch (err) {
        handleError(res, "Error updating daily", 500);
    }
};

export const deleteDaily = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return handleError(res, "Unauthorized", 401);
        }

        const deleted = await dailyService.deleteDaily(req.params.id, req.userId);
        if (!deleted) return handleError(res, "Daily not found", 404);
        res.json({ message: "Daily deleted" });
  } catch (err) {
        handleError(res, "Error updating daily", 500);
    }
};
