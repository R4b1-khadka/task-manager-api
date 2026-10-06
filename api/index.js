const express = require("express");
const cors = require("cors");
const db = require("../db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API is working"
    });
});

app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (error, results) => {
        if (error) {
            return res.status(500).json({
                message: "database error"
            });
        }
        res.json(results);
    });
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;
    const sql = "INSERT INTO tasks (title) VALUES (?)";

    db.query(sql, [title], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "database error"
            });
        }
        res.status(201).json({
            id: result.insertId,
            title: title,
            completed: false
        });
    });
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    const sql = "UPDATE tasks SET title = ?, completed = ? WHERE id = ?";

    db.query(sql, [title, completed, id], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Database error"
            });
        }
        res.json({
            id,
            title,
            completed
        });
    });
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "database error"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "task not found"
            });
        }
        res.status(200).json({
            message: "task deleted"
        });
    });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;