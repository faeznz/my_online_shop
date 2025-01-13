import React, { useEffect, useState } from 'react';
import supabase from '../../../../utils/supabaseConfig';

const TableDashboardCmsComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('product').select('*');
        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('product_name');
        const description = formData.get('description');
        const price = formData.get('price');
        const file = formData.get('url_image');

        let url_image = editingProduct?.url_image;

        if (file) {
            const fileName = `${Math.random()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from('MyOnlineShop')
                .upload(fileName, file);

            if (error) {
                console.error('Error uploading image:', error);
                return;
            }

            url_image = `${supabase.storage.from('MyOnlineShop').getPublicUrl(fileName).data.publicUrl}`;
        }

        const productData = {
            product_name: name,
            description,
            price,
            url_image,
        };

        if (editingProduct) {
            // Update existing product
            const { error } = await supabase
                .from('product')
                .update(productData)
                .eq('id', editingProduct.id);

            if (error) {
                console.error('Error updating product:', error);
            } else {
                setEditingProduct(null);
                fetchProducts();
            }
        } else {
            // Create new product
            const { error } = await supabase.from('product').insert(productData);

            if (error) {
                console.error('Error creating product:', error);
            } else {
                event.target.reset();
                fetchProducts();
            }
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('product').delete().eq('id', id);
        if (error) {
            console.error('Error deleting product:', error);
        } else {
            fetchProducts(); // Refresh the product list after deletion
        }
    };

    return (
        <div>
            {/* Product Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <h2 className="pl-8 pb-6 mb-2 text-black font-black text-3xl">
                    {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="product_name"
                        placeholder="Product Name"
                        defaultValue={editingProduct?.product_name}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        defaultValue={editingProduct?.description}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        defaultValue={editingProduct?.price}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        type="file"
                        name="url_image"
                        accept="image/*"
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                    />
                </div>
                <div className="flex">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        {editingProduct ? 'Update' : 'Tambah Item'}
                    </button>
                    {editingProduct && (
                        <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Content Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="bg-white border-b  hover:bg-gray-50 "
                                >
                                    <td className="px-6 py-4">{product.product_name}</td>
                                    <td className="px-6 py-4">{product.description}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">
                                        {product.url_image && (
                                            <img
                                                src={product.url_image}
                                                alt={product.product_name}
                                                className="w-20 h-20 object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="font-medium text-white  hover:underline mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)} // Call handleDelete with product ID
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableDashboardCmsComponent;