import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
// import apiClient from "../api/apiClient";
import { usePostApiHooks } from "../hooks/postApiHooks";

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const {postData} = usePostApiHooks("/register");
  const handleSubmit = async (values) => {
    try {
      const data = await postData(values);
      console.log(data,"data");
      
      if (data.success) {
        window.alert("Register Successfully");
        navigate("/login");
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
            Register
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>

            <Field
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
