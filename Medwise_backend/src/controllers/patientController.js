import { Patient } from '../models/patient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Parse emergency contact details
    const emergencyContact = {
      name: req.body.emergencyName,
      phone: req.body.emergencyPhone,
      relation: req.body.relation,
    };

    // Parse insurance details
    const insurance = {
      provider: req.body.insuranceProvider,
      policyNumber: req.body.policyNumber,
    };

    // Create a new patient object
    const patientData = {
      fullName: req.body.fullName,
      dob: req.body.dob,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      emergencyContact: emergencyContact,
      bloodGroup: req.body.bloodGroup,
      medicalHistory: req.body.medicalHistory,
      allergies: req.body.allergies,
      medications: req.body.medications,
      primaryPhysician: req.body.primaryPhysician,
      insurance: insurance,
      idProof: req.file ? req.file.path : null, // Handle file upload for ID proof
      username: req.body.username || req.body.email, // Default username to email if not provided
      password: hashedPassword, // Save the hashed password
      termsConsent: req.body.termsConsent === 'on' || req.body.termsConsent === true,
      shareConsent: req.body.shareConsent === 'on' || req.body.shareConsent === true,
    };

    // Save the patient to the database
    const patient = new Patient(patientData);
    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('admittedIn');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('admittedIn');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Patient Login
export const loginPatient = async (req, res) => {
  const { contact, password } = req.body;

  try {
    // Find patient by email or username
    const patient = await Patient.findOne({
      $or: [{ email: contact }, { username: contact }],
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      patient: {
        id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
        username: patient.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
