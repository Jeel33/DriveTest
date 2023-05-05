const User = require("../models/user");
const Appointment = require("../models/appointment");

// GET Ageappointment List
module.exports.getAppointmentList = (req, res, next) => {
  Appointment.find()
    .populate("userId")
    .then((result) => {
      const examinerAllAppointments = JSON.stringify(result);

      res.render("examiner/examPage", {
        examinerAllAppointments,
      });
    })
    .catch((err) => console.log("getExamPage", err));
};

// GET Ageappointment Detail
module.exports.getAppointmentDetail = (req, res, next) => {
  // get it from url: /driverDetail/:id
  const { id } = req.params;

  User.findById(id)
    .then((foundUser) => {
      res.render("examiner/appointmentDetail", {
        user: foundUser,
      });
    })
    .catch((err) => console.log("getAppointmentDetail", err));
};

// POST Evaluation
exports.postEvaluation = (req, res, next) => {
  const { userId } = req.body;

  User.findById(userId)
    .then((user) => {
      return user.storeData(req.body, req, res, true);
    })
    .then((result) => {
      res.redirect("appointmentList");
    })
    .catch((err) => console.log("postEvaluation", err));
};
