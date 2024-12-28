
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Add username field
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setError('');
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/feed'); // Redirect to home after login
      } else {
        // Sign up logic with username
        const { data: signupData, error: signupError } = await supabase.auth.signUp(
          { email, password },
          { data: { username } } // Pass username as metadata
        );
        if (signupError) throw signupError;

        // Update user table with the username
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({ id: signupData.user?.id, username });

        if (updateError) throw updateError;

        alert('Signup successful! Please log in.');
        router.push('/'); // Redirect to login page after signup
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/" className="text-blue-500 hover:underline">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
