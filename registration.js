import React, { Component, Fragment } from "react";
import axios from "axios";
import "./registration.css";
import { Link } from "react-router-dom";

// Functional component for Registration Form
const RegistrationForm = ({
  organisations,
  formData,
  errors,
  handleInputChange,
  handleSave,
}) => {
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="login-container well">
              <h3 className="text-center">
                <strong>Register</strong>
              </h3>
              <h5 className="text-center">Create an account</h5>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Name" className="d-block">
                      <strong>Name</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="text"
                      id="Name"
                      placeholder="Enter Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                    />
                    {errors.Name && (
                      <span className="error-message">{errors.Name}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="EmailId" className="d-block">
                      <strong>Email Id</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="email"
                      id="EmailId"
                      placeholder="Enter Email Id"
                      value={formData.EmailId}
                      onChange={handleInputChange}
                    />
                    {errors.EmailId && (
                      <span className="error-message">{errors.EmailId}</span>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Password" className="d-block">
                      <strong>Password</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="password"
                      id="Password"
                      placeholder="Enter Password"
                      value={formData.Password}
                      onChange={handleInputChange}
                    />

                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="d-block">
                      <strong>Confirm Password</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="password"
                      id="confirmPassword"
                      placeholder="Re-Enter Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="OrganisationName" className="d-block">
                      <strong>Organisation</strong>
                    </label>
                    {formData.OrganisationName === "Others" ? (
                      <input
                        type="text"
                        className="form-control input-field"
                        id="OrganisationName"
                        value={formData.OtherOrganisationName}
                        onChange={handleInputChange}
                        placeholder="Enter Organisation Name"
                      />
                    ) : (
                      <select
                        className="form-control input-field"
                        id="OrganisationName"
                        value={formData.OrganisationName}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Organisation</option>
                        {organisations.map((org) => (
                          <option key={org.id} value={org.name}>
                            {org.name}
                          </option>
                        ))}
                        <option value="Others">Others</option>
                      </select>
                    )}
                    {/* <select
                      className="form-control input-field"
                      id="OrganisationName"
                      value={formData.OrganisationName}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Organisation</option>
                      {organisations.map((org) => (
                        <option key={org.id} value={org.name}>
                          {org.name}
                        </option>
                      ))}
                    </select> */}
                    {errors.OrganisationName && (
                      <span className="error-message">
                        {errors.OrganisationName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="PhoneNo" className="d-block">
                      <strong>Phone No</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="text"
                      id="PhoneNo"
                      placeholder="Enter Phone No"
                      value={formData.PhoneNo}
                      onChange={handleInputChange}
                    />
                    {errors.PhoneNo && (
                      <span className="error-message">{errors.PhoneNo}</span>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="btn btn-primary save-button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Class component for Registration (handles data fetching and form submission)
class Registration extends Component {
  constructor(props) {
    super(props); //super() is used to call the constructor of the parent class
    this.state = {
      organisations: [],
      formData: {
        Name: "",
        EmailId: "",
        Password: "",
        confirmPassword: "",
        OrganisationName: "",
        PhoneNo: "",
      },
      errors: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://localhost:7068/api/user/GetOrganisation"
      );
      this.setState({ organisations: response.data, isLoading: false });
      console.log("Data fetched -> organisations");
    } catch (error) {
      console.error("Error fetching organisations:", error);
      this.setState({ isLoading: false });
    }
  }
  //to dynamically update the component's state (formData) based on user input.
  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      // previous state as argument
      formData: {
        ...prevState.formData, //(spread) ... operator -> to create new obj and copying the existing formData
        [id]: value, // and then updating
      },
    }));
  };
  

  validateForm = () => {
    const { Name, EmailId, OrganisationName,Password, confirmPassword,PhoneNo } = this.state.formData;
    const errors = {};
    if(!Name){
      errors.Name = "Name is required"
    }
    if (!EmailId){
      errors.EmailId = "Email Id is required"
    }
      if (!Password) {
        errors.password = "Password is required";
      } else if (Password.length < 8 || Password.length > 16) {
        errors.password =
          "Password must be between 8 to 16 characters in length";
      } else if (!/[A-Z]/.test(Password)) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(Password)) {
        errors.password = "Password must contain at least one digit";
      } else if (!/[^A-Za-z0-9]/.test(Password)) {
        errors.password =
          "Password must contain at least one special character";
      }

    if (Password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!OrganisationName){
      errors.OrganisationName = "Organistion is required";
    }
    if (!PhoneNo){
      errors.PhoneNo = "Phone Number is required";
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  handleSave = () => {
    const isValid = this.validateForm();

    if (isValid) {
      // data object to send to the server
      const { Name, EmailId, Password, OrganisationName, PhoneNo } =
        this.state.formData;
      //   const data = {
      //     Name,
      //     EmailId,
      //     Password,
      //     OrganisationName,
      //     PhoneNo,
      //   };

      const url = "https://localhost:7068/api/user/RegisterForm";
      console.log(Name);
      console.log(EmailId);
      console.log(Password);
      console.log(OrganisationName);
      console.log(PhoneNo);
      axios
        // .post(url, data)
        .post(url, null, {
          params: {
            Name,
            EmailId,
            Password,
            OrganisationName,
            PhoneNo,
          },
        })
        .then((response) => {
          if (response.data === "Data Inserted") {
            alert("Data saved successfully!");
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            // Conflict error - Email ID already exists
            alert("Email ID already exists... Try Loging In");
          } else {
            alert("Error occurred while saving data: " + error);
          }
        });
    }
  };

  render() {
    const { organisations, isLoading, formData, errors } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <RegistrationForm
        organisations={organisations} //props sent as argument
        formData={formData}
        errors={errors}
        handleInputChange={this.handleInputChange}
        handleSave={this.handleSave}
      />
    );
  }
}

export default Registration;
