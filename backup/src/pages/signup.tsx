// // // import { useState } from "react";
// // // import { supabase } from "../utils/supabaseClient";

// // // const Signup = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [username, setUsername] = useState("");
// // //   const [error, setError] = useState("");

// // //   const handleSignup = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     try {
// // //       // Sign up the user using Supabase Auth
// // //       const { data, error: signupError } = await supabase.auth.signUp({
// // //         email,
// // //         password,
// // //       });

// // //       if (signupError) {
// // //         setError(signupError.message);
// // //         return;
// // //       }

// // //       // Insert the username into the profiles table
// // //       const { user } = data;
// // //       if (user) {
// // //         const { error: profileError } = await supabase.from("profiles").insert([
// // //           {
// // //             id: user.id, // Link the username with the user's ID
// // //             username,
// // //           },
// // //         ]);

// // //         if (profileError) {
// // //           setError(profileError.message);
// // //           return;
// // //         }

// // //         alert("Signup successful! Please log in.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error during signup:", error);
// // //       setError("An unexpected error occurred. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex justify-center items-center h-screen">
// // //       <form onSubmit={handleSignup} className="w-1/3 bg-gray-200 p-8 rounded">
// // //         <h1 className="text-2xl mb-4">Signup</h1>
// // //         {error && <p className="text-red-500">{error}</p>}
// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           className="block w-full mb-4 p-2"
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           required
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           className="block w-full mb-4 p-2"
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Username"
// // //           className="block w-full mb-4 p-2"
// // //           onChange={(e) => setUsername(e.target.value)}
// // //           required
// // //         />
// // //         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
// // //           Signup
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Signup;
// // import { useState } from "react";
// // import { supabase } from "../utils/supabaseClient";
// // import { useRouter } from "next/router";

// // const Signup = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [error, setError] = useState("");
// //   const router = useRouter();

// //   const handleSignup = async (e) => {
// //     e.preventDefault();

// //     const { data: authData, error: authError } = await supabase.auth.signUp({
// //       email,
// //       password,
// //     });

// //     if (authError) {
// //       setError(authError.message);
// //     } else {
// //       const user = authData.user;
// //       if (user) {
// //         const { error: profileError } = await supabase.from("profiles").insert([
// //           { id: user.id, username },
// //         ]);

// //         if (profileError) {
// //           setError(profileError.message);
// //         } else {
// //           router.push("/dashboard"); // Redirect to dashboard
// //         }
// //       }
// //     }
// //   };

// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gray-100">
// //       <div className="w-full max-w-md bg-white p-8 rounded shadow">
// //         <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
// //         {error && <p className="text-red-500 mb-4">{error}</p>}
// //         <form onSubmit={handleSignup} className="space-y-4">
// //           <div>
// //             <label className="block font-medium mb-1">Username</label>
// //             <input
// //               type="text"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-medium mb-1">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block font-medium mb-1">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white py-2 rounded"
// //           >
// //             Sign Up
// //           </button>
// //         </form>
// //         <p className="mt-4 text-center">
// //           Already have an account?{" "}
// //           <a href="/" className="text-blue-500 underline">
// //             Login
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;

// import { useState } from "react";
// import { supabase } from "../utils/supabaseClient";
// import { useRouter } from "next/router";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (authError) {
//       setError(authError.message);
//     } else {
//       const user = authData.user;
//       if (user) {
//         const { error: profileError } = await supabase.from("profiles").insert([
//           { id: user.id, username },
//         ]);

//         if (profileError) {
//           setError(profileError.message);
//         } else {
//           router.push("/dashboard"); // Redirect to dashboard
//         }
//       }
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow">
//         <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <a href="/" className="text-blue-500 underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
  return (
    <div>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default SignupPage;
