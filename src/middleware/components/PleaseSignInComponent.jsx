import React from 'react';
import { Link } from 'react-router-dom';

const PleaseSignInComponent = () => {
    return (
        <section className="bg-white dark:bg-gray-900 w-screen h-screen flex justify-center items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Please Sign In</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Mohon maaf, untuk mengakses halaman ini anda harus masuk menggunakan akun.</p>
                    <Link to="/signin" className="bg-white inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign In</Link>
                </div>
            </div>
        </section>
    )
}

export default PleaseSignInComponent