// Homepage.js
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/Navbar';
import FooterComponent from '../../components/Footer';
import HeaderHomeComponents from './components/HeaderHomeComponent';
import ProductHomeComponents from './components/ProductHomeComponent';
import FAQHomeComponents from './components/FAQHomeComponent';
import CompanyHomeComponent from './components/CompanyHomeComponent';
import supabase from '../../utils/supabaseConfig';

const LoadingPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900 h-screen w-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500 dark:border-gray-300"></div>
                <p className="mt-4 text-xl font-light text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
        </div>
    );
};

const HomePage = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('content').select('*');
      if (error) {
        console.error('Error fetching contents:', error);
      } else {
        setContents(data);
      }
      setLoading(false);
    };

    fetchContents();
  }, []);

  if (loading) {
    return <LoadingPage />; // Show loading page while fetching data
  }

  return (
    <>
      <NavbarComponent />
      <HeaderHomeComponents contents={contents} loading={loading} />
      <CompanyHomeComponent contents={contents} loading={loading} />
      <ProductHomeComponents />
      <FAQHomeComponents />
      <FooterComponent />
    </>
  );
};

export default HomePage;