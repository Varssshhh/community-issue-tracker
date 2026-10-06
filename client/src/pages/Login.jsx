import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 600);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="login-page">

            {/* HEADER */}

            <header className="login-header">

                <div
                    className="login-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="login-brand-icon">
                        🌐
                    </div>

                    <span>
                        CommunityTracker
                    </span>

                </div>

                <button
                    className="login-home-btn"
                    onClick={() => navigate("/home")}
                >
                    ← Home
                </button>

            </header>


            {/* MAIN */}

            <main className="login-main">

                <div className="login-card">

                    {/* TOP ICON */}

                    <div className="login-card-icon">
                        👤
                    </div>


                    <div className="login-heading">

                        <div className="login-label">
                            COMMUNITY • CONNECT • IMPROVE
                        </div>

                        <h1>
                            Welcome Back
                        </h1>

                        <p>
                            Login to continue managing and tracking
                            your community issues.
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="login-field">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="login-field">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >

                            <span>
                                {loading
                                    ? "Logging in..."
                                    : "Login"
                                }
                            </span>

                            {!loading && (
                                <span className="login-arrow">
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    {/* MESSAGE */}

                    {message && (

                        <div
                            className={
                                message === "Login successful!"
                                    ? "login-message login-success"
                                    : "login-message login-error"
                            }
                        >
                            {message}
                        </div>

                    )}


                    {/* REGISTER */}

                    <div className="login-register">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </button>

                    </div>


                    {/* FOOTER */}

                    <div className="login-footer">

                        <span>🔒</span>

                        Secure community access

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Login;