import axios from "axios";
import React, { useState } from "react";
import Download from "./Download";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default function Password({ fileLink }) {
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = fileLink.substring(fileLink.lastIndexOf("/") + 1);
    try {
      const id = fileLink.substring(fileLink.lastIndexOf("/") + 1);
      console.log(id, password);
      const res = await api.post(`/file/${id}`, { password });
      if (res.status === 200) {
        setError(false);
        setTrigger(true);
        await api.get(`/download/${id}`);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }

    // api
    //   .post(`/file/${id}`, { password })
    //   .then((res) => {
    //     if (res.status !== 200) {
    //       setError(true);
    //     } else {
    //       setError(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      {!trigger && (
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="file"
              className="text-black text-2xl font-semibold pr-4"
            >
              Password:
            </label>
            <input
              type="password"
              className="w-1/2 mb-4 bg-slate-200 py-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md mb-4 bg-green-300 text-lg font-semibold"
          >
            Submit
          </button>
        </form>
      )}
      {error && (
        <span className="text-red-500 text-2xl font-semibold">
          Incorrect Password
        </span>
      )}
      {!error && trigger && (
        <>
          <p className="text-3xl font-semibold">Download Link</p>
          <a href={fileLink} className="text-2xl hover:text-green-700">
            {fileLink}{" "}
          </a>
        </>
      )}
    </div>
  );
}
