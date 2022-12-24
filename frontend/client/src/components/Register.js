import Layout from "components/Layout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { registerUser } from "store/thunks/registerUser";

function Register() {
  const dispatch = useDispatch();
  const { registered, isLoading } = useSelector((state) => {
    return state.user;
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const { first_name, last_name, email, phone_number, password } = formData;

  if (registered) return <Navigate to="/login" />;

  const handleChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({ first_name, last_name, email, phone_number, password })
    );
  };

  return (
    <Layout title="Auth Site | Register" content="Register page">
      <h1>Register for an account</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group m-3">
          <label className="form-label" htmlFor="first_name">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={first_name}
            required
          />
        </div>
        <div className="form-group m-3">
          <label className="form-label" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="form-control"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={last_name}
            required
          />
        </div>
        <div className="form-group m-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className="form-group m-3">
          <label className="form-label" htmlFor="phone_number">
            Phone-Number
          </label>
          <input
            className="form-control"
            type="number"
            name="phone_number"
            value={phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group m-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        isLoading ? (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        ) : (
        <div>
          <button className="btn btn-primary mt-3">Register</button>
        </div>
        )
      </form>
    </Layout>
  );
}

export default Register;
