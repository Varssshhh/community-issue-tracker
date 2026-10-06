import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (
            email === "admin@communitytracker.com" &&
            password === "admin123"
        ) {

            localStorage.setItem("adminLoggedIn", "true");

            navigate("/admin-dashboard");

        } else {

            setMessage("Invalid admin email or password.");

        }
    };

    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-icon">
                    🛡️
                </div>

                <div className="admin-login-label">
                    ADMIN PORTAL
                </div>

                <h1>
                    Admin Login
                </h1>

                <p>
                    Sign in to manage community issues
                </p>

                <form onSubmit={handleLogin}>

                    <label>
                        Admin Email
                    </label>

                    <input
                        type="email"
                        placeholder="admin@communitytracker.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {message && (
                        <div className="admin-login-error">
                            {message}
                        </div>
                    )}

                    <button type="submit">
                        Login to Admin Dashboard →
                    </button>

                </form>

                <button
                    className="admin-back-home"
                    onClick={() => navigate("/home")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>

    );
}

export default AdminLogin;

