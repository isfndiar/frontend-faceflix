import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const CardBlog = ({ id, data }) => {
  const [modalBlog, setModalBlog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (blogId) => {
    setIsOpen((isOpen) => !isOpen);

    const fetchBlog = async () => {
      const config = {
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${id}/blog/${blogId}`,
          config
        );
        if (!res.ok) {
          throw new Error("Images not found !!!");
        }
        const getBlog = await res.json();
        setModalBlog(getBlog.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  };

  return (
    <>
      <section
        className={`mt-5 w-full max-w-[444px] mx-auto  grid ${
          data.length > 0 ? "grid-cols-2" : ""
        } gap-1`}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <div
              onClick={() => handleClick(item?.id)}
              key={item?.id}
              className="max-w-sm p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow"
            >
              <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                {item.title}
              </h1>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                {item?.text}
              </p>
              <a className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more {`>`}
              </a>
            </div>
          ))
        ) : (
          <p className="text-center   text-xl font-bold text-red-500">
            Blogs not found
          </p>
        )}
      </section>
      {isOpen && <Modal data={modalBlog} onclose={() => setIsOpen(false)} />}
    </>
  );
};

export default CardBlog;
