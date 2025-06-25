import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 API called");
    
    // Enable MongoDB connection
    await dbConnect();
    
    const body = await request.json();
    console.log("📝 Request body:", body);
    
    // Save to MongoDB instead of mock
    const booking = new Booking(body);
    const savedBooking = await booking.save();

    console.log("💾 Booking saved to MongoDB:", savedBooking._id);

    return NextResponse.json({
      success: true,
      data: savedBooking,
      message: 'Booking created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Enable MongoDB connection
    await dbConnect();
    
    // Fetch real data from MongoDB
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    
    console.log("📋 Fetched bookings:", bookings.length);
    
    return NextResponse.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings: ' + (error as Error).message
    }, { status: 500 });
  }
}