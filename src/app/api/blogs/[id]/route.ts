import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

// Get a single post (GET /api/posts/:id)
export async function GET(_req: Request, {params} : {params: {id: string}}) {
  try {
    const blog = await db.select().from(blogs).where(eq(blogs.id, Number(params.id)));
    if (blog.length === 0) {
      return NextResponse.json({message: "Post not found"}, {status: 404});
    }
    console.log(blog)
    return NextResponse.json(blog[0], {status: 200});
  }catch (error) {
    return NextResponse.json({message: "Error fetching blog"}, {status: 404});
  }
}

// Update a post (PUT /api/posts/:id)
export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}) {
  try {
    const {title, content} = await req.json()
    const updateBlog = await db
      .update(blogs)
      .set({title, content})
      .where(eq(blogs.id, Number((await params).id)))
      .returning()

      if (updateBlog.length === 0) {
        return NextResponse.json({message: "Blog not found"}, {status: 404});
      }

      console.log(updateBlog[0])
      return NextResponse.json(updateBlog[0], {status: 200})
  } catch(error) {
    return NextResponse.json({message: "Failed to update data.",}, { status: 500})
  }
}


// Delete a post (DELETE /api/posts/:id)
export async function DELETE(_req: Request, {params} : {params : {id: string}}) {
  try {
    const deletedBlog = await db.delete(blogs).where(eq(blogs.id, Number(params.id))).returning();

    if(deletedBlog.length === 0) {
      return NextResponse.json({message: "Blog not found"}, {status: 404});
    }
    return NextResponse.json(deletedBlog[0], {status: 200});
  } catch(error) {
    return NextResponse.json({message: "Error deleting post"}, {status: 500})
  }
}