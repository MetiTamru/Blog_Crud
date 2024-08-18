import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './Axios';

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/posts');
      const sortedPosts = response.data.reverse();
      setItems(sortedPosts);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/posts/${id}`);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting item', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-900 text-white text-center py-12">
        <h1 className="text-4xl font-extrabold mb-2">Welcome to Our Blog</h1>
        <p className="text-lg mb-6">Discover our latest posts and updates below.</p>
        <Link to="/add" className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition duration-300">
          Add New Item
        </Link>
      </header>

      {/* Content Section */}
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div key={item.id} className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 flex flex-col">
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h2>
                <p className="text-gray-700 mb-4">{item.description}</p>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t border-gray-300">
                <Link to={`/edit/${item.id}`} className="bg-yellow-500 text-gray-800 px-4 py-1 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
                  Edit
                </Link>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-1 rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
