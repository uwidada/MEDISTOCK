import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '', // This will store the selected category ID
    description: '',
    measure: '',
    level: '',
  });

  const [categories, setCategories] = useState([]); // State to store the list of categories

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/listcategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch('http://localhost:7000/api/v1/addmedicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Medicine added successfully');
      } else {
        alert('Medicine already added');
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div >
      

    
      <div className="max-w-lg max-h-0 bg-white py-8 rounded-lg shadow-md w-9/12">
      <h2 className="text-2xl font-bold mb-6">Add New Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Medicine Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="measure">
            Unit
          </label>
          <select
          type="text"
          name="measure"
          value={formData.measure}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
          
          >

          <option value=""> select unit of measure</option>
          <option value="Tablets"> Tablets</option>
          <option value="Capsules"> Capsules</option>
          <option value="Liquid"> Liquid</option>
          <option value="Inhaler"> Inhaler</option>
          <option value="Ointment"> Ointment</option>
          
          </select>
          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
            Reorder Level
          </label>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Medicine
        </button>
      </form>
    </div>


    </div>
    
  );
};

export default MedicineForm;
