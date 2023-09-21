import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateEmployee.css";
import Dropdown from "../../Components/Dropdown/dropdown";
import States from "../../Data/States.json";
import Departments from "../../Data/Departments";
import Modal from "oc-modal-faradji-boucif";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  // Modal
  const [modalReset, setModalReset] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const styleModal = {
    borderRadius: 10,
    boxShadow: "0 0 5px #1B1919",
    color: "#1B1919",
    fontSize: 18,
    height: "fit-content",
    padding: "20px 50px",
    width: "fit-content",
    backgroundColor: "#f5f3f3",
  };

  // Form
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: States[0].abbreviation,
    zipCode: "",
    department: Departments[0].abbreviation,
  });
  const [formOK, setFormOK] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const isFormValid = () => {
    // Vérifiez si tous les champs sont remplis
    for (const key in employee) {
      if (employee[key] === "") {
        setErrorForm("Veuillez remplir tous les champs !");
        return false;
      }
    }
    setErrorForm("");
    return true;
  };

  //send the data to the redux store
  const saveEmployee = (e) => {
    e.preventDefault();
    // verifier si les champs sont remplis grâce à une boucle si un champ est vide alors, on affiche une erreur et on ne valide pas le formulaire
    if (isFormValid() === true) {
      // Soumettez le formulaire ou effectuez d'autres actions
      setFormOK(true);
      document.getElementById("create-employee").reset();
    }
  };

  useEffect(() => {
    if (formOK === true) {
      //send data to the redux store
      dispatch({ type: "employee/addEmployee", payload: employee });
      setDisplayModal(true);
      setModalReset(true);
      setFormOK(false);
      setEmployee({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: States[0].abbreviation,
        zipCode: "",
        department: Departments[0].abbreviation,
      });
    }
  }, [formOK, employee, dispatch]);

  /* Form */
  const handleFormChange = (event) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };
  /* DatePicker */
  const handleFormDateChange = (name, date) => {
    setEmployee({
      ...employee,
      [name]: new Date(date).toLocaleDateString("fr"),
    });
  };
  /* Dropdown */
  const handleFormDropdownChange = (name, value) => {
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <div className="container-first column-flex">
      <header className="title">
        <h1>HRnet</h1>
      </header>
      <div className="container">
        <h2>Create Employee</h2>

        <div className="container-form">
          <form
            onSubmit={saveEmployee}
            className="column-flex"
            id="create-employee"
          >
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              onInput={handleFormChange}
              placeholder="Firstname"
            />

            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              onInput={handleFormChange}
              placeholder="Lastname"
            />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
              className="date-picker-input"
              type="date"
              id="date-of-birth"
              name="dateOfBirth"
              onInput={(date) => {
                handleFormDateChange("dateOfBirth", date.target.value);
              }}
            />

            <label htmlFor="start-date">Start Date</label>
            <input
              name={"startDate"}
              type="date"
              className="date-picker-input"
              id="start-date"
              onInput={(date) => {
                handleFormDateChange("startDate", date.target.value);
              }}
            />

            <fieldset className="address column-flex">
              <legend>Address</legend>
              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                name="street"
                onInput={handleFormChange}
                placeholder={"Street"}
              />

              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                onInput={handleFormChange}
                placeholder={"City"}
              />

              <label htmlFor="state">State</label>
              <Dropdown
                name="state"
                onChangeDropdown={(value) =>
                  handleFormDropdownChange("state", value)
                }
                optionsList={States}
              />

              <label htmlFor="zip-code">Zip Code</label>
              <input
                id="zip-code"
                type="number"
                name="zipCode"
                onInput={handleFormChange}
                placeholder={"Zip Code"}
              />
            </fieldset>

            <label htmlFor="department">Department</label>
            <Dropdown
              name="department"
              id="department"
              onChangeDropdown={(value) =>
                handleFormDropdownChange("department", value)
              }
              optionsList={Departments}
            />
            <p className="error-msg">{errorForm}</p>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <Modal
        key={modalReset}
        id="modal-created"
        show={displayModal}
        close={() => setDisplayModal(false)}
        style={styleModal}
        title="Merci !"
        message="Employee Created !"
      />
    </div>
  );
};

export default CreateEmployee;
