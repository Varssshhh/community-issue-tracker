import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyReports.css";

function MyReports() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMyReports();
    }, []);

    const fetchMyReports = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://localhost:5000/api/issues/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setIssues(response.data);

        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to load your reports"
            );

        } finally {

            setLoading(false);

        }
    };


    const getStatusClass = (status) => {

        if (status === "Resolved") {
            return "status-resolved";
        }

        if (status === "In Progress") {
            return "status-progress";
        }

        if (status === "Under Review") {
            return "status-review";
        }

        return "status-pending";
    };


    const getPriorityClass = (priority) => {

        if (priority === "Critical") {
            return "priority-critical";
        }

        if (priority === "High") {
            return "priority-high";
        }

        if (priority === "Low") {
            return "priority-low";
        }

        return "priority-medium";
    };


    /* ================= LOADING ================= */

    if (loading) {

        return (
            <div className="reports-loading">

                <div className="loading-spinner"></div>

                <h2>
                    Loading your reports...
                </h2>

                <p>
                    Please wait a moment.
                </p>

            </div>
        );
    }


    return (

        <div className="reports-page">


            {/* ================= HEADER ================= */}

            <header className="reports-header">

                <div
                    className="reports-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="reports-brand-icon">
                        🌐
                    </div>

                    <div>

                        <div className="reports-brand-name">
                            CommunityTracker
                        </div>

                        <div className="reports-brand-subtitle">
                            Community Issue Reporting
                        </div>

                    </div>

                </div>


                <nav className="reports-nav">

                    <button
                        onClick={() => navigate("/home")}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => navigate("/report")}
                    >
                        Report Issue
                    </button>

                    <button className="active">
                        My Reports
                    </button>

                    <button
                        onClick={() => navigate("/issue-map")}
                    >
                        Issue Map
                    </button>

                </nav>


                <div className="reports-header-actions">

                    <button
                        className="reports-dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className="reports-profile"
                        onClick={() => navigate("/dashboard")}
                    >
                        👤
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="reports-container">


                {/* TITLE */}

                <section className="reports-title">

                    <div>

                        <div className="reports-label">
                            COMMUNITY TRACKER
                        </div>

                        <h1>
                            My Reports
                        </h1>

                        <p>
                            Track the community issues you have reported
                            and follow their progress.
                        </p>

                    </div>


                    <button
                        className="new-report-btn"
                        onClick={() => navigate("/report")}
                    >
                        <span>＋</span>
                        Report New Issue
                    </button>

                </section>


                {/* ERROR */}

                {message && (

                    <div className="reports-message">

                        <span>
                            ⚠️
                        </span>

                        {message}

                    </div>

                )}


                {/* EMPTY */}

                {!message && issues.length === 0 && (

                    <div className="reports-empty">

                        <div className="empty-illustration">
                            📭
                        </div>

                        <h2>
                            No Reports Yet
                        </h2>

                        <p>
                            You haven't reported any community issues yet.
                            Start by reporting your first issue.
                        </p>

                        <button
                            onClick={() => navigate("/report")}
                        >
                            ＋ Report Your First Issue
                        </button>

                    </div>

                )}


                {/* SUMMARY */}

                {!message && issues.length > 0 && (

                    <div className="reports-summary">

                        <div className="summary-left">

                            <span className="summary-icon">
                                📋
                            </span>

                            <div>

                                <strong>
                                    {issues.length}
                                </strong>

                                <span>
                                    {issues.length === 1
                                        ? " Report"
                                        : " Reports"}
                                </span>

                            </div>

                        </div>


                        <button
                            onClick={() => navigate("/issue-map")}
                            className="map-link"
                        >
                            🗺️ View Community Map →
                        </button>

                    </div>

                )}


                {/* REPORT CARDS */}

                <div className="reports-grid">

                    {issues.map((issue) => (

                        <article
                            className="report-card"
                            key={issue._id}
                        >


                            {/* IMAGE */}

                            <div className="report-image-container">

                                {issue.images &&
                                issue.images.length > 0 ? (

                                    <img
                                        src={`http://localhost:5000${issue.images[0]}`}
                                        alt={issue.title}
                                        className="report-image"
                                    />

                                ) : (

                                    <div className="report-no-image">

                                        <div>
                                            📷
                                        </div>

                                        <span>
                                            No image available
                                        </span>

                                    </div>

                                )}


                                {/* STATUS */}

                                <span
                                    className={`report-status ${getStatusClass(
                                        issue.status
                                    )}`}
                                >

                                    <span className="status-dot"></span>

                                    {issue.status}

                                </span>


                                {/* CATEGORY */}

                                <span className="report-category">
                                    {issue.category}
                                </span>

                            </div>


                            {/* CARD CONTENT */}

                            <div className="report-card-content">

                                <h2>
                                    {issue.title}
                                </h2>


                                <p className="report-description">
                                    {issue.description}
                                </p>


                                {/* INFORMATION */}

                                <div className="report-info-list">


                                    <div className="report-info">

                                        <span className="info-icon">
                                            📍
                                        </span>

                                        <div>

                                            <small>
                                                LOCATION
                                            </small>

                                            <strong>
                                                {issue.location ||
                                                    "Location not provided"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="report-info">

                                        <span className="info-icon">
                                            ⚡
                                        </span>

                                        <div>

                                            <small>
                                                PRIORITY
                                            </small>

                                            <strong
                                                className={getPriorityClass(
                                                    issue.priority
                                                )}
                                            >
                                                {issue.priority ||
                                                    "Medium"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="report-info">

                                        <span className="info-icon">
                                            📅
                                        </span>

                                        <div>

                                            <small>
                                                REPORTED ON
                                            </small>

                                            <strong>
                                                {new Date(
                                                    issue.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* VIEW DETAILS */}

                                <button
                                    className="view-report-btn"
                                    onClick={() =>
                                        navigate(
                                            `/issue/${issue._id}`
                                        )
                                    }
                                >

                                    View Issue Details

                                    <span>
                                        →
                                    </span>

                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            </main>

        </div>
    );
}

export default MyReports;