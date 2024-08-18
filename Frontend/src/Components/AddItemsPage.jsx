import React, { useState } from 'react';
import axiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';

const AddItemsPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = async () => {
    if (!title || !description) {
      setErrorMessage('Title and description are required.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axiosInstance.post('/posts', {
        title,
        description,
        createdAt: new Date().toISOString(),
      });
      setSuccessMessage('Item added successfully!');
      setTitle('');
      setDescription('');
      setTimeout(() => navigate('/home'), 2000); // Delay navigation for success message visibility
    } catch (error) {
      setErrorMessage('Failed to add item. Please try again.');
      console.error('Add item error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Item</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter the item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter the item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>
        <button
          onClick={handleAddItem}
          className="bg-teal-600 text-white p-3 rounded-lg w-full hover:bg-teal-700 transition duration-300 disabled:bg-teal-400"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
        {successMessage && (
          <p className="text-teal-600 mt-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddItemsPage;
