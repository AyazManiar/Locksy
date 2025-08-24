import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import PasswordCard from "./components/PasswordCard";
// React Toastify: Container, Written at the end
import { Bounce, ToastContainer, toast } from "react-toastify";

function App() {
  // React Toastify, for notifications
  const react_toast = (text)=>{
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
  }

  const [passwordList, setPasswordList] = useState([]);
  const [info, setInfo] = useState({ site: "", userName: "", password: "" });

  // Fetch passwords from backend on mount
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/password");
        const data = await response.json();
        setPasswordList(data);

        
      } catch (error) {
        react_toast("Failed to fetch passwords!");
        console.error("Error fetching passwords:", error);
      }
    };
    fetchPasswords();
  }, []);

  const handleEdit = async (id, item) => {
    setInfo(() => ({
      site: item.site,
      userName: item.userName,
      password: item.password,
    }));
    // Delete the existing password after setting info for editing
    try {
      const response = await fetch(`http://localhost:3000/api/password/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPasswordList(passwordList.filter((item) => item._id !== id));
        react_toast("Ready to edit password!");
      } else {
        react_toast("Failed to delete password for editing!");
      }
    } catch (error) {
      react_toast("Error during edit operation!");
      console.error("Error editing password:", error);
    }
  };

  const handleDelete = async (id) => {
    const result = confirm("Are you sure you want to delete this?");
    if (result) {
      try {
        const response = await fetch(`http://localhost:3000/api/password/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPasswordList(passwordList.filter((item) => item._id !== id));
          react_toast("Deleted successfully!");
        } else {
          react_toast("Failed to delete password!");
        }
      } catch (error) {
        react_toast("Error deleting password!");
        console.error("Error deleting password:", error);
      }
    }
  };

  return (
    <>
    
      {/* Applying background from: https://bg.ibelick.com/ */}
      <div
        className="absolute top-0 z-[-2] h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(205,225,252,0.5)_100%)]
"
      >
        {/* Our Content Here */}
        <Navbar />

        <div className="top">
          <div className="header">
            <p>Manage your passwords in an organized way</p>
          </div>
          <Add
            setPasswordList={setPasswordList}
            info={info}
            setInfo={setInfo}
          />
        </div>
        <div className="password-list">
          <h2>Your Passwords</h2>
          {passwordList.length === 0 ? <h3>No password saved</h3> : null}
          <div className="passwordContainer">
            {passwordList.map((item) => (
              <PasswordCard
              key={item._id}
              id={item._id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
      

      <ToastContainer/>
    </>
  );
}

export default App;
