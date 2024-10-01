import React, { useState } from 'react';

const MedicineCategoryForm = () => {
  // Step 1: Update state to include 'description'
  const [formData, setFormData] = useState({
    name: '',
    description: '',  // New field for category description
  });

  // Step 2: Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/api/v1/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Include 'description' in the submission
      });

      if (response.ok) {
        console.log('result');
        alert('category added successfully');
        setFormData({
          categoryName: '',
          description: '',  // Reset description field after submission
        });
      } else {
        console.error('category already added');
        alert('category already added ');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">  Medicine Category</h2>

      {/* Step 4: Update form JSX to include description input */}
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            Category Name
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

        {/* New: Category Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Category Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            placeholder="Enter a description for the category"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className=" bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineCategoryForm;
