import axios from "axios";
import React, { useState } from "react";

export default function UploadForm({ handleUpload }) {
  const [file, setFile] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload(file, password);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <p className="text-4xl font-bold mb-10">File Uploader</p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="file"
            className="text-black text-2xl font-semibold pr-4"
          >
            Choose file:
          </label>
          <input
            type="file"
            className="mb-4"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div>
            <label
              htmlFor="file"
              required
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
      </div>
    </div>
  );
}
