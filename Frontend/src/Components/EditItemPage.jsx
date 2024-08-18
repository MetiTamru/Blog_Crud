import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from './Axios';



const EditItemPage = () => {
  const [item, setItem] = useState(null);
  const [errors, setErrors] = useState({ title: '', body: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get( `/posts/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item', error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { title: '', body: '' };

    if (!item.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!item.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      try {
        await axiosInstance.put( `/posts/${id}`, item);
        navigate('/');
      } catch (error) {
        console.error('Error updating item', error);
      }
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Item</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
            className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="body"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />
          {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Update Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemPage;
