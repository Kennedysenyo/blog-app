"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!id) return; 
    async function loadData() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPost({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Error loading post:", error);
      }
    }

    loadData();
  }, [id]); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(post), 
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Failed to update post");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required
          name="title"
        />

        <textarea
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          name="content"
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          ➕ Save
        </button>
      </form>
    </main>
  );
}
