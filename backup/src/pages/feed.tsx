// // import { useEffect, useState } from "react";
// // import { supabase } from "../utils/supabaseClient";

// // const Feed = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         // Fetch posts along with the username of the post creator
// //         const { data, error } = await supabase
// //           .from("posts")
// //           .select("id, content, created_at, profiles(username)")
// //           .order("created_at", { ascending: false });

// //         if (error) {
// //           console.error("Error fetching posts:", error);
// //           return;
// //         }

// //         setPosts(data || []);
// //       } catch (error) {
// //         console.error("Error fetching posts:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// //   }

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-3xl mb-4">Feed</h1>
// //       {posts.length === 0 ? (
// //         <p>No posts available.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {posts.map((post) => (
// //             <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
// //               <h2 className="text-xl font-bold">{post.profiles.username}</h2>
// //               <p className="text-gray-700">{post.content}</p>
// //               <p className="text-gray-500 text-sm">
// //                 {new Date(post.created_at).toLocaleString()}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Feed;
// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabaseClient";

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch posts with the number of likes
//   const fetchPosts = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("posts")
//         .select(`
//           id,
//           content,
//           created_at,
//           profiles (
//             username
//           ),
//           likes (
//             id
//           )
//         `)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error fetching posts:", error.message);
//         return;
//       }

//       // Transform data to include like counts
//       const postsWithLikes = data.map((post) => ({
//         ...post,
//         likeCount: post.likes ? post.likes.length : 0, // Count likes
//       }));

//       setPosts(postsWithLikes || []);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle like/unlike for a post
//   const handleLike = async (postId) => {
//     try {
//       const { data: session } = await supabase.auth.getSession();
//       if (!session?.session?.user) {
//         alert("You need to log in to like a post.");
//         return;
//       }

//       const userId = session.session.user.id;

//       // Check if the user already liked the post
//       const { data: existingLike, error: fetchError } = await supabase
//         .from("likes")
//         .select("id")
//         .eq("post_id", postId)
//         .eq("user_id", userId)
//         .single();

//       if (fetchError && fetchError.code !== "PGRST116") {
//         console.error("Error checking existing like:", fetchError.message);
//         return;
//       }

//       if (existingLike) {
//         // Unlike the post
//         const { error: unlikeError } = await supabase
//           .from("likes")
//           .delete()
//           .eq("id", existingLike.id);

//         if (unlikeError) {
//           console.error("Error unliking post:", unlikeError.message);
//         }
//       } else {
//         // Like the post
//         const { error: likeError } = await supabase.from("likes").insert([
//           { post_id: postId, user_id: userId },
//         ]);

//         if (likeError) {
//           console.error("Error liking post:", likeError.message);
//         }
//       }

//       // Refresh posts to update like counts
//       fetchPosts();
//     } catch (error) {
//       console.error("Error handling like:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl mb-4">Feed</h1>
//       {posts.length === 0 ? (
//         <p>No posts available.</p>
//       ) : (
//         <div className="space-y-4">
//           {posts.map((post) => (
//             <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
//               <h2 className="text-xl font-bold">{post.profiles.username}</h2>
//               <p className="text-gray-700">{post.content}</p>
//               <p className="text-gray-500 text-sm">
//                 {new Date(post.created_at).toLocaleString()}
//               </p>
//               <div className="flex items-center space-x-4 mt-2">
//                 <button
//                   onClick={() => handleLike(post.id)}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Like
//                 </button>
//                 <span>{post.likeCount} Likes</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;
// this is without logout=======================



import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import withAuth from '../utils/withAuth';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts with the number of likes
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          content,
          created_at,
          profiles (
            username
          ),
          likes (
            id
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
        return;
      }

      // Transform data to include like counts
      const postsWithLikes = data.map((post) => ({
        ...post,
        likeCount: post.likes ? post.likes.length : 0, // Count likes
      }));

      setPosts(postsWithLikes || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle like/unlike for a post
  const handleLike = async (postId) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        alert("You need to log in to like a post.");
        return;
      }

      const userId = session.session.user.id;

      // Check if the user already liked the post
      const { data: existingLike, error: fetchError } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing like:", fetchError.message);
        return;
      }

      if (existingLike) {
        // Unlike the post
        const { error: unlikeError } = await supabase
          .from("likes")
          .delete()
          .eq("id", existingLike.id);

        if (unlikeError) {
          console.error("Error unliking post:", unlikeError.message);
        }
      } else {
        // Like the post
        const { error: likeError } = await supabase.from("likes").insert([
          { post_id: postId, user_id: userId },
        ]);

        if (likeError) {
          console.error("Error liking post:", likeError.message);
        }
      }

      // Refresh posts to update like counts
      fetchPosts();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
              <h2 className="text-xl font-bold">{post.profiles.username}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Like
                </button>
                <span>{post.likeCount} Likes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// export default Feed;
export default withAuth(Feed);