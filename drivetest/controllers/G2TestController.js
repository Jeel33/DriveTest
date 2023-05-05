const User = require("../models/user");
const Appointment = require("../models/appointment");
const bcrypt = require("bcrypt");

// GET G2 Page
module.exports.getG2TEST = (req, res) => {
  // aquire from session on index.js
  const user = req.user;

  Appointment.find({})
    .populate("userId") // models/appointment.js
    .then((result) => {
      // all appointments from admin
      const appointments = JSON.stringify(result);

      // selected time slots by current user
      const filteredData = result.filter((item) => item?.userId?._id.valueOf() == user._id);

      res.render("driveTest/G2", {
        user,
        filteredData,
        appointments,
      });
    })
    .catch((err) => console.log("err", err));
};

// POST G2 Update
module.exports.postG2TestEditData = (req, res, next) => {
  // time here is in ObjectId format
  const { userId, time } = req.body;

  User.findById(userId)
    .then((user) => {
      return req.user.storeData(req.body, req, res);
    })
    .then((result) => {
      if (req.body?.time) {
        Appointment.findById({ _id: time })
          .then((item) => {
            item.isTimeSlotAvailable = false;
            item.userId = userId;
            return item.save();
          })
          .then((result) => {
            if (result) {
              res.redirect("/G2_TEST");
            }
          })
          .catch((err) => console.log("err"));
      } else {
        res.redirect("/G2_TEST");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
