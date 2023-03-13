import React from "react";

export default function Download({ fileLink }) {
  return (
    <div className="flex">
      <a href={fileLink}>Download Link: {fileLink} </a>}
    </div>
  );
}
