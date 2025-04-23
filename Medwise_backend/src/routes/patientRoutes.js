import express from 'express';
import multer from 'multer';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient,loginPatient } from '../controllers/patientController.js';

export const patientRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the 'uploads/' folder

// Routes
patientRouter.post('/', upload.single('idProof'), createPatient);// Create a new patient with file upload 
patientRouter.post('/login', loginPatient); // Login route for patients
patientRouter.get('/', getPatients); // Get all patients
patientRouter.get('/:id', getPatientById); // Get a patient by ID
patientRouter.put('/:id', updatePatient); // Update a patient
patientRouter.delete('/:id', deletePatient); // Delete a patient
