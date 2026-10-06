const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Issue = require("../models/Issue");

const router = express.Router();

const JWT_SECRET = "community_issue_tracker_secret";


// =====================================================
// IMAGE STORAGE
// =====================================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const upload = multer({ storage });


// =====================================================
// AUTHENTICATION
// =====================================================

const authenticateUser = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};


// =====================================================
// CREATE ISSUE
// =====================================================

router.post(
    "/",
    authenticateUser,
    upload.array("images", 5),

    async (req, res) => {

        try {

            const {
                title,
                category,
                description,
                location,
                latitude,
                longitude,
                priority
            } = req.body;


            const imagePaths = req.files
                ? req.files.map(
                    file => `/uploads/${file.filename}`
                )
                : [];


            const issueId = "CIT-" + Date.now();


            const issue = new Issue({

                issueId,

                title,

                category,

                description,

                location,

                latitude: Number(latitude),

                longitude: Number(longitude),

                priority: priority || "Medium",

                images: imagePaths,

                reportedBy: req.user.id,

                status: "Pending",

                assignedTo: "",

                resolution: "",

                statusHistory: [
                    {
                        status: "Pending",
                        comment: "Issue reported by citizen"
                    }
                ]

            });


            await issue.save();


            res.status(201).json({

                message: "Issue reported successfully",

                issue

            });


        } catch (error) {

            console.log(
                "Create Issue Error:",
                error
            );

            res.status(500).json({

                message: "Failed to report issue",

                error: error.message

            });

        }

    }
);


// =====================================================
// GET ALL ISSUES
// =====================================================

router.get("/", async (req, res) => {

    try {

        const issues = await Issue
            .find()
            .populate(
                "reportedBy",
                "name email"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json(issues);


    } catch (error) {

        console.log(
            "Get All Issues Error:",
            error
        );

        res.status(500).json({

            message: "Failed to fetch issues",

            error: error.message

        });

    }

});


// =====================================================
// GET MY REPORTS
// =====================================================

router.get(
    "/my",
    authenticateUser,

    async (req, res) => {

        try {

            const issues = await Issue
                .find({
                    reportedBy: req.user.id
                })
                .populate(
                    "reportedBy",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });


            res.status(200).json(issues);


        } catch (error) {

            console.log(
                "Get My Reports Error:",
                error
            );

            res.status(500).json({

                message: "Failed to fetch your reports",

                error: error.message

            });

        }

    }
);


// =====================================================
// UPDATE ISSUE STATUS
// =====================================================

router.put(
    "/:id/status",

    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            const allowedStatuses = [
                "Pending",
                "Under Review",
                "In Progress",
                "Resolved"
            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    message: "Invalid status"

                });

            }


            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message: "Invalid issue ID"

                });

            }


            const issue =
                await Issue.findById(
                    req.params.id
                );


            if (!issue) {

                return res.status(404).json({

                    message: "Issue not found"

                });

            }


            issue.status = status;


            issue.statusHistory.push({

                status,

                comment: "Status updated by admin",

                updatedAt: new Date()

            });


            await issue.save();


            res.status(200).json({

                message:
                    "Issue status updated successfully",

                issue

            });


        } catch (error) {

            console.log(
                "Update Status Error:",
                error
            );

            res.status(500).json({

                message:
                    "Failed to update issue status",

                error: error.message

            });

        }

    }
);


// =====================================================
// ASSIGN ISSUE TO DEPARTMENT
// =====================================================

router.put(
    "/:id/assign",

    async (req, res) => {

        try {

            const {
                assignedTo
            } = req.body;


            const allowedDepartments = [
                "Roads Department",
                "Sanitation Department",
                "Water Department",
                "Electricity Department",
                "Corporation"
            ];


            if (
                !allowedDepartments.includes(
                    assignedTo
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid department"

                });

            }


            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid issue ID"

                });

            }


            const issue =
                await Issue.findById(
                    req.params.id
                );


            if (!issue) {

                return res.status(404).json({

                    message:
                        "Issue not found"

                });

            }


            issue.assignedTo =
                assignedTo;


            await issue.save();


            res.status(200).json({

                message:
                    "Issue assigned successfully",

                issue

            });


        } catch (error) {

            console.log(
                "Assign Issue Error:",
                error
            );

            res.status(500).json({

                message:
                    "Failed to assign issue",

                error: error.message

            });

        }

    }
);


// =====================================================
// GET SINGLE ISSUE
// =====================================================

router.get(
    "/:id",

    async (req, res) => {

        try {

            console.log(
                "Fetching Issue ID:",
                req.params.id
            );


            if (
                !mongoose.Types.ObjectId.isValid(
                    req.params.id
                )
            ) {

                return res.status(400).json({

                    message:
                        "Invalid issue ID"

                });

            }


            const issue =
                await Issue
                    .findById(req.params.id)
                    .populate(
                        "reportedBy",
                        "name email"
                    );


            if (!issue) {

                return res.status(404).json({

                    message:
                        "Issue not found"

                });

            }


            res.status(200).json(issue);


        } catch (error) {

            console.log(
                "Get Single Issue Error:",
                error
            );


            res.status(500).json({

                message:
                    "Failed to fetch issue",

                error: error.message

            });

        }

    }
);


module.exports = router;