
// after POST any appointment time slot, then it will GET on appointment.ejs page when loading again
// store here: <input type="hidden" value="<%= appointments %>" at appointment.ejs with a string format by JSON.stringify()
const getAppointments = $('#appointments').val();

// for function "disabledTime(time)"
// make it into JSON format
const addedAppointment = getAppointments && JSON.parse(getAppointments) || [];

// sorting for latest to the front
addedAppointment.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
console.log("addedAppointment", addedAppointment);

$(document).ready(function () {
    // appointment page
    appointmentHandler.appointmentInitialHandler();
    // G2 page
    g2Handler.appointmentInitialHandler();
    // Examiner page
    examinerHandler.examinerFilterData();
    examinerHandler.examinerInitialRender();
});
