
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        {/* <Link href="/" legacyBehavior>
          <a className="hover:underline">Home</a>
        </Link> */}
        <Link href="/feed" legacyBehavior>
          <a className="hover:underline">Feed</a>
        </Link>
        <Link href="/create-post" legacyBehavior>
          <a className="hover:underline">Create Post</a>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
