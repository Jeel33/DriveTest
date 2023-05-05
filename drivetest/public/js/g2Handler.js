// g2 page
const g2Handler = {
    chosenDate: "",
    appointmentInitialHandler() {
        // set today on datepicker
        const todayDate = new Date();
        let day = todayDate.getDate();
        let month = todayDate.getMonth() + 1;
        const year = todayDate.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        const today = year + "-" + month + "-" + day;
        this.chosenDate = today;
        $('#driverAppointmentDate').val(today);

        // render time slots
        this.renderG2TimeSlots($('#driverAppointmentSlots'));

        // re-render when date is changed
        $('#driverAppointmentDate').change(function (e) {
            g2Handler.chosenDate = e.target.value;
            g2Handler.renderG2TimeSlots($('#driverAppointmentSlots'));
        })
    },
    renderG2TimeSlots(parentNode) {
        if (Array.isArray(addedAppointment) && addedAppointment.length) {

            let slots = "";

            addedAppointment.map((item) => {
                if (item.isTimeSlotAvailable) {
                    if (item.date == this.chosenDate) {
                        return slots += `<option value='${item._id}'>${item.time}</option>`;
                    }
                }
            });

            // re-render time slots for chosen date
            if (this.chosenDate) {
                parentNode.children().detach();
            };

            parentNode.append(slots);
        }
    }
}
