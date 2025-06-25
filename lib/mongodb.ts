import mongoose from 'mongoose';

console.log("🟠 MONGODB_URI = ", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local');

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    }).catch((error) => {
      console.error("❌ MongoDB Connection Error:", error);
      throw error;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
