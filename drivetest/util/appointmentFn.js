
// 目前沒用到

function setDatesToString(appointment) {
	// set appointments array to json string
	return appointment.length && JSON.stringify(appointment);
}

module.exports = {
	setDatesToString
}
