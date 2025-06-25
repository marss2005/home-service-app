import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  description: String,
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  selectedService: { type: String, required: true },
  selectedTechnician: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
