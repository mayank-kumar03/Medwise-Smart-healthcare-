import express from 'express';
import { createPatient, getPatients, getPatientById, updatePatient, deletePatient } from '../controllers/patientController.js';

export const patientRouter = express.Router();

// Routes
patientRouter.post('/', createPatient); // Create a new patient
patientRouter.get('/', getPatients); // Get all patients
patientRouter.get('/:id', getPatientById); // Get a patient by ID
patientRouter.put('/:id', updatePatient); // Update a patient
patientRouter.delete('/:id', deletePatient); // Delete a patient
