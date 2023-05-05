const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// schema template
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Enter your username."],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Enter your password."],
    },
    userType: {
      type: String,
      enum: ["Driver", "Examiner", "Admin"],
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      default: "default",
    },
    lastName: {
      type: String,
      trim: true,
      default: "default",
    },
    age: {
      type: Number,
      trim: true,
      default: 0,
    },
    licenseNo: {
      type: String,
      trim: true,
      default: "default",
    },
    // appointmentData: [
    //   {
    //     appointmentId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Appointment",
    //     },
    //   },
    // ],
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    testType: {
      type: String,
      enum: ["G2", "G"],
    },
    comment: {
      type: String,
    },
    testResult: {
      testType: {
        type: String,
      },
      isPassed: {
        type: Boolean,
      },
    },
    car_details: {
      make: {
        type: String,
        default: "default",
      },
      model: {
        type: String,
        default: "default",
      },
      year: {
        type: Number,
        default: 0,
      },
      platNo: {
        type: String,
        default: "default",
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.isDriver = function () {
	return this.userType == "Driver";
};

userSchema.methods.isExaminer = function () {
	return this.userType == "Examiner";
};

userSchema.methods.isAdmin = function () {
	return this.userType == "Admin";
};

userSchema.methods.storeData = function (data, req, res, examinerComment = false) {
  const {
    firstName,
    lastName,
    age,
    licenseNo,
    make,
    model,
    year,
    platNo,
    userId,
    date,
    time,
    examType,
    examResult,
    examComment,
  } = data;

  if (examinerComment) {
    this.comment = examComment;
    this.testResult = {
      testType: examType,
      isPassed: examResult == "Pass" ? true : false,
    };

    return this.save();

  } else if (this.licenseNo !== "default") {
    this.car_details.make = make;
    this.car_details.model = model;
    this.car_details.year = year;
    this.car_details.platNo = platNo;
    this.testType = examType;

    if (data?.time) {
      this.appointmentId = time;
    }

    return this.save();
  } else {
		return bcrypt.hash(licenseNo, 10).then((hashedLicenseNo) => {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = +age;
      this.licenseNo = hashedLicenseNo;
      this.car_details.make = make;
      this.car_details.model = model;
      this.car_details.year = year;
      this.car_details.platNo = platNo;
			this.testType = examType;

      if (data?.time) {
        this.appointmentId = time;
      }
      return this.save();
    });
	}

	// 上一版
  // if (this.licenseNo !== "default") {
  //   this.car_details.make = make;
  //   this.car_details.model = model;
  //   this.car_details.year = year;
  //   this.car_details.platNo = platNo;

  //   // "time" is in ObjectId format here
  //   if (data?.time) {
  //     this.appointmentData.push({
  //       appointmentId: time,
  //     });
  //   }
  //   return this.save();
  // } else {
  //   return bcrypt.hash(licenseNo, 10).then((hashedLicenseNo) => {
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.age = +age;
  //     this.licenseNo = hashedLicenseNo;
  //     this.car_details.make = make;
  //     this.car_details.model = model;
  //     this.car_details.year = year;
  //     this.car_details.platNo = platNo;

  //     if (data?.time) {
  //       this.appointmentsData.push({
  //         appointmentId: time,
  //       });
  //     }
  //     return this.save();
  //   });
  // }
};

// create the collection
module.exports = mongoose.model('User', userSchema);
//// ('collections(must be singular)', schemaname)
//// export the collection to the database
