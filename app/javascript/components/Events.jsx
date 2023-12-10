import React, { useEffect, useState, Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import NavBar from "./Navbar";
import { csrfToken } from "../utils/csrfToken";
import Cookies from "js-cookie";
import axios from "axios";

function Alert({ show, setShow, title, description }) {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

function Event({ eventData, actionFunction, actionName }) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  };
  const event = eventData.attributes;
  const id = eventData.id;
  return (
    <article
      key={id}
      className="flex max-w-xl flex-col items-start justify-between border border-gray-100 shadow-lg rounded-2xl rounded-b-none"
    >
      <div className="relative w-full">
        <img
          src={event.image_url}
          alt=""
          className="aspect-[16/9] w-full rounded-2xl rounded-b-none bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="px-5">
        <div className="flex justify-between items-center gap-x-2 text-xs mt-4 w-full ">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-gray-500 ml-1">
              {" "}
              {new Intl.DateTimeFormat("en-GB", options).format(
                new Date(event.datetime)
              )}
            </div>
          </div>

          <div className="text-xs text-gray-500 flex pr-1 items-center">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>{event.location}</div>
          </div>
        </div>
        <div className="group relative">
          <h3 className="mt-4 capitalize text-2xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span className="absolute inset-0" />
              {event.name}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {event.description}
          </p>
          {/* <div className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 flex">
          <a
            // href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {event.organizer}
          </a>
        </div> */}
        </div>
        <div className="mt-8 grid grid-cols-12 gap-x-2 w-full">
          <div className="col-span-12">
            <button
              onClick={() => actionFunction(id)}
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {actionName}
            </button>
          </div>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          {/* <img
          src={event.image_url}
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        /> */}
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const [notJoinedEvents, setNotJoinedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessJoinMessage, setShowSuccessJoinMessage] = useState(false);
  const [showSuccessUnjoinMessage, setShowSuccessUnjoinMessage] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status") && searchParams.get("status") == "success") {
      setShowSuccessMessage(true);
    }
  }, []);

  const unjoinEvent = async (id) => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      await axios({
        url: "/api/events/unjoin",
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
        data: { id },
      });

      axios
        .get("/api/events?status=JOINED", {
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
          setJoinedEvents(response.data.data);
        });

      axios
        .get("/api/events?status=NOT_JOINED", {
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
          setNotJoinedEvents(response.data.data);
        });

      setShowSuccessUnjoinMessage(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const joinEvent = async (id) => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      await axios({
        url: "/api/events/join",
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
        data: { id },
      });

      axios
        .get("/api/events?status=JOINED", {
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
          setJoinedEvents(response.data.data);
        });

      axios
        .get("/api/events?status=NOT_JOINED", {
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
          setNotJoinedEvents(response.data.data);
        });

      setShowSuccessJoinMessage(true);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      axios
        .get("/api/events?status=JOINED", {
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
          setJoinedEvents(response.data.data);
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const {
        "access-token": accessToken,
        "token-type": tokenType,
        client,
        expiry,
        uid,
        authorization,
      } = JSON.parse(Cookies.get("cw_d_session_info"));

      axios
        .get("/api/events?status=NOT_JOINED", {
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
          setNotJoinedEvents(response.data.data);
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, []);

  return (
    <>
      <NavBar location={"/app/events"} />
      <div className="bg-white py-24 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Alert
              show={showSuccessMessage}
              setShow={setShowSuccessMessage}
              title={"Event created successfully!"}
              description={"Anyone can join your event."}
            />
            <Alert
              show={showSuccessJoinMessage}
              setShow={setShowSuccessJoinMessage}
              title={"Joined to the event successfully!"}
              description={"Remember to put it on your calendar."}
            />
            <Alert
              show={showSuccessUnjoinMessage}
              setShow={setShowSuccessUnjoinMessage}
              title={"Unjoined the event successfully!"}
              description={"Remember to remove it from your calendar."}
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Events
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Find and organize the best events near your neighborhood
            </p>
          </div>
          {joinedEvents.length > 0 && (
            <div>
              <div className="mt-10 sm:mt-16 text-xl pb-2 font-bold tracking-tight text-gray-900 sm:text-2xl">
                My next events
              </div>
              <div className="mx-auto pt-10 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-32 border-t border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {joinedEvents.map((eventData) => {
                  return (
                    <Event
                      eventData={eventData}
                      actionName={"View Event"}
                      actionFunction={unjoinEvent}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {notJoinedEvents.length > 0 && (
            <div>
              <div className="mt-10 sm:mt-16 text-xl pb-2 font-bold tracking-tight text-gray-900 sm:text-2xl">
                New events
              </div>
              <div className="mx-auto pt-10 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-32 border-t border-gray-200  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {notJoinedEvents.map((eventData) => {
                  return (
                    <Event
                      eventData={eventData}
                      actionName={"View Event"}
                      actionFunction={joinEvent}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
