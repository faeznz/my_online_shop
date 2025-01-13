import React, { useEffect, useState } from 'react';
import supabase from '../../../../utils/supabaseConfig';

const TableDashboardCmsComponent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState(null);

  useEffect(() => {
    fetchContents();
  }, []);

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

  const handleEdit = (content) => {
    setEditingContent(content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get('content');
    const subContent = formData.get('sub_content');
    const file = formData.get('url_image');

    let url_image = editingContent?.url_image;

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

    const contentData = {
      content,
      sub_content: subContent,
      url_image,
    };

    // Update existing content
    const { error } = await supabase
      .from('content')
      .update(contentData)
      .eq('id', editingContent.id);

    if (error) {
      console.error('Error updating content:', error);
    } else {
      setEditingContent(null);
      fetchContents();
    }
  };

  return (
    <div>
      {/* Content Form */}
      {editingContent && ( 
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <input
              name="content"
              placeholder="Content"
              defaultValue={editingContent?.content}
              className="px-3 py-2 rounded-2xl bg-white text-black"
              required
            />
            <input
              name="sub_content"
              placeholder="Sub Content"
              defaultValue={editingContent?.sub_content}
              className="px-3 py-2 rounded-2xl bg-white text-black"
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
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingContent(null)}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Content Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Section
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Content
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
              contents.map((content) => (
                <tr
                  key={content.id}
                  className="bg-white border-b  hover:bg-gray-50 "
                >
                  <td className="px-6 py-4">{content.section}</td>
                  <td className="px-6 py-4">{content.content}</td>
                  <td className="px-6 py-4">{content.sub_content}</td>
                  <td className="px-6 py-4">
                    {content.url_image && (
                      <img
                        src={content.url_image}
                        alt={content.section}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(content)}
                      className="font-medium text-white  hover:underline mr-2"
                    >
                      Edit
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