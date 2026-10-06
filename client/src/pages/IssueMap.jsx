import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./IssueMap.css";

import L from "leaflet";


// =====================================================
// FIX LEAFLET MARKER ICON
// =====================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});


// =====================================================
// ISSUE MAP
// =====================================================

function IssueMap() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");


    // =====================================================
    // FETCH ISSUES
    // =====================================================

    useEffect(() => {

        const fetchIssues = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/api/issues"
                );

                setIssues(response.data);

            } catch (error) {

                console.error(
                    "Failed to fetch issues:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchIssues();

    }, []);


    // =====================================================
    // STATUS COLORS
    // =====================================================

    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":
                return "#ef4444";

            case "Under Review":
                return "#f97316";

            case "In Progress":
                return "#3b82f6";

            case "Resolved":
                return "#22c55e";

            default:
                return "#64748b";

        }

    };


    // =====================================================
    // FILTER
    // =====================================================

    const filteredIssues = useMemo(() => {

        if (filterStatus === "All") {
            return issues;
        }

        return issues.filter(
            (issue) =>
                issue.status === filterStatus
        );

    }, [issues, filterStatus]);


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalIssues =
        issues.length;

    const pendingIssues =
        issues.filter(
            (issue) =>
                issue.status === "Pending"
        ).length;

    const progressIssues =
        issues.filter(
            (issue) =>
                issue.status === "In Progress"
        ).length;

    const resolvedIssues =
        issues.filter(
            (issue) =>
                issue.status === "Resolved"
        ).length;


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="map-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="map-header">


                <div
                    className="map-brand"
                    onClick={() =>
                        navigate("/home")
                    }
                >

                    <div className="map-brand-icon">
                        🌐
                    </div>


                    <div>

                        <div className="map-brand-name">
                            CommunityTracker
                        </div>

                        <div className="map-brand-subtitle">
                            Community Issue Reporting
                        </div>

                    </div>

                </div>


                <nav className="map-nav">

                    <button
                        onClick={() =>
                            navigate("/home")
                        }
                    >
                        Home
                    </button>


                    <button
                        onClick={() =>
                            navigate("/report")
                        }
                    >
                        Report Issue
                    </button>


                    <button
                        onClick={() =>
                            navigate("/my-reports")
                        }
                    >
                        My Reports
                    </button>


                    <button
                        className="map-nav-active"
                    >
                        Issue Map
                    </button>

                </nav>


                <button
                    className="map-profile"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    👤
                </button>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="map-container">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="map-hero">


                    <div>

                        <div className="map-label">
                            COMMUNITY • LIVE MAP
                        </div>


                        <h1>
                            Community Issue Map
                        </h1>


                        <p>
                            Explore reported community issues,
                            view their locations, and track their
                            current status.
                        </p>

                    </div>


                    <div className="map-hero-visual">

                        <div className="map-globe">
                            🗺️
                        </div>


                        <span className="map-floating-pin pin-a">
                            📍
                        </span>


                        <span className="map-floating-pin pin-b">
                            📍
                        </span>


                        <span className="map-floating-pin pin-c">
                            📍
                        </span>

                    </div>

                </section>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="map-stats">


                    <div className="map-stat-card">

                        <div className="map-stat-icon blue">
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


                    <div className="map-stat-card">

                        <div className="map-stat-icon red">
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


                    <div className="map-stat-card">

                        <div className="map-stat-icon orange">
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


                    <div className="map-stat-card">

                        <div className="map-stat-icon green">
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


                {/* =================================================
                    MAP CARD
                ================================================= */}

                <section className="map-card">


                    <div className="map-card-header">


                        <div>

                            <div className="map-section-label">
                                LOCATION OVERVIEW
                            </div>


                            <h2>
                                Reported Issues
                            </h2>


                            <p>
                                Select an issue marker to view its details.
                            </p>

                        </div>


                        <button
                            className="map-back-button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>

                    </div>


                    {/* =================================================
                        FILTERS
                    ================================================= */}

                    <div className="map-filters">


                        <button
                            className={
                                filterStatus === "All"
                                    ? "map-filter active"
                                    : "map-filter"
                            }
                            onClick={() =>
                                setFilterStatus("All")
                            }
                        >
                            All
                        </button>


                        <button
                            className={
                                filterStatus === "Pending"
                                    ? "map-filter active pending"
                                    : "map-filter pending"
                            }
                            onClick={() =>
                                setFilterStatus("Pending")
                            }
                        >
                            🔴 Pending
                        </button>


                        <button
                            className={
                                filterStatus === "Under Review"
                                    ? "map-filter active review"
                                    : "map-filter review"
                            }
                            onClick={() =>
                                setFilterStatus("Under Review")
                            }
                        >
                            🟠 Under Review
                        </button>


                        <button
                            className={
                                filterStatus === "In Progress"
                                    ? "map-filter active progress"
                                    : "map-filter progress"
                            }
                            onClick={() =>
                                setFilterStatus("In Progress")
                            }
                        >
                            🔵 In Progress
                        </button>


                        <button
                            className={
                                filterStatus === "Resolved"
                                    ? "map-filter active resolved"
                                    : "map-filter resolved"
                            }
                            onClick={() =>
                                setFilterStatus("Resolved")
                            }
                        >
                            🟢 Resolved
                        </button>

                    </div>


                    {/* =================================================
                        MAP
                    ================================================= */}

                    <div className="map-wrapper">


                        {loading ? (

                            <div className="map-loading">

                                <div>
                                    🗺️
                                </div>

                                <h3>
                                    Loading Community Map
                                </h3>

                                <p>
                                    Fetching reported issues...
                                </p>

                            </div>

                        ) : (

                            <MapContainer
                                center={[
                                    8.7139,
                                    77.7567
                                ]}
                                zoom={10}
                                scrollWheelZoom={true}
                                className="leaflet-map"
                            >


                                <TileLayer
                                    attribution="&copy; OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />


                                {/* =================================================
                                    ISSUE MARKERS
                                ================================================= */}

                                {filteredIssues.map(
                                    (issue) => {

                                        const lat =
                                            Number(
                                                issue.latitude
                                            );

                                        const lng =
                                            Number(
                                                issue.longitude
                                            );


                                        // Ignore invalid coordinates

                                        if (
                                            !Number.isFinite(lat) ||
                                            !Number.isFinite(lng)
                                        ) {
                                            return null;
                                        }


                                        const color =
                                            getStatusColor(
                                                issue.status
                                            );


                                        return (

                                            <React.Fragment
                                                key={issue._id}
                                            >


                                                {/* STATUS CIRCLE */}

                                                <Circle
                                                    center={[
                                                        lat,
                                                        lng
                                                    ]}
                                                    radius={900}
                                                    pathOptions={{
                                                        color: color,
                                                        fillColor: color,
                                                        fillOpacity: 0.12
                                                    }}
                                                />


                                                {/* MARKER */}

                                                <Marker
                                                    position={[
                                                        lat,
                                                        lng
                                                    ]}
                                                >

                                                    <Popup>

                                                        <div className="map-popup">


                                                            <div className="map-popup-category">
                                                                {issue.category}
                                                            </div>


                                                            <h3>
                                                                {issue.title}
                                                            </h3>


                                                            <p>
                                                                {issue.description}
                                                            </p>


                                                            <div>
                                                                📍 {issue.location}
                                                            </div>


                                                            <div>
                                                                ⚡ {issue.priority}
                                                            </div>


                                                            <strong
                                                                style={{
                                                                    color: color
                                                                }}
                                                            >
                                                                {issue.status}
                                                            </strong>


                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/issue/${issue._id}`
                                                                    )
                                                                }
                                                            >
                                                                View Details →
                                                            </button>

                                                        </div>

                                                    </Popup>

                                                </Marker>

                                            </React.Fragment>

                                        );

                                    }
                                )}

                            </MapContainer>

                        )}

                    </div>


                    {/* =================================================
                        LEGEND
                    ================================================= */}

                    <div className="map-legend">


                        <div className="map-legend-title">
                            Status Legend
                        </div>


                        <div className="map-legend-items">


                            <span>
                                <i className="legend-dot pending-dot"></i>
                                Pending
                            </span>


                            <span>
                                <i className="legend-dot review-dot"></i>
                                Under Review
                            </span>


                            <span>
                                <i className="legend-dot progress-dot"></i>
                                In Progress
                            </span>


                            <span>
                                <i className="legend-dot resolved-dot"></i>
                                Resolved
                            </span>


                        </div>

                    </div>

                </section>

            </main>

        </div>

    );

}

export default IssueMap;