import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Rating from '@/lib/models/Rating';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log("✅ Database connected for rating");

    const body = await request.json();
    console.log("📝 Rating request body:", body);
    
    const rating = new Rating({
      serviceId: body.serviceId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      technicianName: body.technicianName,
      serviceName: body.serviceName,
      rating: body.rating,
      feedback: body.feedback,
    });

    const savedRating = await rating.save();
    console.log("💾 Rating saved:", savedRating._id);

    return NextResponse.json({
      success: true,
      data: savedRating,
      message: 'Rating submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Error saving rating:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save rating: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const ratings = await Rating.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: ratings
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch ratings'
    }, { status: 500 });
  }
}