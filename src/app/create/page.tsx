"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: ""
  })

  console.log(post)

  const router = useRouter();

  async function handleSubmit( e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("api/blogs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(post)
    });

    if(res.ok) {
      router.push("/");
    }

  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  

  return(
    <main className="mx-w-lg mx-auto p-4">
       <h1 className="text-xl font-bold mb-4">Create New Post</h1>
       <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border rounded"
          required
          name="title"
        />

        <textarea 
          placeholder="Content"
          value={post.content}
          onChange={(e) => handleChange(e)}
          name="content"
          className="w-full p-2 border rounded required"
        />
       
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded"> ➕ Create Post</button>
       </form>
    </main>
  )
}

