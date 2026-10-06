import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./IssueDetails.css";

function IssueDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const statuses = [
        "Pending",
        "Under Review",
        "In Progress",
        "Resolved"
    ];

    useEffect(() => {
        fetchIssue();
    }, [id]);


    const fetchIssue = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/issues/${id}`
            );

            setIssue(response.data);

        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load issue details"
            );

        } finally {

            setLoading(false);

        }
    };


    const getStatusIndex = () => {

        if (!issue) {
            return 0;
        }

        return statuses.indexOf(issue.status);
    };


    const getPriorityClass = (priority) => {

        if (priority === "Critical") {
            return "detail-priority-critical";
        }

        if (priority === "High") {
            return "detail-priority-high";
        }

        if (priority === "Low") {
            return "detail-priority-low";
        }

        return "detail-priority-medium";
    };


    if (loading) {

        return (

            <div className="details-loading">

                <div className="details-spinner"></div>

                <h2>
                    Loading issue details...
                </h2>

            </div>

        );
    }


    if (message || !issue) {

        return (

            <div className="details-error">

                <div className="details-error-icon">
                    ⚠️
                </div>

                <h2>
                    Issue Not Found
                </h2>

                <p>
                    {message || "The requested issue could not be found."}
                </p>

                <button
                    onClick={() => navigate("/my-reports")}
                >
                    ← Back to My Reports
                </button>

            </div>

        );
    }


    const currentStatusIndex = getStatusIndex();


    return (

        <div className="details-page">


            {/* ================= HEADER ================= */}

            <header className="details-header">

                <div
                    className="details-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="details-brand-icon">
                        🌐
                    </div>

                    <div>

                        <div className="details-brand-name">
                            CommunityTracker
                        </div>

                        <div className="details-brand-subtitle">
                            Community Issue Reporting
                        </div>

                    </div>

                </div>


                <nav className="details-nav">

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

                    <button
                        onClick={() => navigate("/my-reports")}
                        className="active"
                    >
                        My Reports
                    </button>

                    <button
                        onClick={() => navigate("/issue-map")}
                    >
                        Issue Map
                    </button>

                </nav>


                <button
                    className="details-dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

            </header>


            {/* ================= MAIN ================= */}

            <main className="details-container">


                {/* BACK */}

                <button
                    className="details-back"
                    onClick={() => navigate("/my-reports")}
                >
                    ← Back to My Reports
                </button>


                {/* TITLE */}

                <section className="details-title-section">

                    <div>

                        <div className="details-label">
                            ISSUE DETAILS
                        </div>

                        <h1>
                            {issue.title}
                        </h1>

                        <p>
                            Track the progress and resolution of this
                            community issue.
                        </p>

                    </div>


                    <span className="details-category">
                        {issue.category}
                    </span>

                </section>


                {/* ================= CONTENT ================= */}

                <div className="details-layout">


                    {/* LEFT */}

                    <div className="details-left">


                        {/* IMAGES */}

                        <section className="details-card">

                            <div className="details-card-heading">
                                <span>
                                    📷
                                </span>

                                <h2>
                                    Issue Images
                                </h2>
                            </div>


                            {issue.images &&
                            issue.images.length > 0 ? (

                                <div className="details-images">

                                    {issue.images.map(
                                        (image, index) => (

                                            <img
                                                key={index}
                                                src={`http://localhost:5000${image}`}
                                                alt={`Issue ${index + 1}`}
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="details-no-image">
                                    📷
                                    <span>
                                        No images uploaded
                                    </span>
                                </div>

                            )}

                        </section>


                        {/* DESCRIPTION */}

                        <section className="details-card">

                            <div className="details-card-heading">

                                <span>
                                    📝
                                </span>

                                <h2>
                                    Description
                                </h2>

                            </div>

                            <p className="details-description">
                                {issue.description}
                            </p>

                        </section>


                        {/* LOCATION */}

                        <section className="details-card">

                            <div className="details-card-heading">

                                <span>
                                    📍
                                </span>

                                <h2>
                                    Location
                                </h2>

                            </div>


                            <div className="location-box">

                                <div className="location-icon">
                                    📍
                                </div>

                                <div>

                                    <small>
                                        REPORTED LOCATION
                                    </small>

                                    <strong>
                                        {issue.location}
                                    </strong>

                                </div>

                            </div>


                            <div className="coordinates">

                                <div>
                                    <small>
                                        LATITUDE
                                    </small>

                                    <strong>
                                        {issue.latitude}
                                    </strong>
                                </div>

                                <div>
                                    <small>
                                        LONGITUDE
                                    </small>

                                    <strong>
                                        {issue.longitude}
                                    </strong>
                                </div>

                            </div>

                        </section>


                        {/* RESOLUTION */}

                        {issue.resolution && (

                            <section className="details-card resolution-card">

                                <div className="details-card-heading">

                                    <span>
                                        ✅
                                    </span>

                                    <h2>
                                        Resolution
                                    </h2>

                                </div>

                                <p>
                                    {issue.resolution}
                                </p>

                            </section>

                        )}

                    </div>


                    {/* RIGHT */}

                    <aside className="details-right">


                        {/* STATUS */}

                        <section className="details-card status-card">

                            <div className="details-card-heading">

                                <span>
                                    🔄
                                </span>

                                <h2>
                                    Issue Status
                                </h2>

                            </div>


                            <div className="status-current">

                                <span>
                                    CURRENT STATUS
                                </span>

                                <strong>
                                    {issue.status}
                                </strong>

                            </div>


                            <div className="timeline">

                                {statuses.map(
                                    (status, index) => {

                                        const completed =
                                            index <= currentStatusIndex;

                                        const current =
                                            index === currentStatusIndex;

                                        return (

                                            <div
                                                className={`timeline-item ${
                                                    completed
                                                        ? "completed"
                                                        : ""
                                                } ${
                                                    current
                                                        ? "current"
                                                        : ""
                                                }`}
                                                key={status}
                                            >

                                                <div className="timeline-marker">

                                                    {completed
                                                        ? "✓"
                                                        : index + 1}

                                                </div>


                                                <div className="timeline-content">

                                                    <strong>
                                                        {status}
                                                    </strong>

                                                    <span>
                                                        {current
                                                            ? "Current status"
                                                            : completed
                                                            ? "Completed"
                                                            : "Pending"}
                                                    </span>

                                                </div>

                                            </div>

                                        );
                                    }
                                )}

                            </div>

                        </section>


                        {/* INFORMATION */}

                        <section className="details-card">

                            <div className="details-card-heading">

                                <span>
                                    ℹ️
                                </span>

                                <h2>
                                    Issue Information
                                </h2>

                            </div>


                            <div className="detail-info-row">

                                <span>
                                    Priority
                                </span>

                                <strong
                                    className={getPriorityClass(
                                        issue.priority
                                    )}
                                >
                                    {issue.priority}
                                </strong>

                            </div>


                            <div className="detail-info-row">

                                <span>
                                    Reported On
                                </span>

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


                            <div className="detail-info-row">

                                <span>
                                    Last Updated
                                </span>

                                <strong>
                                    {new Date(
                                        issue.updatedAt
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


                            <div className="detail-info-row">

                                <span>
                                    Category
                                </span>

                                <strong>
                                    {issue.category}
                                </strong>

                            </div>

                        </section>


                        {/* MAP BUTTON */}

                        <button
                            className="details-map-button"
                            onClick={() => navigate("/issue-map")}
                        >
                            🗺️ View Community Issue Map
                        </button>


                        {/* REPORT BUTTON */}

                        <button
                            className="details-new-button"
                            onClick={() => navigate("/report")}
                        >
                            ＋ Report Another Issue
                        </button>

                    </aside>

                </div>

            </main>

        </div>
    );
}

export default IssueDetails;