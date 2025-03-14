import { db } from "@/db";
import { blogs } from "@/db/schema";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";

export default async function Home() {
  const allPosts = await db.select().from(blogs)

  const postElements = allPosts.map(post => (
    <li 
      key={post.id}
      className="p-4 border rounded flex justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-gray-600">{post.content}</p>
      </div>
      <div className="flex space-x-2">
        <Link href={`/edit/${post.id}`} className="bg-blue-500 text-white px-3 py-1 rounded" >Edit</Link>
        <DeletePostButton id={post.id} />
      </div>
    </li>
));

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <Link href="/create" className="bg-green-500 text-white px-4 py-2 rounded">
       ➕ Create New Post
      </Link>

      { allPosts.length === 0 ? (
        <p className="mt-4 text-gray-500">No posts found.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {postElements}
        </ul>
      )

      }
    </main>
  );
}
