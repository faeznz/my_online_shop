import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseConfig";

const NavbarComponent = () => {
    const [session, setSession] = useState(null);
    const [logoData, setLogoData] = useState(null);

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

        const fetchLogoData = async () => {
            const { data, error } = await supabase
                .from("content")
                .select("content, url_image")
                .eq("section", "Icon")
                .single(); // Use .single() to get a single row

            if (error) {
                console.error("Error fetching logo data:", error);
            } else {
                setLogoData(data);
            }
        };

        fetchLogoData();
        return () => {
            isMounted = false;
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleCmsClick = () => {
        navigate('/cms/dashboard');
      };

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        {logoData ? (
                            <>
                                <img
                                    src={logoData.url_image}
                                    className="mr-3 h-6 sm:h-9"
                                    alt="Logo"
                                />
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                    {logoData.content}
                                </span>
                            </>
                        ) : (
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Loading...
                            </span>
                        )}
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {session ? (
                            <div className="flex items-center">
                                <span className="text-gray-800 dark:text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                                    {session.user.email}
                                </span>
                                <button
                                    onClick={handleCmsClick}
                                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                >
                                    CMS
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/signin"
                                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
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
                                    to="/"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/tentang"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Company
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavbarComponent;