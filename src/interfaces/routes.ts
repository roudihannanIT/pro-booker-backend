import { Router } from "express";
import { BookingController } from "./controllers/BookingController";
import { asyncHandler } from "../shared/utils/asyncHandler";
import authRoutes from "./authRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const router = Router();
const bookingController = new BookingController();

router.use('/auth', authRoutes);

router.post('/bookings', authMiddleware, asyncHandler(bookingController.create));
router.get('/bookings/user/:userId', authMiddleware, asyncHandler(bookingController.getUserBookings));
router.delete('/bookings/:id', authMiddleware, asyncHandler(bookingController.cancel));

router.use('/api/auth', authRoutes);


export default router;