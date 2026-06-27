const { Schema } = require("mongoose");

module.exports = new Schema(
    {
        request_url: {
            type: String,
            required: true
        },
        qr_path: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        visitHistory : [{
            timestamp : { type : Number}
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);
