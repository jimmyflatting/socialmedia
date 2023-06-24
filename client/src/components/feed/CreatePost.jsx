import React, { useState } from "react";
import { config } from "../../utils/config";
const apiUrl = config.API_BASE_URL;

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState(1);
  const textArea = document.getElementById("postContent");

  const handleTextFieldFocus = () => {
    setRows(6);
    textArea.classList.remove(`transition-rows-1`);
    textArea.classList.add(`transition-rows-6`);
  };

  const handleTextFieldBlur = () => {
    setRows(1);
    textArea.classList.remove(`transition-rows-6`);
    textArea.classList.add(`transition-rows-1`);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    console.log(fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", message);
    formData.append("imgSrc", file);

    try {
      const response = await fetch(`${apiUrl}post/create`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      console.log("Response status:", response.status);
      const data = await response.text();
      console.log("Response data:", data);
    } catch (error) {
      console.log(error);
    }

    // Reset the form
    setMessage("");
    setFile(null);
    setFileName("");
  };

  return (
    <>
      <form className="card p-3 mb-3" onSubmit={handleSubmit}>
        <div className="form-group mb- mb-2">
          <textarea
            className="form-control"
            id="postContent"
            placeholder="What's on your mind?"
            rows={rows}
            value={message}
            onChange={handleInputChange}
            onFocus={handleTextFieldFocus}
            onBlur={handleTextFieldBlur}
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <input
            className="form-control w-25"
            type="file"
            onChange={handleFileChange}
          />
          <button className="form-control w-25" type="submit">
            Create post
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
