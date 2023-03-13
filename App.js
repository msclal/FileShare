// import "./App.css";
import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import Password from "./components/Password";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

function App() {
  const [fileLink, setFileLink] = useState(null);

  const handleUpload = (file, password) => {
    console.log(file, password);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    api
      .post("/upload", formData)
      .then((res) => {
        setFileLink(res.data.fileLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("fileLink", fileLink);

  return (
    <div className="h-screen w-full flex justify-start p-10">
      {!fileLink ? (
        <UploadForm handleUpload={handleUpload} />
      ) : (
        // <a href={fileLink}>Download Link: {fileLink} </a>
        <Password fileLink={fileLink} />
      )}
    </div>

    /* {!fileLink ? (
        <UploadForm handleUpload={handleUpload} />
      ) : (
        <>
          {/* <a href={fileLink}>Download Link: {fileLink} </a> */
    // <Password fileLink={fileLink} />
    // </>
    // )} */}
  );
}

export default App;
