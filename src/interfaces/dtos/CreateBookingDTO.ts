import { z } from 'zod';

export const CreateBookingSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  userId: z.string().min(1, "User ID is required"),

  // Convert the text to a date and make sure it is not in the past.
  startTime: z.string().datetime().refine((val) => new Date(val) > new Date(), {
    message: "Start time must be in the future",
  }),
  endTime: z.string().datetime(),
}).refine((data) => new Date(data.endTime) > new Date(data.startTime), {
  message: "End time must be after start time",
  path: ["endTime"], // Specify the path for the error message
});