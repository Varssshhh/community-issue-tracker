import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
                "http://localhost:5000/api/auth/register",
                formData
            );

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            {/* LEFT SIDE */}

            <div className="register-left">

                <div className="register-brand">

                    <div className="register-logo">
                        🌐
                    </div>

                    <span>
                        CommunityTracker
                    </span>

                </div>


                <div className="register-left-content">

                    <div className="register-small-title">
                        COMMUNITY • CONNECT • IMPROVE
                    </div>

                    <h1>
                        Make Your
                        <br />
                        <span>Community Better.</span>
                    </h1>

                    <p>
                        Join your community and help report
                        local issues, track their progress,
                        and create a better place for everyone.
                    </p>


                    <div className="register-points">

                        <div>
                            <span>✓</span>
                            Report community problems
                        </div>

                        <div>
                            <span>✓</span>
                            Track issue resolution
                        </div>

                        <div>
                            <span>✓</span>
                            Help improve your neighbourhood
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-card">

                    <div className="register-icon">
                        ✨
                    </div>

                    <h2>
                        Create Account
                    </h2>

                    <p className="register-subtitle">
                        Start making a difference today
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div className="register-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="register-field">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="register-field">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"
                            }

                            {!loading && <span>→</span>}

                        </button>

                    </form>


                    {message && (

                        <div className="register-message">
                            {message}
                        </div>

                    )}


                    <div className="register-login">

                        Already have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>


                    <button
                        className="register-back"
                        onClick={() => navigate("/home")}
                    >
                        ← Back to Home
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Register;