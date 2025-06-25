import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const booking = await Booking.create(req.body);
      res.status(201).json({ success: true, data: booking });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
