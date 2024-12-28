import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import withAuth from '../utils/withAuth';

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get the logged-in user's session
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.user) {
        setError("You must be logged in to create a post.");
        return;
      }

      // Insert the post into the posts table
      const { error: postError } = await supabase.from("posts").insert([
        {
          user_id: session.session.user.id,
          content,
        },
      ]);

      if (postError) {
        setError(postError.message);
        return;
      }

      alert("Post created successfully!");
      router.push("/feed"); // Redirect to the feed page
    } catch (error) {
      console.error("Error creating post:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleCreatePost} className="w-1/3 bg-gray-200 p-8 rounded">
        <h1 className="text-2xl mb-4">Create a Post</h1>
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          placeholder="What's on your mind?"
          className="block w-full mb-4 p-2"
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Post
        </button>
      </form>
    </div>
  );
};

export default withAuth(CreatePost);
