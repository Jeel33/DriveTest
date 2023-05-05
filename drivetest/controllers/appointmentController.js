const Appointment = require("../models/appointment");

// GET Appointment Page
module.exports.getAppointmentPage = (req, res) => {
  Appointment.find({})
    .then((appointment) => {
      const appointments = JSON.stringify(appointment);

      res.render("admin/appointment", {
        // target: <input type="hidden" value="<%= appointments %>" at appointment.ejs
        // for later use on front-end: main.js
        appointments,
      });
    })
    .catch((err) => console.log(err));
};

// POST Appointment
module.exports.postAppointmentHandler = (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.redirect("/appointment");
  }

  // 展开符号 {...req.body}，这样就可以将 req.body 对象中的所有属性和值，快速地传递到 Appointment 的构造函数中。
  const makeAppointment = new Appointment({ ...req.body });
  makeAppointment
    .save()
    .then(() => {
      return res.redirect("/appointment");
    })
    .catch((err) => console.log("post appointment err", err));
};

// GET Test Result
module.exports.getExamResultList = (req, res, next) => {
  Appointment.find()
    .populate("userId")
    .then((appointment) => {
      const appointments = JSON.stringify(appointment);
      // checks if the item has a userId property. If it does, the item will be included in the filtered array
      const filterData = appointment.filter((item) => item?.userId);

      res.render("admin/admin", {
        filterData,
        appointments,
      });
    })
    .catch((err) => console.log(err));
};
