import React, { useState } from "react";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const[isOpen, setIsOpen] = useState(true);

    function toggleSidebar(){
        setIsOpen(!isOpen);
    }

  return (<>
    <aside className={`w-40 bg-gray-900  transition-transform text-gray-200 h-screen ${!isOpen ? "hidden" : ""}`}>
      <div className="p-4">
        <Link to="/"  className="text-2xl font-semibold text-white">
          Dashboard
        </Link>
        
      </div>
      <nav className="p-2">
        <ul>
          <li className="p-2 hover:bg-gray-800">
            <Link to="/items" className="block text-sm">
              Items
            </Link>
          </li>
        
          <li className="p-2 hover:bg-gray-800">
            <Link to="/customers" className="block text-sm">
              Customers
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-800">
            <Link to="/invoice" className="block text-sm">
              Sales Invoice
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-800">
            <Link to="/journalentries" className="block text-sm">
              Journal Entries
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    <aside className="w-16 transition-transform  bg-gray-900 text-gray-200 h-screen" >
        <button onClick={toggleSidebar} className=" hover:bg-slate-400 text-white font-semibold mt-3 py-2 px-4 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
    </aside>
    </>
  );
};

export default Sidebar;
