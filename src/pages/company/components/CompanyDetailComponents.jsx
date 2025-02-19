import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabaseConfig';

const CompanyDetailComponents = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('content, sub_content, url_image')
        .eq('section', 'Tentang Kami')
        .single();

      if (error) {
        console.error('Error fetching content:', error);
      } else {
        setContent(data);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        {loading ? (
          <div className="text-center"></div>
        ) : (
          <>
            <img
              className="w-full rounded-2xl"
              src={content?.url_image || 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg'}
              alt="dashboard image"
            />
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Tentang Kami
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                {content?.content || 'Lorem Ipsum'}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CompanyDetailComponents;