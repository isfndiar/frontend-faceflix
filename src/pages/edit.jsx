import React, { useEffect, useState } from "react";
import Banner from "../components/fragments/Banner";
import Input from "../components/Elements/Input";
import ButtonCancelAndSave from "../components/fragments/ButtonCancelAndSave";
import useHandleEdit from "../hooks/useHandleEdit";

const EditProfile = () => {
  console.log("");
  const {
    name,
    setName,
    title,
    setTitle,
    desc,
    setDesc,
    error,
    isOpen,
    setIsOpen,
    profileImage,
    backgroundImage,
    handleBackground,
    handlePhoto,
    handleSubmit,
  } = useHandleEdit();
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="w-full min-h-screen max-w-[532px] mx-auto relative mb-20  ">
        <Banner
          bg="bg-gray-400"
          display="flex justify-center items-center"
          src={backgroundImage || "icon/icon-image.png"}
          w={`${backgroundImage ? "w-full" : "w-14 h-14 mx-auto"} `}
        >
          <input
            accept="image/*"
            onChange={(e) => handleBackground(e)}
            className="absolute opacity-0 inset-0 w-full h-full"
            name="backgroundImage"
            type="file"
          />
        </Banner>
        <div className=" flex  gap-5 items-end absolute top-16 left-5">
          <div className="  w-24 h-24  flex items-center justify-center bg-gray-400 border-2  border-[var(--primary)] overflow-hidden rounded-full relative ">
            <img
              src={profileImage || "icon/icon-image.png"}
              className={`${
                profileImage ? "w-full h-full" : ""
              } object-cover object-center`}
              alt=""
            />
            <input
              onChange={(e) => handlePhoto(e)}
              className="absolute opacity-0 inset-0 w-full h-full"
              type="file"
              accept="image/*"
              name="profileImage"
            />
          </div>
        </div>
        <div className="mt-20 px-7">
          <div className="w-full sm:max-w-[400px] sm:mx-auto bg-[var(--whiteBlue)] px-3 py-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              {error ? (
                <p className="mx-auto text-red-500 text-sm italic">{error}</p>
              ) : null}
              <Input
                type={"text"}
                placeholder={"Nama Kamu disini"}
                name={"name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                type={"text"}
                placeholder={"Title Kamu Disini"}
                name={"title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Deskripsikan Kamu tulis Disini"
                className="px-3"
                cols="35"
                rows="6"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Edit Account</h1>
              <Input name={"email"} type="email" placeholder="Email" />
              <div className="w-full bg-white h-10 flex relative">
                <Input
                  name={"password"}
                  type={isOpen ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3"
                />
                <img
                  className="absolute right-3 top-2"
                  onClick={() => setIsOpen((x) => !x)}
                  src={`icon/eye-${isOpen ? "open" : "close"}.png`}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-3 flex gap-1">
              <ButtonCancelAndSave />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
