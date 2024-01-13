import React from 'react';
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";
import './CustomInput.css'
const CustomInput = ({togglePassword, handlePasswordChange, handleTogglePass, password}) => {
    return (
        <div className="form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <div className="password-input-container">
                <input
                    className="register-input"
                    type={!togglePassword ? "password" : "text"}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {password.length ? <div
                    className="password-toggle-icon"
                    onClick={handleTogglePass}
                >
                    {togglePassword ? (
                        <img width={24} src={viewIcon} alt="view-icon"/>
                    ) : (
                        <img width={24} src={hideIcon} alt="hide-icon"/>
                    )}
                </div> : null}
            </div>
        </div>
    );
};

export default CustomInput;