import React, { useEffect, useState } from "react";
import useLogin from "./useLogin";

const useFetchData = () => {
  const [dataImage, setDataImage] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);
  const { data } = useLogin();

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const apiurl = import.meta.env.VITE_API_URL;
    const fetchData = async (type, callback) => {
      try {
        const res = await fetch(`${apiurl}/users/${data?.id}/${type}`, config);
        const json = await res.json();
        callback(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData("image", (data) => setDataImage(data));
    fetchData("video", (data) => setDataVideo(data));
    fetchData("blog", (data) => setDataBlog(data));
  }, [data?.id]);

  return {
    dataBlog,
    dataImage,
    dataVideo,
    data,
  };
};

export default useFetchData;
