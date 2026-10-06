const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        issueId: {
            type: String,
            unique: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        // GPS coordinates
        latitude: {
            type: Number,
            required: true
        },

        longitude: {
            type: Number,
            required: true
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],
            default: "Medium"
        },

        images: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Under Review",
                "In Progress",
                "Resolved"
            ],
            default: "Pending"
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        assignedTo: {
            type: String,
            default: ""
        },

        resolution: {
            type: String,
            default: ""
        },

        statusHistory: [
            {
                status: String,

                comment: {
                    type: String,
                    default: ""
                },

                updatedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        feedback: {
            rating: {
                type: Number,
                min: 1,
                max: 5
            },

            comment: {
                type: String,
                default: ""
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Issue",
    issueSchema
);