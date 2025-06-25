import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: NextRequest) {
  console.log("🔍 Testing env:", process.env.MONGODB_URI);
  
  try {
    console.log("🔄 Attempting to connect to database...");
    await dbConnect();
    console.log("✅ Database connected successfully");

    const body = await request.json();
    console.log("📝 Request body:", body);
    
    const booking = new Booking({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      description: body.description,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      selectedService: body.selectedService,
      selectedTechnician: body.selectedTechnician,
    });

    const savedBooking = await booking.save();
    console.log("💾 Booking saved:", savedBooking._id);

    return NextResponse.json({
      success: true,
      data: savedBooking,
      message: 'Booking created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings'
    }, { status: 500 });
  }
}