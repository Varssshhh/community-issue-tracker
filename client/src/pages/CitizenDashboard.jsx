import { useNavigate } from "react-router-dom";
import "./CitizenDashboard.css";

function CitizenDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const userName = user.name || "Citizen";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (

        <div className="citizen-dashboard">

            {/* ================= HEADER ================= */}

            <header className="cd-header">

                <div
                    className="cd-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="cd-brand-icon">
                        🌐
                    </div>

                    <div>
                        <div className="cd-brand-name">
                            CommunityTracker
                        </div>

                        <div className="cd-brand-subtitle">
                            Community Issue Reporting
                        </div>
                    </div>

                </div>


                <nav className="cd-nav">

                    <button
                        className="cd-nav-active"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/report")}
                    >
                        Report Issue
                    </button>

                    <button
                        onClick={() => navigate("/my-reports")}
                    >
                        My Reports
                    </button>

                    <button
                        onClick={() => navigate("/issue-map")}
                    >
                        Issue Map
                    </button>

                </nav>


                <div className="cd-header-right">

                    <div className="cd-user">
                        <div className="cd-user-avatar">
                            {userName.charAt(0).toUpperCase()}
                        </div>

                        <span>
                            {userName}
                        </span>
                    </div>

                    <button
                        className="cd-logout"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="cd-main">


                {/* ================= WELCOME ================= */}

                <section className="cd-welcome">

                    <div className="cd-welcome-content">

                        <div className="cd-welcome-label">
                            CITIZEN DASHBOARD
                        </div>

                        <h1>
                            Welcome back, {userName} 👋
                        </h1>

                        <p>
                            Help make your community better by reporting
                            local problems and tracking their resolution.
                        </p>


                        <div className="cd-welcome-actions">

                            <button
                                className="cd-primary-btn"
                                onClick={() => navigate("/report")}
                            >
                                <span>＋</span>
                                Report an Issue
                            </button>

                            <button
                                className="cd-secondary-btn"
                                onClick={() => navigate("/issue-map")}
                            >
                                🗺️ View Issue Map
                            </button>

                        </div>

                    </div>


                    {/* CITY VISUAL */}

                    <div className="cd-city-visual">

                        <div className="cd-cloud cloud-one">
                            ☁️
                        </div>

                        <div className="cd-cloud cloud-two">
                            ☁️
                        </div>

                        <div className="cd-building building-one">
                            <div className="cd-windows"></div>
                        </div>

                        <div className="cd-building building-two">
                            <div className="cd-windows"></div>
                        </div>

                        <div className="cd-building building-three">
                            <div className="cd-windows"></div>
                        </div>

                        <div className="cd-tree tree-one">
                            🌳
                        </div>

                        <div className="cd-tree tree-two">
                            🌳
                        </div>

                        <div className="cd-road"></div>

                        <div className="cd-car">
                            🚗
                        </div>

                        <div className="cd-map-pin">
                            📍
                        </div>

                    </div>

                </section>


                {/* ================= STATISTICS ================= */}

                <section className="cd-section">

                    <div className="cd-section-heading">

                        <div>
                            <div className="cd-section-label">
                                OVERVIEW
                            </div>

                            <h2>
                                Your Reports
                            </h2>
                        </div>

                        <button
                            className="cd-view-all"
                            onClick={() => navigate("/my-reports")}
                        >
                            View all →
                        </button>

                    </div>


                    <div className="cd-stats">

                        <div className="cd-stat-card">

                            <div className="cd-stat-icon blue">
                                📢
                            </div>

                            <div className="cd-stat-info">

                                <span>
                                    My Reports
                                </span>

                                <strong>
                                    0
                                </strong>

                                <small>
                                    Total issues reported
                                </small>

                            </div>

                        </div>


                        <div className="cd-stat-card">

                            <div className="cd-stat-icon orange">
                                ⏳
                            </div>

                            <div className="cd-stat-info">

                                <span>
                                    Pending
                                </span>

                                <strong>
                                    0
                                </strong>

                                <small>
                                    Waiting for action
                                </small>

                            </div>

                        </div>


                        <div className="cd-stat-card">

                            <div className="cd-stat-icon purple">
                                🔧
                            </div>

                            <div className="cd-stat-info">

                                <span>
                                    In Progress
                                </span>

                                <strong>
                                    0
                                </strong>

                                <small>
                                    Being resolved
                                </small>

                            </div>

                        </div>


                        <div className="cd-stat-card">

                            <div className="cd-stat-icon green">
                                ✓
                            </div>

                            <div className="cd-stat-info">

                                <span>
                                    Resolved
                                </span>

                                <strong>
                                    0
                                </strong>

                                <small>
                                    Successfully resolved
                                </small>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= QUICK ACTIONS ================= */}

                <section className="cd-section">

                    <div className="cd-section-heading">

                        <div>

                            <div className="cd-section-label">
                                GET STARTED
                            </div>

                            <h2>
                                Quick Actions
                            </h2>

                        </div>

                    </div>


                    <div className="cd-actions">


                        {/* REPORT */}

                        <div className="cd-action-card">

                            <div className="cd-action-top">

                                <div className="cd-action-icon blue-bg">
                                    📸
                                </div>

                                <span className="cd-action-number">
                                    01
                                </span>

                            </div>

                            <h3>
                                Report an Issue
                            </h3>

                            <p>
                                Found a pothole, garbage problem,
                                broken streetlight or other issue?
                            </p>

                            <button
                                onClick={() => navigate("/report")}
                            >
                                Report Now
                                <span>→</span>
                            </button>

                        </div>


                        {/* MY REPORTS */}

                        <div className="cd-action-card">

                            <div className="cd-action-top">

                                <div className="cd-action-icon purple-bg">
                                    📋
                                </div>

                                <span className="cd-action-number">
                                    02
                                </span>

                            </div>

                            <h3>
                                My Reports
                            </h3>

                            <p>
                                View all the community issues
                                you have reported.
                            </p>

                            <button
                                onClick={() => navigate("/my-reports")}
                            >
                                View Reports
                                <span>→</span>
                            </button>

                        </div>


                        {/* MAP */}

                        <div className="cd-action-card">

                            <div className="cd-action-top">

                                <div className="cd-action-icon green-bg">
                                    🗺️
                                </div>

                                <span className="cd-action-number">
                                    03
                                </span>

                            </div>

                            <h3>
                                Community Map
                            </h3>

                            <p>
                                Explore reported issues around
                                your community on the map.
                            </p>

                            <button
                                onClick={() => navigate("/issue-map")}
                            >
                                Open Map
                                <span>→</span>
                            </button>

                        </div>

                    </div>

                </section>


                {/* ================= BOTTOM INFO ================= */}

                <section className="cd-bottom-grid">


                    <div className="cd-info-card">

                        <div className="cd-info-icon">
                            💡
                        </div>

                        <div>

                            <h3>
                                Make Every Report Count
                            </h3>

                            <p>
                                Add clear photos and an accurate location
                                to help authorities resolve issues faster.
                            </p>

                        </div>

                    </div>


                    <div className="cd-info-card">

                        <div className="cd-info-icon">
                            📍
                        </div>

                        <div>

                            <h3>
                                Track Your Community
                            </h3>

                            <p>
                                Follow the status of reported issues and
                                see how your community is improving.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default CitizenDashboard;