import { db } from "@/db";
import { blogs } from "@/db/schema";

export default async function PostPage() {
  const allBlogs = await db.select().from(blogs)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4"> Blog Posts</h1>
      {allBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ): (
        <ul>
          {
            allBlogs.map(blog => (
              <li key={blog.id} className="mb-4 p-4 border rounded">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p>{blog.content}</p>
              </li>
            ))
          }
        </ul>
      )}
    </main>
  )

}