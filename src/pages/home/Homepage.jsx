// Homepage.js
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/Navbar';
import FooterComponent from '../../components/Footer';
import HeaderHomeComponents from './components/HeaderHomeComponent';
import ProductHomeComponents from './components/ProductHomeComponent';
import FAQHomeComponents from './components/FAQHomeComponent';
import CompanyHomeComponent from './components/CompanyHomeComponent';
import supabase from '../../utils/supabaseConfig';

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