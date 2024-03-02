import React from "react";
import Modal from "../../components/Modal";

function AddItems({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      e.target.title.value,
      e.target.costPrice.value,
      e.target.sellingPrice.value
    );
    
  };
 

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Item"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Item Title"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cp" className="block text-gray-700 font-medium">
          CostPrice
        </label>
        <input
          type="number"
          id="cp"
          name="costPrice"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Cost Price"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sp" className="block text-gray-700 font-medium">
          Selling Price
        </label>
        <input
          type="number"
          id="sp"
          name="sellingPrice"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Selling Price"
          required
        />
      </div>
    </Modal>
  );
}

export default AddItems;
