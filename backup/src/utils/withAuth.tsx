
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabaseClient'; // Relative path for utils

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // Redirect to login if no user is logged in
          router.push('/');
        }
      };

      checkUser();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
