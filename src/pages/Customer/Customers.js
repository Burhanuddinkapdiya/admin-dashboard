import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddCustomer from "./AddCustomer";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";

const Customers = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Update filtered data when searchQuery or data changes
    const filteredCustomers = data.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredCustomers);
  }, [searchQuery, data]);
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleFormSubmit = async (name, age, phone, pincode) => {
    // Handle form submission here, e.g., send the data to an API
    function generateShortUuid() {
      const fullUuid = uuidv4();
      const shortUuid = fullUuid.substr(0, 6);
      return shortUuid;
    }
    const id = generateShortUuid();
    const dataToSend = {
      id,
      name,
      age,
      phone,
      pincode,
    };

    // Send data to the server
    await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    // Fetch updated customer list after adding a new customer
    fetchCustomerData();
    
    // Close the modal
    closeModal();
  };

  const fetchCustomerData = async () => {
    try {
      const res = await fetch("http://localhost:3000/customers");
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const customers = await res.json();
      setData(customers);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    setItemsPerPage("15");
    fetchCustomerData();
  }, []);
  
 

  return (
    <div class="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-300 text-left">Id</th>
            <th class="px-6 py-3 bg-gray-300 text-left">Name</th>
            <th class="px-6 py-3 bg-gray-300 text-left">Age</th>
            <th class="px-6 py-3 bg-gray-300 text-left">Phone Number</th>
            <th class="px-6 py-3 bg-gray-300 text-left">Pincode</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-red-600  py-4">
                Data not found
              </td>
            </tr>
          ) : (
            currentItems.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4">{customer.id}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.age}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.pincode}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={openModal}
        class="flex fixed bottom-3 right-7 items-center justify-center my-4 mx-auto  px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Add Customer
      </button>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddCustomer
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Customers;
