import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseConfig";

const NavbarCmsComponent = () => {
  const [session, setSession] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(session);
      }
    };

    getSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) {
          setSession(session);
        }
      }
    );

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center font-black text-2xl">
              Admin CMS
          </Link>
          <div className="flex items-center lg:order-2">
            {session ? (
              <div className="flex items-center">
                <span className="text-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  {session.user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none "
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none 0"
              >
                Sign In
              </Link>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/cms/dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cms/product"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/cms/team"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/cms/faq"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarCmsComponent;