// backend/routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getPatients, getPatientById, addPatient } = require('../controllers/patientController');

router.get('/', auth, getPatients);  // Admin can view all patients
router.get('/:id', auth, getPatientById);  // Patients can view their own details
router.post('/', auth, addPatient);  // Admin can add a new patient

module.exports = router;
