import Daily from "../../models/Entity/dailyModel";
import mongoose from "mongoose";

interface DailyEntry {
    date?: Date;
    title: string;
    description: string;
    userId: string;
}

export const createDaily = async (data: DailyEntry) => {
    const daily = new Daily(data);
    return await daily.save();
};

export const getAllDailies = async (userId: string) => {
    return await Daily.find({ userId }).sort({ date: -1 });
};

export const getDailyById = async (dailyId: string, userId: string) => {
    return await Daily.findOne({ _id: dailyId, userId });
};

export const updateDaily = async (
    dailyId: string,
    userId: string,
    update: Partial<DailyEntry>
) => {
    return await Daily.findOneAndUpdate(
        { _id: dailyId, userId },
        update,
        { new: true }
    );
};

export const deleteDaily = async (dailyId: string, userId: string) => {
    return await Daily.findOneAndDelete({ _id: dailyId, userId });
};