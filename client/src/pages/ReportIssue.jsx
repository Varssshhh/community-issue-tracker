import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ReportIssue.css";


const markerIcon = L.divIcon({
    className: "report-marker",
    html: "📍",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
});


function LocationPicker({ setLocation }) {

    useMapEvents({

        click(e) {

            setLocation({
                latitude: e.latlng.lat.toFixed(6),
                longitude: e.latlng.lng.toFixed(6)
            });

        }

    });

    return null;
}


function ReportIssue() {

    const navigate = useNavigate();


    const [form, setForm] = useState({

        title: "",
        description: "",
        category: "",
        latitude: "",
        longitude: "",
        location: "",
        priority: "Medium"

    });


    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    // =====================================================
    // SET MAP LOCATION
    // =====================================================

    const setLocation = ({ latitude, longitude }) => {

        setForm(prev => ({

            ...prev,

            latitude,
            longitude

        }));

    };


    // =====================================================
    // CURRENT LOCATION
    // =====================================================

    const useCurrentLocation = () => {

        if (!navigator.geolocation) {

            alert(
                "Location is not supported by your browser."
            );

            return;

        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                setForm(prev => ({

                    ...prev,

                    latitude:
                        position.coords.latitude.toFixed(6),

                    longitude:
                        position.coords.longitude.toFixed(6)

                }));

            },

            () => {

                alert(
                    "Unable to get your current location."
                );

            }

        );

    };


    // =====================================================
    // IMAGE FILES
    // =====================================================

    const handleFiles = (e) => {

        const selectedFiles =
            Array.from(e.target.files || []);

        setFiles(selectedFiles);

    };


    // =====================================================
    // SUBMIT ISSUE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // ---------------------------------------------
        // BASIC VALIDATION
        // ---------------------------------------------

        if (
            !form.title ||
            !form.description ||
            !form.category
        ) {

            setError(
                "Please fill all required fields."
            );

            return;

        }


        if (!form.location) {

            setError(
                "Please enter the issue address."
            );

            return;

        }


        if (
            !form.latitude ||
            !form.longitude
        ) {

            setError(
                "Please select the issue location on the map."
            );

            return;

        }


        // ---------------------------------------------
        // GET LOGIN TOKEN
        // ---------------------------------------------

        const token =
            localStorage.getItem("token");


        if (!token) {

            setError(
                "Please login before reporting an issue."
            );

            navigate("/login");

            return;

        }


        try {

            setLoading(true);


            // -----------------------------------------
            // CREATE FORM DATA
            // -----------------------------------------

            const formData = new FormData();


            formData.append(
                "title",
                form.title
            );


            formData.append(
                "description",
                form.description
            );


            formData.append(
                "category",
                form.category
            );


            formData.append(
                "location",
                form.location
            );


            formData.append(
                "latitude",
                form.latitude
            );


            formData.append(
                "longitude",
                form.longitude
            );


            formData.append(
                "priority",
                form.priority
            );


            // -----------------------------------------
            // ADD IMAGES
            // -----------------------------------------

            files.forEach(file => {

                formData.append(
                    "images",
                    file
                );

            });


            // -----------------------------------------
            // SEND TO BACKEND
            // -----------------------------------------

            const response = await axios.post(

                "http://localhost:5000/api/issues",

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


            console.log(
                "Issue created:",
                response.data
            );


            alert(
                "Issue submitted successfully!"
            );


            // -----------------------------------------
            // GO TO MY REPORTS
            // -----------------------------------------

            navigate("/my-reports");


        } catch (error) {

            console.log(
                "Submit Issue Error:",
                error
            );


            if (error.response) {

                setError(

                    error.response.data?.message ||
                    "Failed to submit issue."

                );

            } else {

                setError(
                    "Cannot connect to the backend server."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // MAP POSITION
    // =====================================================

    const mapPosition = [

        Number(form.latitude) || 13.0827,

        Number(form.longitude) || 80.2707

    ];


    return (

        <div className="report-page">


            {/* ================= HEADER ================= */}

            <header className="report-header">

                <div
                    className="report-brand"
                    onClick={() => navigate("/home")}
                >

                    <div className="report-brand-icon">
                        🌐
                    </div>

                    <div>

                        <div className="report-brand-name">
                            CommunityTracker
                        </div>

                        <div className="report-brand-subtitle">
                            Community Issue Reporting
                        </div>

                    </div>

                </div>


                <nav className="report-nav">

                    <button
                        onClick={() => navigate("/home")}
                    >
                        Home
                    </button>

                    <button
                        className="active"
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


                <button
                    className="report-profile"
                    onClick={() => navigate("/dashboard")}
                >
                    👤
                </button>

            </header>


            {/* ================= MAIN ================= */}

            <main className="report-container">


                <div className="report-title-area">

                    <div className="report-label">
                        COMMUNITY REPORT
                    </div>

                    <h1>
                        Report a New Issue
                    </h1>

                    <p>
                        Help improve your community by reporting
                        a local problem.
                    </p>

                </div>


                {/* ERROR MESSAGE */}

                {error && (

                    <div
                        style={{
                            background: "#fee2e2",
                            color: "#b91c1c",
                            padding: "14px 18px",
                            borderRadius: "12px",
                            marginBottom: "20px",
                            fontWeight: "600"
                        }}
                    >
                        ⚠️ {error}
                    </div>

                )}


                {/* ================= FORM + MAP ================= */}

                <form
                    className="report-layout"
                    onSubmit={handleSubmit}
                >


                    {/* ================= FORM CARD ================= */}

                    <section className="report-form-card">


                        <div className="card-heading">

                            <div className="card-heading-icon">
                                📝
                            </div>

                            <div>

                                <h2>
                                    Issue Information
                                </h2>

                                <p>
                                    Tell us what needs to be fixed.
                                </p>

                            </div>

                        </div>


                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Issue Title
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Example: Broken streetlight"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group">

                            <label>
                                Description
                                <span>*</span>
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the problem and where it occurs..."
                                rows="4"
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="form-group">

                            <label>
                                Category
                                <span>*</span>
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select issue category
                                </option>

                                <option value="Pothole">
                                    🚧 Pothole
                                </option>

                                <option value="Garbage">
                                    🗑️ Garbage
                                </option>

                                <option value="Streetlight">
                                    💡 Streetlight
                                </option>

                                <option value="Water Leakage">
                                    💧 Water Leakage
                                </option>

                                <option value="Drainage">
                                    🏢 Drainage
                                </option>

                            </select>

                        </div>


                        {/* PRIORITY */}

                        <div className="form-group">

                            <label>
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >

                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                                <option value="Critical">
                                    Critical
                                </option>

                            </select>

                        </div>


                        {/* ================= LOCATION ================= */}

                        <div className="location-section">

                            <div className="location-heading">

                                <div>

                                    <h3>
                                        📍 Location
                                    </h3>

                                    <p>
                                        Choose the exact issue location.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={useCurrentLocation}
                                    className="location-button"
                                >
                                    📍 Use My Location
                                </button>

                            </div>


                            <div className="coordinate-grid">

                                <div className="form-group">

                                    <label>
                                        Latitude
                                    </label>

                                    <input
                                        type="text"
                                        name="latitude"
                                        value={form.latitude}
                                        onChange={handleChange}
                                        placeholder="13.0827"
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Longitude
                                    </label>

                                    <input
                                        type="text"
                                        name="longitude"
                                        value={form.longitude}
                                        onChange={handleChange}
                                        placeholder="80.2707"
                                    />

                                </div>

                            </div>


                            <div className="form-group">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="Enter the issue address"
                                />

                            </div>

                        </div>


                        {/* ================= IMAGE UPLOAD ================= */}

                        <div className="upload-section">

                            <div className="upload-heading">

                                <div className="upload-icon">
                                    📸
                                </div>

                                <div>

                                    <label>
                                        Upload Images
                                    </label>

                                    <p>
                                        Add photos to help explain the issue.
                                    </p>

                                </div>

                            </div>


                            <label className="upload-box">

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFiles}
                                />

                                <div className="upload-cloud">
                                    ☁️
                                </div>

                                <strong>
                                    Click to upload images
                                </strong>

                                <span>
                                    PNG, JPG or JPEG • Multiple images allowed
                                </span>

                            </label>


                            {files.length > 0 && (

                                <div className="selected-files">

                                    {files.map((file, index) => (

                                        <div
                                            className="selected-file"
                                            key={index}
                                        >

                                            <span>
                                                🖼️
                                            </span>

                                            <span className="file-name">
                                                {file.name}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="submit-report"
                            disabled={loading}
                        >

                            {loading
                                ? "Submitting..."
                                : "Submit Issue"
                            }

                            {!loading && (
                                <span>→</span>
                            )}

                        </button>

                    </section>


                    {/* ================= MAP CARD ================= */}

                    <section className="report-map-card">

                        <div className="map-heading">

                            <div className="map-heading-icon">
                                🗺️
                            </div>

                            <div>

                                <h2>
                                    Select Issue Location
                                </h2>

                                <p>
                                    Click anywhere on the map to place
                                    the issue marker.
                                </p>

                            </div>

                        </div>


                        <div className="report-map">

                            <MapContainer
                                center={mapPosition}
                                zoom={13}
                                scrollWheelZoom={true}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >

                                <TileLayer
                                    attribution="&copy; OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />


                                <LocationPicker
                                    setLocation={setLocation}
                                />


                                {form.latitude &&
                                    form.longitude && (

                                        <Marker
                                            position={[
                                                Number(form.latitude),
                                                Number(form.longitude)
                                            ]}
                                            icon={markerIcon}
                                        />

                                    )}

                            </MapContainer>

                        </div>


                        {/* COORDINATES */}

                        <div className="map-coordinate-box">

                            <div>

                                <span>
                                    LATITUDE
                                </span>

                                <strong>
                                    {form.latitude || "Not selected"}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    LONGITUDE
                                </span>

                                <strong>
                                    {form.longitude || "Not selected"}
                                </strong>

                            </div>

                        </div>


                        <div className="map-tip">

                            <span>
                                💡
                            </span>

                            <p>
                                Tip: Click directly on the map or use
                                your current location to select the issue.
                            </p>

                        </div>

                    </section>

                </form>

            </main>

        </div>

    );

}


export default ReportIssue;