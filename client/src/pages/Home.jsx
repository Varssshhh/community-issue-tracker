import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">

            {/* ================= HEADER ================= */}

            <header className="home-header">

                <div
                    className="brand"
                    onClick={() => navigate("/home")}
                >
                    <div className="brand-logo">
                        🌐
                    </div>

                    <div className="brand-name">
                        CommunityTracker
                    </div>
                </div>

                <nav className="home-nav">

                    <button
                        className="nav-item active"
                        onClick={() => navigate("/home")}
                    >
                        Home
                    </button>

                    <button
                        className="nav-item"
                        onClick={() => navigate("/report")}
                    >
                        Report Issue
                    </button>

                    <button
                        className="nav-item"
                        onClick={() => navigate("/my-reports")}
                    >
                        My Reports
                    </button>

                    <button className="nav-item">
                        About
                    </button>

                </nav>

                <button
                    className="profile-button"
                    onClick={() => navigate("/login")}
                >
                    👤
                </button>

            </header>


            {/* ================= MAIN ================= */}

            <main className="home-container">

                <section className="hero">

                    {/* LEFT */}

                    <div className="hero-content">

                        <div className="eyebrow">
                            COMMUNITY • CONNECT • IMPROVE
                        </div>

                        <h1>
                            Report
                            <br />
                            Community
                            <br />
                            Issues
                            <br />
                            <span>for a Better</span>
                            <br />
                            <span>Tomorrow</span>
                        </h1>

                        <p>
                            Report local issues like potholes,
                            garbage, broken streetlights,
                            water leakage and track their resolution.
                        </p>

                        <button
                            className="report-button"
                            onClick={() => navigate("/report")}
                        >
                            Report an Issue
                            <span>→</span>
                        </button>

                    </div>


                    {/* RIGHT */}

                    <div className="hero-visual">

                        <div className="city-card">

                            <div className="cloud cloud-one">
                                ☁️
                            </div>

                            <div className="cloud cloud-two">
                                ☁️
                            </div>

                            <div className="building building-small-left">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="building building-tall">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="building building-middle">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="building building-small-right">
                                <span />
                                <span />
                                <span />
                            </div>

                            <div className="tree tree-left">
                                🌳
                            </div>

                            <div className="tree tree-right">
                                🌳
                            </div>

                            <div className="road">

                                <div className="road-line" />

                                <div className="car">
                                    🚗
                                </div>

                            </div>

                            <div className="community-label">
                                📍 Your Community
                            </div>

                        </div>


                        {/* CATEGORY CARDS */}

                        <div className="category-grid">

                            <div className="category-card">
                                <div className="category-icon">
                                    🚧
                                </div>
                                <div>Potholes</div>
                            </div>

                            <div className="category-card">
                                <div className="category-icon">
                                    🗑️
                                </div>
                                <div>Garbage</div>
                            </div>

                            <div className="category-card">
                                <div className="category-icon">
                                    💡
                                </div>
                                <div>Streetlights</div>
                            </div>

                            <div className="category-card">
                                <div className="category-icon">
                                    💧
                                </div>
                                <div>Water Leakage</div>
                            </div>

                            <div className="category-card">
                                <div className="category-icon">
                                    🏢
                                </div>
                                <div>Drainage</div>
                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= FEATURES ================= */}

                <section className="feature-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            📝
                        </div>

                        <div>
                            <h3>Report</h3>

                            <p>
                                Tell us about a community issue.
                            </p>
                        </div>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📍
                        </div>

                        <div>
                            <h3>Track</h3>

                            <p>
                                Follow your issue status.
                            </p>
                        </div>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            ✅
                        </div>

                        <div>
                            <h3>Resolve</h3>

                            <p>
                                See when the issue is resolved.
                            </p>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Home;