import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthCredentials } from "../api/auth";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    const formData = new FormData();
    formData.append("email", form.get("email"));
    formData.append("password", form.get("password"));
    formData.append("password_confirmation", form.get("password"));
    formData.append("name", form.get("name"));

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/auth",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // const response = await fetch("http://localhost:3000/auth", {
      //   method: "POST",
      //   for
      //   headers: {
      //     "X-CSRF-Token": csrfToken(),
      //   },
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      setAuthCredentials(response);

      // const bearerToken = response.headers.get("Authorization");

      // localStorage.setItem("access-token", bearerToken);
      // localStorage.setItem("client", bearerToken);
      // localStorage.setItem("uid", bearerToken);
      // localStorage.setItem("expiry", bearerToken);
      // localStorage.setItem("token-type", bearerToken);

      navigate("/app/events");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personal / organization name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/app/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
