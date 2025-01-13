// HeaderHomeComponents.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { IoLogoWhatsapp } from 'react-icons/io';

const HeaderHomeComponents = ({ contents, loading }) => {
  const backgroundImage = contents.find((content) => content.section === 'Judul')?.url_image;

    return (
        <section
            className="bg-white dark:bg-gray-900 w-screen relative"
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.4)', 
                }}
            ></div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-48 lg:px-12 relative z-10">
                {loading ? (
                    <p>Loading content...</p>
                ) : (
                    <>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                            {contents.find((content) => content.section === 'Judul')?.content || 'Coffee Shop'}
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                            {contents.find((content) => content.section === 'Judul')?.sub_content || 'I like my coffee how I like myself: strong, sweet, and too hot for you.'}
                        </p>
                        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        </div>
                        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                                <Link
                                    to={contents.find((content) => content.section === 'Nomor Whatsapp')?.content || '#'}
                                    className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400 flex flex-row justify-center items-center"
                                >
                                    <IoLogoWhatsapp className="text-5xl" />
                                    <p className="pl-4 text-2xl font-black">Whatsapp</p>
                                </Link>
                                <Link
                                    to={contents.find((content) => content.section === 'Link Instagram')?.content || '#'}
                                    className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400 flex flex-row justify-center items-center"
                                >
                                    <RiInstagramFill className="text-5xl" />
                                    <p className="pl-4 text-2xl font-black">Instagram</p>
                                </Link>
                                <Link
                                    to={contents.find((content) => content.section === 'Link Youtube')?.content || '#'}
                                    className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400 flex flex-row justify-center items-center"
                                >
                                    <FaYoutube className="text-5xl" />
                                    <p className="pl-4 text-2xl font-black">Youtube</p>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default HeaderHomeComponents;