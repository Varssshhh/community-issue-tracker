import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";
import IssueDetails from "./pages/IssueDetails";
import IssueMap from "./pages/IssueMap";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* ================= HOME ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />


                {/* ================= USER AUTH ================= */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ================= CITIZEN ================= */}

                <Route
                    path="/dashboard"
                    element={<CitizenDashboard />}
                />

                <Route
                    path="/report"
                    element={<ReportIssue />}
                />

                <Route
                    path="/my-reports"
                    element={<MyReports />}
                />

                <Route
                    path="/issue/:id"
                    element={<IssueDetails />}
                />

                <Route
                    path="/issue-map"
                    element={<IssueMap />}
                />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;