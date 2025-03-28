import { bookingVisitModel } from "../Models/bookingVisitModel.js";
import { userModel } from "../Models/userModel.js";
import asyncError from "../Middleware/asyncError.js";
import handleError from "../Utils/handleError.js";

export const getAllVisits = asyncError(async (req, res, next) => {
    const visits = await bookingVisitModel.find().populate('user');
    const newVisits = visits.map(visit => {
        return {
            _id: visit._id,
            date: visit.date.toLocaleDateString(),
            user: visit.user.name,
            email: visit.user.email,
            tickets: visit.ticketCount,
            total: visit.total,
            status: visit.status
        }
    });
    res.status(200).json({ success: true, data: newVisits });
});

export const bookVisit = asyncError(async (req, res, next) => {
    const { userId, Ticket, Date } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const book = await bookingVisitModel.create({ ticketCount: Ticket, user: userId, total: Ticket * 50, date: Date, status: 'booked' });
    await userModel.updateOne({ _id: userId }, { $set: { visits: [...user.visits,book._id] } });
    res.status(200).json({ success: true, data: book });
});
