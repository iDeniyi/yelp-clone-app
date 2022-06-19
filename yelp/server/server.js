require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const db = require("./db")
const cors = require("cors")

// morgan middleware
app.use(morgan("tiny"))

app.use(cors())
app.use(express.json())

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants")
        console.log(results)
        res.status(201).json({
            status: "success",
            data_count: results.rows.length,
            data: {
                restaurants: results.rows
            },
        });
    } catch (err) {
        console.log(err)
    }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        res.status(200).json({
            status:"success",
            data: {
                restaurant: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Add a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query(
            "INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            },
        });
    } catch (err) {
        console.log(err)
    }
});

//update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        res.status(200).json({
            status:"success",
            data: {
                restaurant: result.rows[0]
            },
        });
    } catch (err) {
        console.log(err)
    }
})

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`SERVER IS UP AND LISTENING ON PORT ${port}`);
});