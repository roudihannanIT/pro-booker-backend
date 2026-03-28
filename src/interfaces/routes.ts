import { Router } from "express";
import { BookingController } from "./controllers/BookingController";
import { asyncHandler } from "../shared/utils/asyncHandler";
import authRoutes from "./authRoutes";

const router = Router();
const bookingController = new BookingController();

router.post('/bookings', asyncHandler(bookingController.create));
router.get('/bookings/user/:userId', asyncHandler(bookingController.getUserBookings));
router.delete('/bookings/:id', asyncHandler(bookingController.cancel));

router.use('/api/auth', authRoutes);


export default router;