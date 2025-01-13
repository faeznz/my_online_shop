import React from 'react';

const CompanyHomeComponent = ({ contents, loading }) => { 
    const content = contents.find((content) => content.section === 'Tentang Kami');

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Tentang Kami
                    </h2>
                    {loading ? (
                        <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Loading content...
                        </p>
                    ) : (
                        <>
                            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                                {content?.content || 'Default sub content'}
                            </p>
                            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    Selengkapnya
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CompanyHomeComponent;