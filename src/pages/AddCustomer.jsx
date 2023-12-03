import React, { useState, useEffect } from "react";

function AddCustomer(props) {
  const [customerForm, setCustomerForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (props.isEditing) {
      setCustomerForm({
        firstName: props.rowDetails.first_name,
        lastName: props.rowDetails.last_name,
        age: props.rowDetails.age,
        city: props.rowDetails.city,
        state: props.rowDetails.state,
        country: props.rowDetails.country,
      });
    }
  }, [props.isEditing]);

  const handleCustomerForm = (itemValue, itemName) => {
    setCustomerForm({
      ...customerForm,
      [itemName]: itemValue,
    });
  };

  const createCustomer = async () => {
    const body = {
      first_name: customerForm["firstName"],
      last_name: customerForm["lastName"],
      age: customerForm["age"],
      city: customerForm["city"],
      state: customerForm["state"],
      country: customerForm["country"],
    };
    const response = await fetch(`http://localhost:3000/customers`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);

    if (response.status == 201) {
      props.closeAddPopup();
      props.fetchCustomer();
    }
  };

  const updateCustomer = async () => {
    const body = {
      first_name: customerForm["firstName"],
      last_name: customerForm["lastName"],
      age: customerForm["age"],
      city: customerForm["city"],
      state: customerForm["state"],
      country: customerForm["country"],
    };
    const response = await fetch(
      `http://localhost:3000/customers/${props.rowDetails.id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);

    if (response.status == 200) {
      props.closeEditPopup();
      props.fetchCustomer();
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-container-center wrapper max-width-800">
        {props.isEditing ? (
          <h2 className="edit-customer-heading">Edit Customer</h2>
        ) : (
          <h2 className="add-customer-heading">Add Customer</h2>
        )}
        <div className="customer-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="First name"
              value={customerForm["firstName"]}
              onChange={(e) => handleCustomerForm(e.target.value, "firstName")}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Last name"
              value={customerForm["lastName"]}
              onChange={(e) => handleCustomerForm(e.target.value, "lastName")}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Age"
              value={customerForm["age"]}
              onChange={(e) => handleCustomerForm(e.target.value, "age")}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="City"
              value={customerForm["city"]}
              onChange={(e) => handleCustomerForm(e.target.value, "city")}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="State"
              value={customerForm["state"]}
              onChange={(e) => handleCustomerForm(e.target.value, "state")}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Country"
              value={customerForm["country"]}
              onChange={(e) => handleCustomerForm(e.target.value, "country")}
            />
          </div>
        </div>
        <div className="add-edit-btns-container">
          {!props.isEditing ? (
            <button className="update-btn" onClick={createCustomer}>
              Submit
            </button>
          ) : (
            <button className="submit-btn" onClick={updateCustomer}>
              Update
            </button>
          )}
          {!props.isEditing ? (
            <button className="cancel-btn" onClick={props.closeAddPopup}>
              Cancel
            </button>
          ) : (
            <button className="cancel-btn" onClick={props.closeEditPopup}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
