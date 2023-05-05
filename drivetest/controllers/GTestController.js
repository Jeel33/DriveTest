const User = require("../models/user");
const Appointment = require("../models/appointment");

// GET G Page
module.exports.getGTEST = (req, res) => {
  // aquire from session on index.js
  const user = req.user;

  if (user.firstName == "default" || user.lastName == "default" || user.age == 0 || user.licenseNo == "default") {
    console.log("Please update G2 information.");
    return res.redirect("/G2_TEST");
  }

  Appointment.find({})
    .populate("userId") // models/appointment.js
    .then((result) => {
      // all appointments from admin
      const appointments = JSON.stringify(result);

      // selected time slots by current user
      const filteredData = result.filter((item) => item?.userId?._id.valueOf() == user._id);

      res.render("driveTest/G", {
        user,
        filteredData,
        appointments,
      });
    })
    .catch((err) => console.log("err", err));
};

// POST G Update
module.exports.postGTestEditData = (req, res, next) => {
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
              res.redirect("/G_TEST");
            }
          })
          .catch((err) => console.log("err"));
      } else {
        res.redirect("/G_TEST");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 目前沒有用到
// GET G Page (with user id)
// module.exports.getUserIdGTEST = (req, res) => {
//   // get it from url: /G_TEST/:id
//   const id = req.params.id;
//   User.findById({ _id: id })
//     .then((user) => {
//       res.render("driveTest/G", {
//         user,
//       });
//     })
//     .catch((err) => console.log("getUserIdGTEST_err", err));
// };

// 上一版的
// POST G Update
// module.exports.postGTestEditData = (req, res) => {
//   const { make, model, year, platNo, userId } = req.body;

//   User.findById(userId)
//     .then((user) => {
//       (user.car_details.make = make),
//         (user.car_details.model = model),
//         (user.car_details.year = year),
//         (user.car_details.platNo = platNo);
//       return user.save();
//     })
//     .then((result) => {
//       res.redirect(`/G_TEST/${result._id}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
