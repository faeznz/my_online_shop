import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabaseConfig';

const FooterComponent = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const { data, error } = await supabase
        .from('content')
        .select('content, url_image')
        .eq('section', 'Icon')
        .single();

        if (error) {
          console.error('Error fetching footer data:', error);
        } else {
          setFooterData(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching footer data:', error);
      }
    };

    fetchFooterData();
  },); // Empty dependency array ensures this runs only once on mount

  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        {footerData? (
          <>
            <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
              <img src={footerData.url_image} className="mr-3 h-6 sm:h-9" alt="Logo" />
              {footerData.content}
            </a>
            <p className="my-6 text-gray-500 dark:text-gray-400">
            </p>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025 <a href="#" className="hover:underline">{footerData.content}</a>. All Rights Reserved.
            </span>
          </>
        ): (
          <div>Loading footer...</div>
        )}
      </div>
    </footer>
  );
};

export default FooterComponent;