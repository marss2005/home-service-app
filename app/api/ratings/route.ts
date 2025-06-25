import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Rating from '@/lib/models/Rating';

export async function POST(request: NextRequest) {
  try {
    console.log("⭐ Rating API called");
    
    // Enable MongoDB connection
    await dbConnect();
    
    const body = await request.json();
    console.log("📝 Rating data:", body);
    
    // Save to MongoDB
    const rating = new Rating(body);
    const savedRating = await rating.save();

    console.log("💾 Rating saved to MongoDB:", savedRating._id);

    return NextResponse.json({
      success: true,
      data: savedRating,
      message: 'Rating submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Rating Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save rating: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Enable MongoDB connection
    await dbConnect();
    
    // Fetch real ratings from MongoDB
    const ratings = await Rating.find().sort({ createdAt: -1 }).limit(50);
    
    console.log("⭐ Fetched ratings:", ratings.length);
    
    return NextResponse.json({
      success: true,
      data: ratings
    });
  } catch (error) {
    console.error("❌ GET Ratings Error:", error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch ratings: ' + (error as Error).message
    }, { status: 500 });
  }
}