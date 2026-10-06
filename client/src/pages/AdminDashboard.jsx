import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedIssue, setSelectedIssue] = useState(null);
    const [newStatus, setNewStatus] = useState("Pending");
    const [assignedDepartment, setAssignedDepartment] = useState("");

    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");


    // =====================================================
    // ADMIN LOGIN PROTECTION
    // =====================================================

    useEffect(() => {

        const adminLoggedIn =
            localStorage.getItem("adminLoggedIn");

        if (adminLoggedIn !== "true") {

            navigate("/admin-login");

            return;

        }

        fetchIssues();

    }, [navigate]);


    // =====================================================
    // FETCH ISSUES
    // =====================================================

    const fetchIssues = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/issues"
            );

            setIssues(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch issues:",
                error
            );

            setMessage(
                "Unable to load community issues."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // ADMIN LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("adminLoggedIn");

        navigate("/admin-login");

    };


    // =====================================================
    // STATUS COLOR
    // =====================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Pending":
                return "admin-status-pending";

            case "Under Review":
                return "admin-status-review";

            case "In Progress":
                return "admin-status-progress";

            case "Resolved":
                return "admin-status-resolved";

            default:
                return "";

        }

    };


    // =====================================================
    // ISSUE ICON
    // =====================================================

    const getIssueIcon = (category) => {

        switch (category) {

            case "Pothole":
            case "Potholes":
                return "🚧";

            case "Garbage":
                return "🗑️";

            case "Streetlight":
            case "Streetlights":
                return "💡";

            case "Water Leakage":
                return "💧";

            case "Drainage":
                return "🏢";

            default:
                return "📌";

        }

    };


    // =====================================================
    // OPEN ISSUE EDITOR
    // =====================================================

    const openStatusEditor = (issue) => {

        setSelectedIssue(issue);

        setNewStatus(issue.status);

        setAssignedDepartment(
            issue.assignedTo || ""
        );

        setMessage("");

    };


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const updateStatus = async () => {

        if (!selectedIssue) {
            return;
        }

        try {

            await axios.put(

                `http://localhost:5000/api/issues/${selectedIssue._id}/status`,

                {
                    status: newStatus
                }

            );

            setMessage(
                "Issue status updated successfully!"
            );

            setSelectedIssue(null);

            setAssignedDepartment("");

            fetchIssues();

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to update issue status"
            );

        }

    };


    // =====================================================
    // ASSIGN DEPARTMENT
    // =====================================================

    const assignIssue = async () => {

        if (!selectedIssue) {
            return;
        }

        if (!assignedDepartment) {

            setMessage(
                "Please select a department."
            );

            return;

        }

        try {

            await axios.put(

                `http://localhost:5000/api/issues/${selectedIssue._id}/assign`,

                {
                    assignedTo: assignedDepartment
                }

            );

            setMessage(
                "Issue assigned successfully!"
            );

            setSelectedIssue(null);

            setAssignedDepartment("");

            fetchIssues();

        } catch (error) {

            console.error(
                "Assign Issue Error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to assign issue"
            );

        }

    };


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalIssues =
        issues.length;

    const pendingIssues =
        issues.filter(
            issue => issue.status === "Pending"
        ).length;

    const reviewIssues =
        issues.filter(
            issue => issue.status === "Under Review"
        ).length;

    const progressIssues =
        issues.filter(
            issue => issue.status === "In Progress"
        ).length;

    const resolvedIssues =
        issues.filter(
            issue => issue.status === "Resolved"
        ).length;


    // =====================================================
    // FILTER ISSUES
    // =====================================================

    const filteredIssues = issues.filter(issue => {

        const searchText =
            search.toLowerCase();

        const matchesSearch =

            issue.title
                ?.toLowerCase()
                .includes(searchText) ||

            issue.description
                ?.toLowerCase()
                .includes(searchText) ||

            issue.category
                ?.toLowerCase()
                .includes(searchText) ||

            issue.location
                ?.toLowerCase()
                .includes(searchText);


        const matchesStatus =

            filterStatus === "All" ||
            issue.status === filterStatus;


        return (
            matchesSearch &&
            matchesStatus
        );

    });


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="admin-page">


            {/* HEADER */}

            <header className="admin-header">

                <div
                    className="admin-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="admin-brand-icon">
                        🌐
                    </div>

                    <div>

                        <div className="admin-brand-name">
                            CommunityTracker
                        </div>

                        <div className="admin-brand-subtitle">
                            Community Issue Reporting
                        </div>

                    </div>

                </div>


                <nav className="admin-nav">

                    <button
                        className="admin-nav-active"
                        onClick={() =>
                            navigate("/admin-dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/issue-map")
                        }
                    >
                        Issue Map
                    </button>

                    <button
                        onClick={() =>
                            navigate("/home")
                        }
                    >
                        Home
                    </button>

                </nav>


                <div className="admin-header-actions">

                    <div className="admin-profile">
                        👤
                    </div>

                    <button
                        className="admin-logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* MAIN */}

            <main className="admin-container">


                {/* HERO */}

                <section className="admin-hero">

                    <div>

                        <div className="admin-label">
                            ADMIN CONTROL CENTER
                        </div>

                        <h1>
                            Community Issue Dashboard
                        </h1>

                        <p>
                            Monitor reported issues, review progress,
                            and help keep the community moving forward.
                        </p>

                    </div>


                    <div className="admin-hero-visual">

                        <div className="admin-city-circle">
                            🏙️
                        </div>

                        <div className="admin-hero-pin pin-one">
                            📍
                        </div>

                        <div className="admin-hero-pin pin-two">
                            📍
                        </div>

                        <div className="admin-hero-pin pin-three">
                            📍
                        </div>

                    </div>

                </section>


                {/* MESSAGE */}

                {message && (

                    <div className="admin-message">

                        <span>
                            ✓
                        </span>

                        {message}

                        <button
                            type="button"
                            onClick={() =>
                                setMessage("")
                            }
                        >
                            ×
                        </button>

                    </div>

                )}


                {/* STATISTICS */}

                <section className="admin-stats">

                    <div className="admin-stat-card total">

                        <div className="admin-stat-icon">
                            📊
                        </div>

                        <div>

                            <strong>
                                {totalIssues}
                            </strong>

                            <span>
                                Total Issues
                            </span>

                        </div>

                    </div>


                    <div className="admin-stat-card pending">

                        <div className="admin-stat-icon">
                            🔴
                        </div>

                        <div>

                            <strong>
                                {pendingIssues}
                            </strong>

                            <span>
                                Pending
                            </span>

                        </div>

                    </div>


                    <div className="admin-stat-card review">

                        <div className="admin-stat-icon">
                            🟠
                        </div>

                        <div>

                            <strong>
                                {reviewIssues}
                            </strong>

                            <span>
                                Under Review
                            </span>

                        </div>

                    </div>


                    <div className="admin-stat-card progress">

                        <div className="admin-stat-icon">
                            🔵
                        </div>

                        <div>

                            <strong>
                                {progressIssues}
                            </strong>

                            <span>
                                In Progress
                            </span>

                        </div>

                    </div>


                    <div className="admin-stat-card resolved">

                        <div className="admin-stat-icon">
                            🟢
                        </div>

                        <div>

                            <strong>
                                {resolvedIssues}
                            </strong>

                            <span>
                                Resolved
                            </span>

                        </div>

                    </div>

                </section>


                {/* ISSUE MANAGEMENT */}

                <section className="admin-content-card">

                    <div className="admin-section-top">

                        <div>

                            <div className="admin-section-label">
                                ISSUE MANAGEMENT
                            </div>

                            <h2>
                                Community Issues
                            </h2>

                            <p>
                                Review and update reported community problems.
                            </p>

                        </div>


                        <button
                            className="admin-refresh"
                            onClick={fetchIssues}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {/* SEARCH + FILTER */}

                    <div className="admin-tools">

                        <div className="admin-search">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search issues..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            className="admin-filter"
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value)
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Under Review">
                                Under Review
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Resolved">
                                Resolved
                            </option>

                        </select>

                    </div>


                    {/* ISSUE LIST */}

                    {loading ? (

                        <div className="admin-empty">

                            <div className="admin-empty-icon">
                                ⏳
                            </div>

                            <h3>
                                Loading Issues
                            </h3>

                            <p>
                                Please wait while we fetch the reports.
                            </p>

                        </div>

                    ) : filteredIssues.length === 0 ? (

                        <div className="admin-empty">

                            <div className="admin-empty-icon">
                                📭
                            </div>

                            <h3>
                                No Issues Found
                            </h3>

                            <p>
                                There are no issues matching your search.
                            </p>

                        </div>

                    ) : (

                        <div className="admin-issue-list">

                            {filteredIssues.map(issue => (

                                <article
                                    className="admin-issue-card"
                                    key={issue._id}
                                >

                                    <div className="admin-issue-icon">

                                        {getIssueIcon(
                                            issue.category
                                        )}

                                    </div>


                                    <div className="admin-issue-content">

                                        <div className="admin-issue-top">

                                            <div>

                                                <span className="admin-category">
                                                    {issue.category}
                                                </span>

                                                <h3>
                                                    {issue.title}
                                                </h3>

                                            </div>


                                            <span
                                                className={`admin-status ${getStatusClass(
                                                    issue.status
                                                )}`}
                                            >
                                                {issue.status}
                                            </span>

                                        </div>


                                        <p className="admin-description">
                                            {issue.description}
                                        </p>


                                        <div className="admin-meta">

                                            <span>
                                                📍 {issue.location}
                                            </span>

                                            <span>
                                                ⚡ {issue.priority}
                                            </span>

                                            <span>
                                                📅{" "}
                                                {new Date(
                                                    issue.createdAt
                                                ).toLocaleDateString()}
                                            </span>

                                        </div>


                                        {/* ASSIGNED DEPARTMENT */}

                                        <div className="admin-assignment">

                                            <span>
                                                🏢
                                            </span>

                                            <strong>
                                                Assigned To:
                                            </strong>

                                            <span>
                                                {issue.assignedTo ||
                                                    "Not Assigned"}
                                            </span>

                                        </div>


                                        <div className="admin-actions">

                                            <button
                                                className="admin-update-button"
                                                onClick={() =>
                                                    openStatusEditor(
                                                        issue
                                                    )
                                                }
                                            >
                                                ✏️ Manage Issue
                                            </button>


                                            <button
                                                className="admin-view-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/issue/${issue._id}`
                                                    )
                                                }
                                            >
                                                View Details →
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>


                {/* MAP */}

                <section className="admin-map-card">

                    <div className="admin-map-icon">
                        🗺️
                    </div>

                    <div className="admin-map-content">

                        <h2>
                            Community Issue Map
                        </h2>

                        <p>
                            View reported issues across the community
                            and explore their locations.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/issue-map")
                        }
                    >
                        Open Issue Map →
                    </button>

                </section>

            </main>


            {/* ISSUE MANAGEMENT MODAL */}

            {selectedIssue && (

                <div className="admin-modal-overlay">

                    <div className="admin-modal">

                        <button
                            type="button"
                            className="admin-modal-close"
                            onClick={() =>
                                setSelectedIssue(null)
                            }
                        >
                            ×
                        </button>


                        <div className="admin-modal-icon">
                            ✏️
                        </div>


                        <div className="admin-section-label">
                            ISSUE MANAGEMENT
                        </div>

                        <h2>
                            Manage Issue
                        </h2>

                        <p className="admin-modal-issue">
                            {selectedIssue.title}
                        </p>


                        {/* STATUS */}

                        <label>
                            Issue Status
                        </label>

                        <select
                            value={newStatus}
                            onChange={(e) =>
                                setNewStatus(e.target.value)
                            }
                        >

                            <option value="Pending">
                                🔴 Pending
                            </option>

                            <option value="Under Review">
                                🟠 Under Review
                            </option>

                            <option value="In Progress">
                                🔵 In Progress
                            </option>

                            <option value="Resolved">
                                🟢 Resolved
                            </option>

                        </select>


                        {/* DEPARTMENT */}

                        <label>
                            Assign Department
                        </label>

                        <select
                            value={assignedDepartment}
                            onChange={(e) =>
                                setAssignedDepartment(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Department
                            </option>

                            <option value="Roads Department">
                                🚧 Roads Department
                            </option>

                            <option value="Sanitation Department">
                                🗑️ Sanitation Department
                            </option>

                            <option value="Water Department">
                                💧 Water Department
                            </option>

                            <option value="Electricity Department">
                                💡 Electricity Department
                            </option>

                            <option value="Corporation">
                                🏢 Corporation
                            </option>

                        </select>


                        {/* BUTTONS */}

                        <div className="admin-modal-buttons">

                            <button
                                type="button"
                                className="admin-cancel"
                                onClick={() =>
                                    setSelectedIssue(null)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="admin-save"
                                onClick={updateStatus}
                            >
                                ✓ Save Status
                            </button>


                            <button
                                type="button"
                                className="admin-save"
                                onClick={assignIssue}
                            >
                                🏢 Assign Issue
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminDashboard;