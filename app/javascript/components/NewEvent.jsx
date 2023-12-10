import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { csrfToken } from "../utils/csrfToken";
import Cookies from "js-cookie";
import axios from "axios";

import { useParams } from "react-router-dom";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export function BasicDateTimePicker({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default function NewEvent() {
  const navigate = useNavigate();
  const [isFileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [date, setDate] = React.useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      axios
        .get(`/api/events/${id}`, {
          headers: {
            "X-CSRF-Token": csrfToken(),
            "access-token": accessToken,
            "token-type": tokenType,
            client,
            expiry,
            uid,
            authorization,
          },
        })
        .then((response) => {
          setLoading(false);
          setDate(new Date(response.data.data.attributes.datetime));
          setEvent({
            id: response.data.data.id,
            ...response.data.data.attributes,
          });
        });
    }
  }, [id]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      const fileName = uploadedFile.name;
      const shortenedFileName =
        fileName.length > 15 ? `${fileName.substring(0, 12)}...` : fileName;

      setFileName(shortenedFileName);
      setFileUploaded(true);
    }
  };

  const updateEvent = async (form) => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      const formData = new FormData();

      const formErrors = [];

      if (form.get("name") !== "") {
        formData.append("event[name]", form.get("name"));
      }
      if (form.get("description") !== "") {
        formData.append("event[description]", form.get("description"));
      }
      if (form.get("location") !== "") {
        formData.append("event[location]", form.get("location"));
      }
      if (date !== null) {
        formData.append("event[datetime]", date.toLocaleString());
      }
      if (form.get("file-upload").size !== 0) {
        formData.append("event[image]", form.get("file-upload"));
      }

      await axios({
        method: "put",
        headers: {
          "X-CSRF-Token": csrfToken(),
          "access-token": accessToken,
          "token-type": tokenType,
          client,
          expiry,
          uid,
          authorization,
        },
        data: formData,
        url: `/api/events/${id}`,
      });
      navigate("/app/events?status=success");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const createEvent = async (form) => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      const formData = new FormData();

      const formErrors = [];

      if (form.get("name") === "") {
        formErrors.push("name");
      }
      if (form.get("description") === "") {
        formErrors.push("description");
      }
      if (form.get("location") === "") {
        formErrors.push("location");
      }
      if (date === null) {
        formErrors.push("date");
      }
      if (form.get("file-upload").size === 0) {
        formErrors.push("file-upload");
      }

      if (formErrors.length > 0) {
        setErrors(formErrors);
        throw new Error("Missed values");
      }

      formData.append("event[name]", form.get("name"));
      formData.append("event[description]", form.get("description"));
      formData.append("event[location]", form.get("location"));
      formData.append("event[datetime]", date.toLocaleString());
      formData.append("event[image]", form.get("file-upload"));

      await axios({
        method: "post",
        headers: {
          "X-CSRF-Token": csrfToken(),
          "access-token": accessToken,
          "token-type": tokenType,
          client,
          expiry,
          uid,
          authorization,
        },
        data: formData,
        url: "/api/events/",
      });
      navigate("/app/events?status=success");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="h-4/6 w-4/6 flex justify-center mt-24">
      <form action={id ? updateEvent : createEvent}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create Event
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={event ? event.name : ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.includes("name") && (
                  <div className="text-red-500">Name is required</div>
                )}
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo (PNG, JPG)
                </label>
                <div className="mt-2 flex rounded-lg border-gray-900/25 sm:col-span-4">
                  <div className="w-full">
                    <div className=" flex text-sm leading-6 text-gray-600 w-full">
                      <label
                        htmlFor="file-upload"
                        className="mt-2 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 w-full flex"
                      >
                        <span className="border rounded-md py-1.5 px-3.5 ">
                          Upload a file
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                        />
                        <span className="pl-3 text-gray-900 font-normal py-1.5 px-3.5 ">
                          {isFileUploaded ? `${fileName}` : "No file chosen"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {errors.includes("file-upload") && (
                  <div className="text-red-500">Image is required</div>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <BasicDateTimePicker
                  value={date}
                  setValue={setDate}
                  className="block text-sm font-medium leading-6 text-gray-900"
                />
                {errors.includes("date") && (
                  <div className="text-red-500">Datetime is required</div>
                )}
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    defaultValue={event ? event.location : ""}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.includes("location") && (
                    <div className="text-red-500">Location is required</div>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={event ? event.description : ""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your event and why people should
                  join.
                </p>
                {errors.includes("description") && (
                  <div className="text-red-500">Description is required</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 mb-4">
          <Link to="/app/events/manage">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
