import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  technicianName: { type: String, required: true },
  serviceName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);