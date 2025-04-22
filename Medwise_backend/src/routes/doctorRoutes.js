import express from 'express';
import { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor,loginDoctor } from '../controllers/doctorController.js';
import multer from "multer";

export const doctorRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes
//doctorRouter.post('/', createDoctor); // Create a new doctor
doctorRouter.post('/', upload.single('licenseFile'), createDoctor);
doctorRouter.get('/', getDoctors); // Get all doctors
doctorRouter.get('/:id', getDoctorById); // Get a doctor by ID
doctorRouter.put('/:id', updateDoctor); // Update a doctor
doctorRouter.delete('/:id', deleteDoctor); // Delete a doctor
doctorRouter.post('/login', loginDoctor); //login doctor

doctorRouter.post('/', upload.single('licenseFile'), createDoctor);
//http://127.0.0.1:8000/api/doctors/