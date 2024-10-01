import React, { useState, useEffect } from 'react';

const MedicineTable = () => {

  const [medicines, setMedicines] = useState([]);
  const [categoryNames, setCategoryNames] = useState({});

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:7000/api/v1/getallmedicine') // Adjust URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMedicines(data); // Set the fetched data to the medicines state

        data.forEach((medicineItem) =>{
          fetchecategoryName(medicineItem.categ_id);
        });
      })
      .catch((error) => {
        console.error('Error fetching the medicines:', error);
      });
  }, []);

// function for retriving category name by id



const fetchecategoryName = async(categ_id) =>{
  try{
    const response = await fetch(`http://localhost:7000/api/v1/getcategory/${categ_id}`);
  const data = await response.json();
  setCategoryNames((prevState) =>({
    ...prevState,
    [categ_id]:data.name,
    }));
  }catch (error) {
  console.error("error fetching category name:",error);
   }
  
  
};



  return (
    <div className="py-10 px-20 mr-28 ">
      <h2 className="text-2xl font-bold mb-6">Medicine Information</h2>
      <table className="min-w-full bg-white border text-center ">
        <thead className='text-left font-bold bg-gray-800 text-white  text-sm border-b'>
          <tr>
          <th className="py-2 px-4 ">#</th>
            <th className="py-2 px-4 ">Name</th>
            <th className="py-2 px-4  ">Category</th>
            <th className="py-2 px-4">Unit</th>
            <th className="py-2 px-4  ">Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{}</td>
              <td className="py-2 px-4 border-b">{medicine.name}</td>
              <td className="py-2 px-4 border-b">{categoryNames[medicine.categ_id] || 'not found'}</td>
              <td className="py-2 px-4 border-b">{medicine.unit_of_measures}</td>
              <td className="py-2 px-4 border-b">{medicine.order_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
