import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetRegistered } from "../store/slices/AuthSlice";
import { login } from "store/thunks/login";
import Layout from "components/Layout";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <Layout title="Auth Site | Login" content="Login page">
      <h1>Log into your Account</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group mt-3">
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
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="btn btn-primary mt-4">Login</button>
        )}
      </form>
    </Layout>
  );
};

export default LoginPage;
