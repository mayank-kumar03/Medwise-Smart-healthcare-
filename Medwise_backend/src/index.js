import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import multer from "multer";
import dotenv from 'dotenv';
import { patientRouter } from './routes/patientRoutes.js';
import { doctorRouter } from './routes/doctorRoutes.js';


dotenv.config();

const router = express.Router();

const app = express();
const PORT = process.env.PORT || 8000;
const upload = multer({ dest: 'uploads/' });
// Middleware
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB....!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/patients', patientRouter);
app.use('/api/doctors', upload.single('licenseFile'), doctorRouter);
// router.post('/doctors', upload.single('licenseFile'), createDoctor);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});