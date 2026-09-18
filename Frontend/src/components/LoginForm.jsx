import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        values,
        {
          withCredentials: true,
        },
      );

      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
            Login
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <Field
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <Field
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-center mt-5 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
