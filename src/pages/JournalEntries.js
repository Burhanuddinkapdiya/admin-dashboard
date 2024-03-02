import React, { useEffect, useState } from "react";
const JournalEntries = () => {
  const [journalData, setJournalData] = useState([
    { account: "", debit: "", credit: "" },
  ]);
  const [journalDate, setJournalDate] = useState(new Date());

  const handleAddEntry = () => {
    setJournalData([...journalData, { account: "", debit: "", credit: "" }]);
  };

  const handleDeleteEntry = (index) => {
    const newEntries = [...journalData];
    if (index > 0) {
      newEntries.splice(index, 1);
    }
    setJournalData(newEntries);
  };

  const handleInputChange = (index, field, value) => {
    const newEntry = [...journalData];
    newEntry[index][field] = value;
    setJournalData(newEntry);
  };

  const handleDateChange = (value) => {
    setJournalDate(value);
  };

  const [totalCredit, setTotalCredit] = useState("");
  const [totalDebit, setTotalDebit] = useState("");

  
  useEffect(()=>{
    const calculateTotalCredit = () => {
      return journalData.reduce(
        (total, entry) => total + parseFloat(entry["credit"] || 0),
        0
      );
    };
    const calculateTotalDebit = () => {
      return journalData.reduce(
        (total, entry) => total + parseFloat(entry["debit"] || 0),
        0
      );
    };
    setTotalCredit(calculateTotalCredit);
     setTotalDebit(calculateTotalDebit);
  },[journalData])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine the date with each entry before submission
    const dataToSubmit = journalData.map((entry) => ({
      ...entry,
      date: journalDate,
    }));
    console.log("Form submitted:", dataToSubmit);
    alert("Data Saved");
    // You can send the data to your server or perform any other necessary actions
  };
  

  return (
    <div className="bg-white w-full p-6 rounded-md shadow-lg ">
      <h2 className="text-2xl font-semibold mb-8 underline text-center text-slate-600">
        Journal Entries
      </h2>
      <form onSubmit={handleSubmit}>
        <label className=" mb-2 mr-3 text-lg font-bold text-gray-600">
          Date :
        </label>
        <input
          type="date"
          value={journalDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required
        />
        <table className="w-full table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                #
              </th>

              <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                Account
              </th>
              <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                Debit
              </th>
              <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center">
                Credit
              </th>
              <th className="px-6 py-3 border  border-slate-400 bg-gray-300 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {journalData.map((entry, index) => (
              <tr key={index}>
                <td className=" text-center border border-slate-400">
                  {index + 1}
                </td>

                <td className=" w-[80%] text-center border border-slate-400">
                  <input
                    type="text"
                    id="account"
                    name="account"
                    value={entry.account}
                    onChange={(e) =>
                      handleInputChange(index, "account", e.target.value)
                    }
                    className="w-[98%] wrap focus:outline-none text-center  focus:outline-blue-500"
                    placeholder="Account"
                    required
                  />
                </td>
                <td className=" text-center border border-slate-400">
                  <input
                    type="number"
                    id="debit"
                    name="debit"
                    value={entry.debit}
                    onChange={(e) =>
                      handleInputChange(index, "debit", e.target.value)
                    }
                    className=" text-center focus:outline-none  focus:outline-blue-500"
                    placeholder="Debit"
                  />
                </td>
                <td className=" text-center border border-slate-400 ">
                  <input
                    type="number"
                    id="credit"
                    name="credit"
                    value={entry.credit}
                    onChange={(e) =>
                      handleInputChange(index, "credit", e.target.value)
                    }
                    className="text-center focus:outline-none  focus:outline-blue-500"
                    placeholder="Credit"
                  />
                </td>
                <td className=" text-center border border-slate-400 w-[10%]">
                  <button
                    className="bg-blue-500 text-white w-8 h-8 rounded-full  mx-1  focus:outline-blue-500"
                    onClick={handleAddEntry}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(index)}
                    className="bg-red-500 text-white w-8 h-8 rounded-full mr-1  focus:outline-blue-500"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}></td>
              <td colSpan={2}>
                <div className="flex pt-5">
                  <div className="">
                    <label>Total Debit : </label>
                    <input
                      type="number"
                      value={totalDebit}
                      className="  w-[100px] h-[40px] text-center  border border-slate-400 focus:outline-none focus:border-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td colSpan={2}>
                <div className="flex pt-5 mb-3">
                  <div className="">
                    <label>Total Credit : </label>
                    <input
                      type="number"
                      value={totalCredit}
                      className="  w-[100px] h-[40px] text-center  border border-slate-400 focus:outline-none focus:border-blue-500"
                      disabled
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded block mx-auto mt-5 focus:outline-none  focus:outline-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default JournalEntries;
