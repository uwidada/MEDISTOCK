import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaAlignJustify } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { RiStockFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";

const Sidebar = () => {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isTransactionOpene, setIsTransactionOpene] = useState(false);

  const toggleTransactionMenu = () => {
    setIsTransactionOpen(!isTransactionOpen);
  };

  const toggleTransactionMene = () => {
    setIsTransactionOpene(!isTransactionOpene);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col font-semibold">
      <h2 className="text-2xl font-bold  text-center py-20">MEDISTOCK</h2>
      <ul className="flex-grow">
        <li className="p-4 flex hover:bg-gray-700">
          <div className=" text-xl mr-2">
            <AiFillHome />
          </div>

          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="p-4 hover:bg-gray-700">
          <div
            onClick={toggleTransactionMene}
            className="cursor-pointer flex justify-between"
          >
            Medicine
            <span>{isTransactionOpene ? "" : ""}</span>
          </div>
          {isTransactionOpene && (
            <ul className="ml-4">
              <li className="p-4 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <FaAlignJustify />
                </div>
                <Link to="/categoryform">Category</Link>
              </li>

              <li className="p-4 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <FaClinicMedical />
                </div>

                <Link to="/medicineform">Add Medicine</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Transaction menu with sub-menus */}
        <li className="p-4 hover:bg-gray-700">
          <div
            onClick={toggleTransactionMenu}
            className="cursor-pointer flex justify-between"
          >
            Transaction
            <span>{isTransactionOpen ? "" : ""}</span>
          </div>
          {isTransactionOpen && (
            <ul className="ml-4">
              <li className="p-2 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <BiSolidPurchaseTagAlt />
                </div>
                <Link to="/transaction/purchase">Purchase</Link>
              </li>
              {/* <li className="p-2 hover:bg-gray-700">
                <Link to="/transaction/sale">Sale</Link>
              </li>*/}

              <li className="p-2 flex hover:bg-gray-700">
                
                <Link to="/transaction/purchase">Sale</Link>
              </li>
            </ul>
          )}
        </li>
    

        <li className="p-4 hover:bg-gray-700">
          <div
            onClick={toggleTransactionMenu}
            className="cursor-pointer flex justify-between"
          >
            Stock Request
            <span>{isTransactionOpen ? "" : ""}</span>
          </div>
          {isTransactionOpen && (
            <ul className="ml-4">
              <li className="p-2 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <BiSolidPurchaseTagAlt />
                </div>
                <Link to="/transaction/purchase">Requested</Link>
              </li>
              {/* <li className="p-2 hover:bg-gray-700">
                <Link to="/transaction/sale">Sale</Link>
              </li>*/}

              <li className="p-2 flex hover:bg-gray-700">
                
                <Link to="/transaction/purchase">Approve</Link>
              </li>
            </ul>
          )}
        </li>










        <li className="p-4 hover:bg-gray-700">
          <div
            onClick={toggleTransactionMene}
            className="cursor-pointer flex justify-between"
          >
            Reports
            <span>{isTransactionOpene ? "" : ""}</span>
          </div>
          {isTransactionOpene && (
            <ul className="ml-4">
              <li className="p-2 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <AiFillMedicineBox />
                </div>
                <Link to="/medicinetable">Medicine</Link>
              </li>
              <li className="p-2 flex hover:bg-gray-700">
                <div className=" text-xl mr-2">
                  <RiStockFill />
                </div>
                <Link to="/stocktable">Stock</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="p-4 flex hover:bg-gray-700">
          <div className=" text-xl mr-2">
            <IoLogOut />
          </div>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
