import React, { useState } from 'react';
import visibility from '../assets/icons/visibility.svg';
import visibilityOff from '../assets/icons/visibility_off.svg';
import './Add.css';

// React Toastify, for notifications
import { Bounce, toast } from "react-toastify";

const Add = ({ setPasswordList, info, setInfo }) => {
    
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const passwordImage = showPassword ? visibility : visibilityOff;
    const passwordType = showPassword ? 'text' : 'password';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    
        // Clear error when user starts typing in a previously invalid field
        setError((prev) => ({
            ...prev,
            [name]: "" 
        }));
    };
    

    const validate = () => {
        let newError = {};
        if (!info.site) newError.site = "Site URL is required";
        if (!info.userName) newError.userName = "Username is required";
        if (!info.password) newError.password = "Password is required";

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        try {
          const response = await fetch("http://localhost:3000/api/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
          });
          
          if (response.ok) {
            const newPassword = await response.json();
            setPasswordList((prev) => [...prev, newPassword]);
            setInfo({ site: "", userName: "", password: "" });
            setShowPassword(false);
            // Toast notification
            toast.success("Password saved successfully!", {
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
          } else {
            toast.error("Failed to save password!");
          }
        } catch (error) {
          toast.error("Error saving password!");
          console.error("Error saving password:", error);
        }
      };


    return (
        <div>
            <form className='add' onSubmit={handleSubmit}>
                <div className="input-site">
                    <input 
                        type="text" 
                        value={info.site} 
                        onChange={handleChange} 
                        name="site" 
                        id="site" 
                        placeholder="Site URL"
                        className={error.site ? "input-error" : ""}
                    />
                    {error.site && <p className="error-message">{error.site}</p>}
                </div>

                <div className="pwd">
                    <div className="input-name">
                        <input 
                            type="text" 
                            value={info.userName} 
                            onChange={handleChange} 
                            name="userName" 
                            id="userName" 
                            placeholder="Username" 
                            className={error.userName ? "input-error" : ""}
                        />
                        {error.userName && <p className="error-message">{error.userName}</p>}
                    </div>

                    <div className="input-pwd">
                        <div className={error.password ? "psd input-error" : "psd"}>
                            <input 
                                type={passwordType} 
                                value={info.password} 
                                onChange={handleChange} 
                                name="password" 
                                id="password" 
                                placeholder="Password"
                            />
                            <img 
                                src={passwordImage} 
                                onClick={() => setShowPassword(prev => !prev)} 
                                alt="show/hide" 
                                style={{ cursor: 'pointer' }} 
                            />
                        </div>
                        {error.password && <p className="error-message">{error.password}</p>}
                    </div>
                </div>

                <div className="save">
                    <button type="submit">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="morph"
                            colors="primary:#ffffff">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
