import { db } from "@/db"
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";


// GET all blogs
export async function GET() {
  try {
    const allBlogs = await db.select().from(blogs);
    return NextResponse.json(allBlogs)
  }catch(error) {
    return NextResponse.json({error: "Failed to fetch blogs"}, {status: 500})
  }
}

// Post a new blog
export async function POST(req: Request) {
  try{
    const {title, content} = await req.json();
    const newBlog = await db.insert(blogs).values({ title, content}).returning();
    return NextResponse.json(newBlog);
  }catch {
    return NextResponse.json({error: "Failed to create post"}, {status: 500});
  }
}