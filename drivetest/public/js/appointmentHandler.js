
const appointmentHandler = {
	chosenDate: "",
	appointmentInitialHandler() {
		const parentNode = $('#appointmentSlots');
		this.renderTimeSlots(parentNode);

		// display the latest chosen date from data
		if (addedAppointment[0]) {
			$("#appointmentDate").val(addedAppointment[0].date);
			appointmentHandler.chosenDate = addedAppointment[0].date;
			appointmentHandler.renderTimeSlots(parentNode);
		}
		// reload data when the date is changed
		$('#appointmentDate').change((evt) => {
			appointmentHandler.chosenDate = evt.target.value;
			appointmentHandler.renderTimeSlots(parentNode);
		});
	},
	renderTimeSlots(parentNode) {
		const timeSlots = this.getTimeSlots("09:00", "14:00");
		if (Array.isArray(timeSlots) && timeSlots.length) {
			let slots = "";
			timeSlots.map((item) => {
				return slots += `<option value='${this.timeFormat(item)}' ${this.disabledTime(this.timeFormat(item))} >${this.timeFormat(item)}</option>`;
			});

			// if already choose date, re-render time slots
			if (appointmentHandler.chosenDate) {
				parentNode.children().detach();
			}

			parentNode.append(slots);
		}
	},
	// disabled the chosen time slots
	disabledTime(time) {
		if (!addedAppointment.length) return '';
		return addedAppointment.some(item => (item.date == this.chosenDate) && (item.time == time)) ? 'disabled' : '';
	},
	// create an array of time slots
	getTimeSlots(start, end) {
		const startTime = moment(start, 'HH:mm');
		const endTime = moment(end, 'HH:mm');

		if (endTime.isBefore(startTime)) {
			endTime.add(1, 'day');
		};

		const timeSlots = [];

		while (startTime <= endTime) {
			timeSlots.push(new moment(startTime).format('HH:mm'));
			startTime.add(30, 'minutes');
		};
		return timeSlots;
	},
	timeFormat(time) {
		const hourAndMinute = time.split(':');
		const hour = parseInt(hourAndMinute[0]);
		const minute = hourAndMinute[1];
		let newTime = "";
		if (hour > 11) {
			switch (hour) {
				case 12:
					newTime = `${hour}:${minute} PM`;
					break;
				case 24:
					newTime = `${hour - 12}:${minute} AM`;
					break;
				case 22:
				case 23:
					newTime = `${hour - 12}:${minute} PM`;
					break;

				default:
					newTime = `0${hour - 12}:${minute} PM`;
					break;
			}
		} else {
			if (hour > 9) {
				newTime = `${hour}:${minute} AM`;
			} else {
				newTime = `0${hour}:${minute} AM`;
			}
		}
		return newTime;
	}
};
