import React from "react";
import Modal from "../../components/Modal.js";

function AddCustomer({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      e.target.name.value,
      e.target.age.value,
      e.target.phone.value,
      e.target.pincode.value
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Customer"
    >
      {/* Content of the AddCustomer component */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Customer Name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Customer Age"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-medium">
          Phone Number
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Phone Number"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pincode" className="block text-gray-700 font-medium">
          Pincode
        </label>
        <input
          type="number"
          id="pincode"
          name="pincode"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter Pincode"
          required
        />
      </div>
    </Modal>
  );
}

export default AddCustomer;
