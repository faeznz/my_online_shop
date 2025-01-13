import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseConfig';
import PleaseSignInComponent from './components/PleaseSignInComponent';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    checkSession();
  }, []);

  if (session === null) {
    // Still loading session, you might want to show a loading indicator
    return <PleaseSignInComponent/>; 
  }

  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;