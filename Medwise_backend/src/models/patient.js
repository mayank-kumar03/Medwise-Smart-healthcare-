import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    // Emergency Contact
    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
    },

    // Health Information
    bloodGroup: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    allergies: {
      type: String,
    },
    medications: {
      type: String,
    },
    primaryPhysician: {
      type: String,
    },

    // Insurance Information
    insurance: {
      provider: {
        type: String,
      },
      policyNumber: {
        type: String,
      },
    },

    // ID Proof
    idProof: {
      type: String, // Path to the uploaded file
      required: true,
    },

    // Login Information
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },

    // Consent and Privacy
    termsConsent: {
      type: Boolean,
      required: true,
    },
    shareConsent: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model('Patient', patientSchema);