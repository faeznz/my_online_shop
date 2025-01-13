import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabaseConfig';

const ProductHomeComponents = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('product')
                    .select('*');

                if (error) {
                    console.error('Error fetching products:', error);
                    setError(error);
                } else {
                    setProducts(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Our Product
                    </h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                        Explore coffee according to your wishes, adjust to your mood and what you feel.
                    </p>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
                        >
                            <a href="#">
                                <img className='rounded-lg sm:rounded-none sm:rounded-l-lg w-52 aspect-square object-cover' src={product.url_image} alt={product.url_image} /> {/* Menampilkan gambar */}
                            </a>
                            <div className="p-5">
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">{product.product_name}</a> {/* Menampilkan nama produk */}
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">
                                    {product.price} {/* Menampilkan harga */}
                                </span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                                    {product.description} {/* Menampilkan deskripsi */}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductHomeComponents;