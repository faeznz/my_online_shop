import React, { useEffect, useState } from 'react';
import supabase from '../../../../utils/supabaseConfig';

const TableTeamCmsComponent = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('team').select('*');
        if (error) {
            console.error('Error fetching team members:', error);
        } else {
            setTeamMembers(data);
        }
        setLoading(false);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const whatsapp = formData.get('whatsapp');
        const instagram = formData.get('instagram');
        const facebook = formData.get('facebook');
        const file = formData.get('url_image');

        let url_image = editingMember?.url_image;

        if (file) {
            const fileName = `${Math.random()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from('MyOnlineShop') // Replace with your storage bucket name
                .upload(fileName, file);

            if (error) {
                console.error('Error uploading image:', error);
                return;
            }

            url_image = `${supabase.storage.from('MyOnlineShop').getPublicUrl(fileName).data.publicUrl}`;
        }

        const memberData = {
            name,
            whatsapp,
            instagram,
            facebook,
            url_image,
        };

        if (editingMember) {
            // Update existing member
            const { error } = await supabase
                .from('team')
                .update(memberData)
                .eq('id', editingMember.id);

            if (error) {
                console.error('Error updating team member:', error);
            } else {
                setEditingMember(null);
                fetchTeamMembers();
            }
        } else {
            // Create new member
            const { error } = await supabase.from('team').insert(memberData);
            if (error) {
                console.error('Error creating team member:', error);
            } else {
                event.target.reset();
                fetchTeamMembers();
            }
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('team').delete().eq('id', id);
        if (error) {
            console.error('Error deleting team member:', error);
        } else {
            fetchTeamMembers();
        }
    };

    return (
        <div>
            {/* Team Member Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <h2 className="pl-8 pb-6 mb-2 text-black font-black text-3xl">
                    {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={editingMember?.nama}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp Link"
                        defaultValue={editingMember?.whatsapp}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram Link"
                        defaultValue={editingMember?.instagram}
                        className="px-3 py-2 rounded-2xl bg-white text-black"
                        required
                    />
                    <input
                        type="text"
                        name="facebook"
                        placeholder="Facebook Link"
                        defaultValue={editingMember?.facebook}
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
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    {editingMember ? 'Update' : 'Save'}
                </button>
                {editingMember && (
                    <button
                        type="button"
                        onClick={() => setEditingMember(null)}
                        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Team Member Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                WhatsApp
              </th>
              <th scope="col" className="px-6 py-3">
                Instagram
              </th>
              <th scope="col" className="px-6 py-3">
                Facebook
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
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              teamMembers.map((member) => (
                <tr key={member.id} className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {member.name}
                  </th>
                  <td className="px-6 py-4">
                    <a href={member.whatsapp} target="_blank" rel="noopener noreferrer">
                      {member.whatsapp}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      {member.instagram}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                      {member.facebook}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {member.url_image && (
                      <img
                        src={member.url_image}
                        alt={member.name}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(member)}
                      className="font-medium text-blue-600  hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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

export default TableTeamCmsComponent;