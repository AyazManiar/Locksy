import React, { useState } from "react";
import "./PasswordCard.css";
import edit from "../assets/icons/edit.svg";
import del from "../assets/icons/delete.svg";
import visibility from "../assets/icons/visibility.svg";
import visibilityOff from "../assets/icons/visibility_off.svg";
import copy from "../assets/icons/copy.svg";
import { Bounce, toast } from "react-toastify";

const PasswordCard = ({ id, item, handleEdit, handleDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordImage = showPassword ? visibility : visibilityOff;
  const passwordType = showPassword ? "text" : "password";

  const react_toast = (text) => {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        react_toast("Copied to clipboard!");
      })
      .catch((err) => {
        react_toast("Failed to copy!");
        console.error("Copy error:", err);
      });
  };

  return (
    <div className="card">
      <div className="card-info">
        <div className="siteName">
          <p>{item.site}</p>
          <img
            className="copy-icon"
            onClick={() => copyText(item.site)}
            src={copy}
            alt="Click to copy"
          />
        </div>
        <div className="userName">
          <p>{item.userName}</p>
          <img
            className="copy-icon"
            onClick={() => copyText(item.userName)}
            src={copy}
            alt="Click to copy"
          />
        </div>
        <div className="password">
          <input
            type={passwordType}
            value={item.password}
            name="password"
            className="password"
            readOnly
          />
          <img
            src={passwordImage}
            onClick={() => setShowPassword((prev) => !prev)}
            alt="show/hide"
            style={{ cursor: "pointer" }}
          />
          <img
            className="copy-icon"
            onClick={() => copyText(item.password)}
            src={copy}
            alt="Click to copy"
          />
        </div>
      </div>
      <div className="card-btn">
        <button className="edit" onClick={() => handleEdit(id, item)}>
          <img src={edit} alt="edit" />
        </button>
        <button className="delete" onClick={() => handleDelete(id)}>
          <img src={del} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default PasswordCard;