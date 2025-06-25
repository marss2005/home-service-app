import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Booking API called");
    
    // Parse request body first
    const body = await request.json();
    console.log("📝 Request body:", body);
    
    // Validate required fields (update field names)
    const requiredFields = ['name', 'email', 'phone', 'address', 'preferredDate', 'preferredTime', 'selectedService'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          message: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }
    
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await dbConnect();
    console.log("✅ MongoDB connected");
    
    // Create booking with correct field mapping
    const bookingData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city || '',
      description: body.description || '',
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      selectedService: body.selectedService,
      selectedTechnician: body.selectedTechnician || '',
      status: 'pending',
      price: 0
    };
    
    console.log("📝 Creating booking with mapped data:", bookingData);
    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();

    console.log("💾 Booking saved successfully:", savedBooking._id);

    return NextResponse.json({
      success: true,
      data: savedBooking,
      message: 'Booking created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Booking API Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking: ' + (error as Error).message,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log("📋 GET Bookings API called");
    
    await dbConnect();
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    
    console.log("📋 Fetched bookings:", bookings.length);
    
    return NextResponse.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error("❌ GET Bookings Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings: ' + (error as Error).message
    }, { status: 500 });
  }
}