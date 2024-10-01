import React, {useState,useEffect} from 'react';

const StockTable = () => {
 
  const [stock, setStock] = useState([]);
  const [medicineNames, setMedicineNames] = useState({});
 

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:7000/api/v1/gettotalquantities') // Adjust URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStock(data); // Set the fetched data to the medicines state

        data.forEach((stockItem) =>{
          fetchMedicineName(stockItem.trans_medicine_id);
        });
      })
      .catch((error) => {
        console.error('Error fetching the stock:', error);
      });
  }, []);


//function to fetch medicine name by transaction ID

const fetchMedicineName = async(trans_medicine_id) =>{
  try{
    const response = await fetch(`http://localhost:7000/api/v1/getmedicinename/${trans_medicine_id}`);
    const data = await response.json();
    setMedicineNames((prevState) =>({
      ...prevState,
      [trans_medicine_id]:data.name,
    }));
  }catch (error){
    console.error("error fetching medicine name:",error);
   
  }
};



 /*const [medicine, setmedicine] = useState([]); // State to store the list of categories

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchMedicine = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/getmedicinename/3');
        const data = await response.json();
        setmedicine(data);
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    fetchMedicine();
  }, []);          */  


  return (
    <div className="py-10 px-20 mr-28 ">
      <h2 className="text-2xl font-bold mb-6">Stock Information</h2>
      <table className="min-w-full bg-white">
        <thead className='text-left font-bold  bg-gray-800 text-white text-sm'>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Medicine Name</th>
            <th className="py-2 px-4 border-b">current-stock</th>
           {/* <th className="py-2 px-4 border-b">Date</th>*/} 
          </tr>
        </thead>
        <tbody>
          {stock.map ((stocks, index) => (
          
            <tr key={index}>
              <td className="py-2 px-4 border-b">{}</td>
              <td className="py-2 px-4 border-b">{medicineNames[stocks.trans_medicine_id]  || 'not found'}</td>
              <td className="py-2 px-4 border-b">{stocks.total_quantity}</td>
              {/* <td className="py-2 px-4 border-b">{stocks.date}</td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
