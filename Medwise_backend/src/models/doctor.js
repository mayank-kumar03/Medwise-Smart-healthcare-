import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
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
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Medical Qualifications
    degree: {
      type: String,
      required: true,
    },
    specializations: {
      type: [String], // Array of specializations
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuingAuthority: {
      type: String,
      required: true,
    },

    // Fees
    consultationFees: {
      type: Number,
      required: true,
    },

    // Document upload for Medical License
    licenseFile: {
      type: String, // Path to the uploaded file
      required: true,
    },

    // Timing Slots
    timingSlots: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
        from: {
          type: String, // Stored as a time string
          required: true,
        },
        to: {
          type: String, // Stored as a time string
          required: true,
        },
      },
    ],

    // Additional Information
    bio: {
      type: String,
      required:true,
    },

    // Terms & Conditions acceptance
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
