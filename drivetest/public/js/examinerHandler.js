// on examPage.ejs
const filterTestType = $("#filterTestType");
const renderAppointments = $("#renderAppointments");
const examinerAllAppointments = $("#examinerAllAppointments").val();

const allAppointments = (examinerAllAppointments && JSON.parse(examinerAllAppointments)) || [];

const examinerHandler = {
  filterType: "",
  renderList(item) {
    return `
        <a href=${item?.userId ? `/examiner/appointmentDetail/${item?.userId._id}` : "#"} class="list-group-item list-group-item-action justify-content-center p-4">
            <div class="d-flex flex-row w-100 justify-content-around">
                <div>
                    <label>Appointment Date</label>
                    <input value=${item.date} disabled>
                </div>
                <div>
                    <label>Appointment Time</label>
                    <input value=${item.time} disabled>
                </div>
            </div>

            <div class="d-flex flex-row w-100 justify-content-around my-2 px-4">
            ${item?.userId?.firstName ? `
                <div class="d-flex flex-column">
                  <label>First Name</label>
                  <input value=${item?.userId?.firstName} disabled>
                </div>
            ` : ""}
            ${item?.userId?.lastName ? `
                <div class="d-flex flex-column">
                  <label>Last Name</label>
                  <input value=${item?.userId?.lastName} disabled>
                </div>
            ` : ""}
            ${item?.userId?.testType ? `
                <div class="d-flex flex-column">
                  <label>Test Type</label>
                  <input value=${item?.userId?.testType} disabled>
                </div>
            ` : ""}
          </div>
        </a>
    `;
  },
  insertList(data) {
    renderAppointments.children().detach();
    renderAppointments.append(data);
  },
  examinerInitialRender() {
    let data = "";
    console.log(allAppointments);
    allAppointments
      .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
      .map((item) => {
        data += this.renderList(item);
      });
    this.insertList(data);
  },
  examinerFilterData() {
    let data = "";
    filterTestType.change(function (e) {
      examinerHandler.filterType = e.target.value;
      const filterData = allAppointments.filter(item => item?.userId?.testType == examinerHandler.filterType);

      if (filterData.length) {
        filterData.map(item => {
          data += examinerHandler.renderList(item);
        });
        examinerHandler.insertList(data);
        data = "";
        return
      } else if (examinerHandler.filterType == 'ALL') {
        examinerHandler.examinerInitialRender();
        return
      } else {
        examinerHandler.insertList(data);
      }
    });
  },
};
