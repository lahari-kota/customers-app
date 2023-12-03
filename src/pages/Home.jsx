import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomTable from "../components/CustomerTable";
import AddCustomer from "./AddCustomer";

function Home() {
  const [customerData, setCustomerData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState({
    status: false,
    rowDetails: "",
  });

  const openEditPopup = (row) => {
    console.log("clicked", row);
    setShowEditPopup({
      status: true,
      rowDetails: row,
    });
  };
  const closeEditPopup = () => {
    setShowEditPopup({
      status: false,
      rowDetails: "",
    });
  };

  function openAddPopup() {
    setShowAddPopup(true);
  }

  function closeAddPopup() {
    setShowAddPopup(false);
  }

  const fetchCustomer = async () => {
    const response = await fetch("http://localhost:3000/customers");
    const data = await response.json();
    console.log("costomers", data);
    setCustomerData(data);
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleDelte = async (id) => {
    const response = await fetch(`http://localhost:3000/customers/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.status == 200) {
      console.log("item deleted");
      fetchCustomer();
    }
  };

  const ShowControls = ({ row }) => {
    console.log("row", row);

    return (
      <div className="controls-container">
        <button className="delte-btn" onClick={() => handleDelte(row["id"])}>
          <MdDelete size={20} color="red" />
        </button>
        <button className="edit-btn" onClick={() => openEditPopup(row)}>
          <FaEdit color={"blue"} size={20} />
        </button>
      </div>
    );
  };

  const tableHeaders = [
    {
      id: "first_name",
      heading: "First Name",
    },
    {
      id: "last_name",
      heading: "Last Name",
    },
    {
      id: "age",
      heading: "Age",
    },
    {
      id: "city",
      heading: "City",
    },
    {
      id: "state",
      heading: "State",
    },

    {
      id: "action",
      heading: "Actions",
      renderCell: (row) => <ShowControls row={row} />,
    },
  ];

  if (showAddPopup || showEditPopup.status) {
    return (
      <AddCustomer
        closeAddPopup={closeAddPopup}
        fetchCustomer={fetchCustomer}
        isEditing={showEditPopup.status}
        closeEditPopup={closeEditPopup}
        rowDetails={showEditPopup.rowDetails}
      />
    );
  }

  return (
    <div>
      <div>
        <button className="add-customer-btn" onClick={openAddPopup}>
          Add Customer
        </button>
      </div>
      <CustomTable tableData={customerData} tableHeaders={tableHeaders} />
    </div>
  );
}

export default Home;
