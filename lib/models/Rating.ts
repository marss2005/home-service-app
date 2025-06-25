import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  bookingId: { type: String, required: false }, // Buat optional
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String },
  technician: { type: String },
  service: { type: String },
  customerName: { type: String },
  customerEmail: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);