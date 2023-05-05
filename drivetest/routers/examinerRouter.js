const express = require("express");
const router = express.Router();

const examinerController = require("../controllers/examinerController");

const isAuth = require("../middleware/is-auth");
const { isExaminer } = require("../middleware/identify");

// appointment list page
router.get("/examiner/appointmentList", isAuth, isExaminer, examinerController.getAppointmentList);
// ageappointment detail page
router.get("/examiner/appointmentDetail/:id", isAuth, isExaminer, examinerController.getAppointmentDetail);
// update test result
router.post("/examiner/evaluation", isAuth, isExaminer, examinerController.postEvaluation);

module.exports = router;
