"use client"
import { useRouter } from "next/navigation";

export default function DeletePostButton({id} : {id: number}) {
  const router = useRouter()

  async function handleDelete() {
    const res = await fetch(`/api/blogs/${id}`, {method: "DELETE"});

    if (res.ok) {
      router.refresh(); 
    }
  }

  return(
    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"> Delete</button>
  )
}