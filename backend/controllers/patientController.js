// backend/controllers/patientController.js
const Patient = require('../models/Patient');

// Get all patients (Admin only)
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get a specific patient (Patient or Admin)
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // If the user is an admin, allow fetching all patients
    if (req.user.role === 'admin' || req.user._id.toString() === patient.createdBy.toString()) {
      return res.status(200).json(patient);
    }

    // Patients can only access their own data
    if (req.user._id.toString() === patient.createdBy.toString()) {
      return res.status(200).json(patient);
    }

    return res.status(403).json({ message: 'Access forbidden' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Add a new patient (Admin only)
const addPatient = async (req, res) => {
  const { name, age, disease, address, contact } = req.body;

  if (!name || !age || !disease || !address || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newPatient = new Patient({
      name,
      age,
      disease,
      address,
      contact,
      createdBy: req.user._id
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: 'Error adding patient', error: err });
  }
};

module.exports = { getPatients, getPatientById, addPatient };
