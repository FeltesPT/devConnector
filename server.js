import express from "express";
import mongoose from "mongoose";
import { urlencoded, json } from "body-parser";

import auth from "./routes/api/auth";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

const app = express();

// Body Parser Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

// DB Config
import { mongoURI as db } from "./config/keys";

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connect"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));

// Use routs
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
