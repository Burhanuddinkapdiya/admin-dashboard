import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

const SalesInvoice = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    invoiceDate: "",
    customerName: "",
    totalAmount: "",
    totalQuantity: "",
    amountPaid: "",
    remainingAmount: "",
    entries: [{ itemName: "", quantity: "", price: "", amount: "" }],
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const res = await fetch("http://localhost:3000/items");
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const items = await res.json();
      setOptions(
        items.map((item) => ({ value: item.title, label: item.title }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalAmount = 0;

    formData.entries.forEach((entry) => {
      totalQuantity += parseFloat(entry.quantity) || 0;
      totalAmount += parseFloat(entry.amount) || 0;
    });

    return { totalQuantity, totalAmount };
  };

  const calculateRemainingAmount = () => {
    const amountPaid = parseFloat(formData.amountPaid) || 0;
    const { totalAmount } = calculateTotals();
    const remainingAmount = parseFloat(totalAmount - amountPaid);
    return remainingAmount >= 0 ? remainingAmount : 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleEntryInputChange = (index, field, value) => {
    const newEntries = [...formData.entries];
    newEntries[index][field] = value;

    if (field === "price" || field === "quantity") {
      newEntries[index].amount = (
        newEntries[index].quantity * newEntries[index].price
      ).toFixed(2);
    }

    if (field === "itemName" && value) {
      const selectedItem = options.find((item) => item.label === value);
      if (selectedItem) {
        newEntries[index].itemName = selectedItem.value;
      }
    }

    setFormData({
      ...formData,
      entries: newEntries,
    });
  };

  const handleAddEntry = () => {
    setFormData({
      ...formData,
      entries: [
        ...formData.entries,
        { itemName: "", quantity: "", price: "", amount: "" },
      ],
    });
  };

  const handleDeleteEntry = (index) => {
    const newEntries = [...formData.entries];
    if (index > 0) {
      newEntries.splice(index, 1);
    }
    setFormData({
      ...formData,
      entries: newEntries,
    });
  };

  const { totalQuantity, totalAmount } = calculateTotals();
  const remainingAmount = calculateRemainingAmount();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      totalQuantity,
      totalAmount,
      remainingAmount,
    });
    console.log("Form Data:", formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      invoiceNo: "",
      invoiceDate: "",
      customerName: "",
      totalAmount: "",
      totalQuantity: "",
      amountPaid: "",
      entries: [{ itemName: "", quantity: "", price: "", amount: "" }],
    });
  };

  const handleCreate = async (inputValue) => {
    const id = generateShortUuid();
    const dataToSend = {
      id,
      title: inputValue,
    };

    await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const newOption = { value: inputValue, label: inputValue };

    setOptions([...options, newOption]);

    const updatedEntries = [...formData.entries];
    updatedEntries[formData.entries.length - 1].itemName = newOption.value;

    setFormData({
      ...formData,
      entries: updatedEntries,
    });
  };

  const generateShortUuid = () => {
    const fullUuid = uuidv4();
    return fullUuid.substr(0, 6);
  };

  return (
    <div className="bg-white w-full p-6 rounded-md shadow-lg ">
      <h2 className="text-2xl font-semibold mb-8 underline text-center text-slate-600">
        Sales Invoice
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-10 flex items-center justify-between ">
          <div className="flex gap-[20rem]">
            <div className="flex items-center gap-4">
              <label
                htmlFor="invoiceNo"
                className="block text-gray-700 font-medium text-lg "
              >
                Invoice No.
              </label>
              <input
                type="text"
                id="invoiceNo"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={(e) => handleInputChange("invoiceNo", e.target.value)}
                className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Invoice No."
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label
                htmlFor="invoiceDate"
                className="block text-gray-700 font-medium text-lg "
              >
                Invoice Date :
              </label>
              <input
                type="date"
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={(e) =>
                  handleInputChange("invoiceDate", e.target.value)
                }
                className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Invoice Date"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-10 justify-between">
          <div className="flex items-center gap-3">
            <label
              htmlFor="customerName"
              className="block text-gray-700 font-medium text-lg "
            >
              Customer Name :
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
              className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Customer Name"
              required
            />
          </div>
        </div>
        <div>
          <table className="w-full table-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                  #
                </th>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                  Item Name
                </th>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                  Qty
                </th>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                  Price
                </th>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                  Amount
                </th>
                <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {formData.entries.map((entry, index) => (
                <tr key={index}>
                  <td className="w-[5%] text-center border border-slate-400">
                    {index + 1}
                  </td>
                  <td className="border border-slate-400 w-[400px]">
                    <div className="flex items-center">
                      {/* <input
                        type="text"
                        value={entry.itemName}
                        onChange={(e) =>
                          handleEntryInputChange(
                            index,
                            "itemName",
                            e.target.value
                          )
                        }
                        className=" w-full text-center focus:outline-none  focus:outline-blue-500"
                        placeholder="Item Name"
                        required
                      /> */}

                      <CreatableSelect
                        className="w-full text-center focus:outline-none"
                        options={options}
                        placeholder="Items"
                        onCreateOption={handleCreate}
                        onChange={(values) =>
                          handleEntryInputChange(
                            formData.entries.length - 1,
                            "itemName",
                            values.value
                          )
                        }
                      />
                      {/* <select
                        value={entry.itemName}
                        onChange={(e) =>
                          handleEntryInputChange(
                            index,
                            "itemName",
                            e.target.value
                          )
                        }
                        className="w-full  text-center focus:outline-none  focus:outline-blue-500"
                        required
                      >
                        <option value="" disabled></option>

                        {data.map((item) => (
                          <option value={item.title} key={item.id}>
                            {item.title}
                          </option>
                        ))}

                        {/* Add more options as needed */}
                      {/* </select> */}
                    </div>
                  </td>
                  <td className="border border-slate-400 w-[100px]">
                    <input
                      type="number"
                      value={entry.quantity}
                      onChange={(e) =>
                        handleEntryInputChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      className=" w-full  text-center focus:outline-none  focus:outline-blue-500"
                      placeholder="Quantity"
                      required
                    />
                  </td>
                  <td className=" w-[10%] border border-slate-400">
                    <input
                      type="number"
                      value={entry.price}
                      onChange={(e) =>
                        handleEntryInputChange(index, "price", e.target.value)
                      }
                      className="w-full text-center focus:outline-none focus:outline-blue-500 "
                      placeholder="Price"
                      required
                    />
                  </td>
                  <td className="border border-slate-400 w-[10%]">
                    <input
                      type="number"
                      value={entry.amount}
                      onChange={(e) =>
                        handleEntryInputChange(index, "amount", e.target.value)
                      }
                      className="w-full text-center focus:outline-none  focus:outline-blue-500"
                      placeholder="Amount"
                      disabled
                    />
                  </td>

                  <td className="border border-slate-400 text-center w-[10%] ">
                    <div className="w-[100px]">
                      <button
                        className="bg-blue-500 text-white w-8 h-8 rounded-full  mx-1  focus:outline-blue-500"
                        onClick={handleAddEntry}
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(index)}
                        className="bg-red-500 text-white w-8 h-8 rounded-full  mx-1  focus:outline-blue-500"
                      >
                        -
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}></td>
                <td colSpan={2}>
                  <div className="flex pt-5">
                    <div className="">
                      <label>Total Amount: </label>
                      <input
                        type="number"
                        value={totalAmount}
                        className="  w-[100px] h-[40px] mb-2 text-center  border border-slate-400 focus:outline-none focus:border-blue-500"
                        disabled
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td colSpan={2}>
                  <div className="flex">
                    <div className=" flex gap-2 items-center">
                      <label>Amount Paid: </label>
                      <input
                        type="number"
                        value={formData.amountPaid}
                        onChange={(e) =>
                          handleInputChange("amountPaid", e.target.value)
                        }
                        className="w-[100px] h-[40px] mb-1 text-center  border border-slate-400 focus:outline-none focus:border-blue-500"
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td colSpan={2}>
                  <div className="flex">
                    <div className="flex gap-8 items-center">
                      <label>
                        Remaining <br /> Amount :{" "}
                      </label>
                      <input
                        type="number"
                        value={remainingAmount}
                        onChange={(e) =>
                          handleInputChange("remainingAmount", e.target.value)
                        }
                        className="w-[100px] h-[40px]  text-center  border border-slate-400 focus:outline-none focus:border-blue-500"
                        placeholder="Remaining Amount"
                        disabled
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white rounded   focus:outline-blue-500  px-4 py-2 mt-4 block mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SalesInvoice;
