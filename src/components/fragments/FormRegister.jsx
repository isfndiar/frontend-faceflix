import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Form from "./Form";
const FormRegister = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLogin(true);
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await res.json();

      if (data.errors) {
        throw data.errors;
      }

      console.log(data);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error);
    } finally {
      setEmail("");
      setPassword("");
      setIsLogin(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        {error ? <p className="text-[13px] text-red-500">{error}</p> : null}
      </div>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className={"flex flex-col gap-2"}
        isDisabled={isLogin}
      >
        <input
          className="rounded-md bg-[#ffeed9] h-10 px-5"
          name="email"
          value={email}
          placeholder="Masukkan email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded-md bg-[#ffeed9] h-10 px-5"
          name="password"
          value={password}
          type="password"
          placeholder="Masukkan Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form>
    </div>
  );
};

export default FormRegister;
