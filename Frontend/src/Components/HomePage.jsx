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
        await axiosInstance.delete(`${"/posts"}/${id}`);
        setItems(items.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting item', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Item List</h1>
      
      <div className="flex justify-end mb-6">
        <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Add New Item
        </Link>
      </div>
      
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
            <div className="flex justify-between items-center p-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="flex-shrink-0 flex space-x-2">
                <Link to={`/edit/${item.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition duration-300">
                  Edit
                </Link>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
