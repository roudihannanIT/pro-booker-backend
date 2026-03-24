import { Router } from "express";
import { BookingController } from "./controllers/BookingController";
import { asyncHandler } from "../shared/utils/asyncHandler";

const router = Router();
const bookingController = new BookingController();

router.post('/bookings', asyncHandler(bookingController.create));
router.get('/bookings/user/:userId', asyncHandler(bookingController.getUserBookings));
router.delete('/bookings/:id', asyncHandler(bookingController.cancel));


export default router;