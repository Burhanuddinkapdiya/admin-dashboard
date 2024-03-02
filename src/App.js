import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Items from "./pages/Item/Items";
import Home from "./pages/Home";
import Customers from "./pages/Customer/Customers";
import JournalEntries from "./pages/JournalEntries";
import SalesInvoice from "./pages/SalesInvoice";
import Login from "./pages/auth/Login";

const App = () => {
 

  const token = localStorage.getItem("token")
  const isAuthenticated = !!token;

  return (
    <Router>
      
      {!isAuthenticated ? <Login/> :
      <div className="flex h-screen">
        
        <Sidebar />

        <main className="flex-1 p-4 overflow-scroll">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoice" element={<SalesInvoice />} />
            <Route path="/items" element={<Items />} />
            <Route path="/journalentries" element={<JournalEntries />} />
          </Routes>
        </main>
      </div>}

      
    </Router>
  );
};

export default App;
