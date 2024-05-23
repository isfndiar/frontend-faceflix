import React, { useEffect, useState } from "react";
import { userImages } from "../../services/userImage";
import Modal from "./Modal";

const CardImage = ({ id, data }) => {
  const [imagebyId, setImagebyId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (imageId) => {
    setIsOpen((isOpen) => !isOpen);
    const fetchImage = async () => {
      const config = {
        method: "get",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${id}/image/${imageId}`,
          config
        );
        if (!res.ok) {
          throw new Error("Images not found !!!");
        }
        const getImages = await res.json();
        setImagebyId(getImages?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  };

  return (
    <>
      <section
        className={`mt-5 w-full max-w-[444px]  mx-auto  ${
          data.length > 0 ? "gallery" : ""
        }  `}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item?.id} className="mb-4">
              <img
                onClick={() => handleClick(item?.id)}
                className="w-full cursor-pointer"
                src={item?.image}
                alt={item?.title}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-bold text-red-500">
            Images not found
          </p>
        )}
      </section>
      {isOpen && <Modal data={imagebyId} onclose={() => setIsOpen(false)} />}
    </>
  );
};

export default CardImage;
