import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function csrfToken() {
  const meta = document.querySelector("meta[name=csrf-token]");
  const token = meta && meta.getAttribute("content");

  return token ?? false;
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      const bearerToken = localStorage.getItem("bearerToken");

      fetch("http://localhost:3000/api/events/", {
        method: "GET",
        headers: {
          "X-CSRF-Token": csrfToken(),
          Authorization: bearerToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEvents(data);
        });

      navigate("/app/events");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, []);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bearerToken = localStorage.getItem("bearerToken");

      const response = await fetch("http://localhost:3000/api/events/", {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken(),
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          name: "An event",
          description: "description",
          organizer: "organizer",
          location: "location",
          datetime: new Date().toLocaleString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/app/events");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Events
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Find and organize the best events near your neighborhood
          </p>
        </div>
        <div className="flex mt-8">
          <Link
            to="/app/events/new"
            className=" rounded-md border-2 border-indigo-600 bg-indigo-600 px-8 md:px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Event
          </Link>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-32 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={event.datetime} className="text-gray-500">
                  {event.datetime}
                </time>
                {/* <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a> */}
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {event.name}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {event.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                {/* <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                /> */}
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {event.organizer}
                    </a>
                  </p>
                  {/* <p className="text-gray-600">{post.author.role}</p> */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
