import e from "express";
import mongoose from "mongoose";

interface IDaily extends Document {
  date: Date;
  title: string;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const DailySchema = new mongoose.Schema<IDaily>({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Daily = mongoose.model<IDaily>("Daily", DailySchema);

export default Daily;