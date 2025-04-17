import express from "express";

import cookieParser from "cookie-parser";
import { doctorRouter } from './routes/doctorRoutes.js';

const app = express();

// Enable CORS for the frontend origin
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// app.use(cors())

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/doctors", doctorRouter);

export { app };

