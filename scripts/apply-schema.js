const fs = require("fs");
const path = require("path");
const db = require("../db");

const schema = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf8");

db.query(schema, (error, results) => {
    if (error) {
        console.error("Schema failed:", error.message);
        process.exit(1);
    }
    console.log("Schema applied successfully");
    db.end();
});