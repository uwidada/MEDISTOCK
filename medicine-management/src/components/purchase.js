import React, { useState, useEffect } from 'react';

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    medicine_id: '',
    type: '', 
    quantity: '',
    expiration_date: '',
  });

  const [medicine, setMedicine] = useState([]); // State to store the list of medicines

  useEffect(() => {
    // Fetch medicines from the backend when the component mounts
    const fetchMedicine = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/getallmedicine');
        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicine();
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
      const response = await fetch('http://localhost:7000/api/v1/addstock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Stock added successfully');
      } else {
        alert('Medicine already added or another issue occurred');
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add a Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicine_id">
            Medicine Name
          </label>
          <select 
            name="medicine_id"
            value={formData.medicine_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select medicine</option>
            {medicine.map((medic) => (
              <option key={medic.id} value={medic.id}>
                {medic.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select purchase type</option>
            <option value="supplied">Supplied</option>
            <option value="purchased">Purchase</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration_date">
            Expiration Date
          </label>
          <input
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
