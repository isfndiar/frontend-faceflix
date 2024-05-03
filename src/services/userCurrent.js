export const getUserCurrent = async (callback, token, error) => {
  try {
    const config = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/current`, config);
    const json = await res.json();
    callback(json.data.data);
  } catch (err) {
    error(err);
  }
};
