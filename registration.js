import React, { Component, Fragment } from "react";
import axios from "axios";

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
      <div>Registration</div>
      <label>Name</label>
      <input
        type="text"
        id="Name"
        placeholder="Enter Name"
        value={formData.Name}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label>Email Id</label>
      <input
        type="email"
        id="EmailId"
        placeholder="Enter Email Id"
        value={formData.EmailId}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        id="Password"
        placeholder="Enter Password"
        value={formData.Password}
        onChange={handleInputChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}
      <br />
      <label>Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Re-Enter Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      {errors.confirmPassword && (
        <span className="error">{errors.confirmPassword}</span>
      )}
      <br />
      <label>Organisation</label>
      <select
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
      </select>
      <br />
      <br />
      <label>Phone No</label>
      <input
        type="text"
        id="PhoneNo"
        placeholder="Enter Phone No"
        value={formData.PhoneNo}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <button onClick={handleSave}>Save</button>
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
    this.setState((prevState) => ({ // previous state as argument
      formData: {
        ...prevState.formData,  //(spread) ... operator -> to create new obj and copying the existing formData
        [id]: value, // and then updating
      },
    }));
  };

  validateForm = () => {
    const { Password, confirmPassword } = this.state.formData;
    const errors = {};

    if (!Password) {
      errors.password = "Password is required";
    } else if (Password.length < 8 || Password.length > 16) {
      errors.password = "Password must be between 8 to 16 characters in length";
    } else if (!/[A-Z]/.test(Password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(Password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[^A-Za-z0-9]/.test(Password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (Password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
          alert("Error occurred while saving data: " + error);
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
