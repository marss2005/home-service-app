import { NextRequest, NextResponse } from 'next/server';

// Temporary: Comment out MongoDB
// import dbConnect from '@/lib/mongodb';
// import Rating from '@/lib/models/Rating';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock response
    const mockRating = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: mockRating,
      message: 'Rating submitted successfully (mock)'
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to save rating'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: []
  });
}