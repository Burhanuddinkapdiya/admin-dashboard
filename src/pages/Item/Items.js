import React, { useState, useEffect } from "react";
import AddItems from "./AddItems";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";

const Items = () => {
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
    const filtereditems = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtereditems);
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

  const handleFormSubmit = async (title, costPrice, sellingPrice) => {
    // Handle form submission here, e.g., send the data to an API
    function generateShortUuid() {
      const fullUuid = uuidv4();
      const shortUuid = fullUuid.substr(0, 6);
      return shortUuid;
    }
    const id = generateShortUuid();
    const dataToSend = {
      id,
      title,
      costPrice,
      sellingPrice,
    };
    await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    console.log("Form submitted with data:", {
      title,
      costPrice,
      sellingPrice,
    });

    // Fetch updated Item list after adding a new item
    getItems();
    // Close the modal
    closeModal();
  };

  async function getItems() {
    try {
      const res = await fetch("http://localhost:3000/items");
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      const items = await res.json();
      // console.log(items);
      setData(items);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setItemsPerPage("15");
    getItems();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <SearchBar onSearch={handleSearch} />
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-300 text-left">Id</th>
            <th className="px-6 py-3 bg-gray-300 text-left">Item Name</th>
            <th className="px-6 py-3 bg-gray-300 text-left">Cost Price</th>
            <th className="px-6 py-3 bg-gray-300 text-left">Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              {" "}
              <td className="text-center mt-5 text-red-600" colSpan={5}>
                Data not found
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">$ {item.costPrice}</td>
                <td className="px-6 py-4">$ {item.sellingPrice}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={openModal}
        className="flex fixed bottom-3 right-7 items-center justify-center my-4 mx-auto  px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
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
        Add Item
      </button>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <AddItems
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Items;
