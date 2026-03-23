import { Router } from "express";
import { BookingController } from "./controllers/BookingController";

const router = Router();
const bookingController = new BookingController();

router.post('/bookings', (req, res) => bookingController.create(req, res));
router.get('/bookings/user/:userId', (req, res) => bookingController.getUserBookings(req, res));

export default router;