import React, { useEffect, useState } from 'react';
import supabase from '../../../../utils/supabaseConfig';

const TableFAQCmsComponents = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('faq').select('*');
    if (error) {
      console.error('Error fetching FAQs:', error);
    } else {
      setFaqs(data);
    }
    setLoading(false);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const question = formData.get('question');
    const answer = formData.get('answer');

    const faqData = {
      question,
      answer,
    };

    if (editingFaq) {
      // Update existing FAQ
      const { error } = await supabase
        .from('faq')
        .update(faqData)
        .eq('id', editingFaq.id);

      if (error) {
        console.error('Error updating FAQ:', error);
      } else {
        setEditingFaq(null);
        fetchFaqs();
      }
    } else {
      // Create new FAQ
      const { error } = await supabase.from('faq').insert(faqData);
      if (error) {
        console.error('Error creating FAQ:', error);
      } else {
        event.target.reset();
        fetchFaqs();
      }
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('faq').delete().eq('id', id);
    if (error) {
      console.error('Error deleting FAQ:', error);
    } else {
      fetchFaqs();
    }
  };

  return (
    <div>
      {/* FAQ Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="pl-8 pb-6 mb-2 text-black font-black text-3xl">
          {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
        </h2>
        <div className="grid grid-cols-1 gap-4"> {/* Adjusted grid layout */}
          <input
            type="text"
            name="question"
            placeholder="Question"
            defaultValue={editingFaq?.question}
            className="px-3 py-2 rounded-2xl bg-white text-black"
            required
          />
          <input
            name="answer"
            placeholder="Answer"
            defaultValue={editingFaq?.answer}
            className="px-3 py-2 rounded-2xl bg-white text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {editingFaq ? 'Update' : 'Save'}
        </button>
        {editingFaq && (
          <button
            type="button"
            onClick={() => setEditingFaq(null)}
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cancel
          </button>
        )}
      </form>

      {/* FAQ Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Answer
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="bg-white border-b hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {faq.question}
                  </th>
                  <td className="px-6 py-4">
                    {faq.answer}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
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

export default TableFAQCmsComponents;