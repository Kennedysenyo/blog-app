import { db } from "@/db"
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const allBlogs = await db.select().from(blogs);
  return NextResponse.json(allBlogs)
}

export async function POST(req: Request) {

}