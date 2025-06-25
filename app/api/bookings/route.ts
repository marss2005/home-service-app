import { NextRequest, NextResponse } from 'next/server';

// Temporary: Comment out MongoDB imports to fix build
// import dbConnect from '@/lib/mongodb';
// import Booking from '@/lib/models/Booking';

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 API called");

    const body = await request.json();
    console.log("📝 Request body:", body);
    
    // Temporary: Return mock response instead of database save
    const mockBooking = {
      _id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    console.log("💾 Mock booking created:", mockBooking._id);

    return NextResponse.json({
      success: true,
      data: mockBooking,
      message: 'Booking created successfully (mock)'
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
    // Return mock data
    const mockBookings = [
      {
        _id: "mock-1",
        name: "John Doe",
        service: "AC Repair",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({
      success: true,
      data: mockBookings
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings'
    }, { status: 500 });
  }
}