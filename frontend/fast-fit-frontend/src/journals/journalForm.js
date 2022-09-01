import React from "react";

class JournalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_date: "",
      grateful: "",
      daily_aff: "",
      note: "",
      feeling: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const key = event.target.name;
    const changeDict = {};
    changeDict[key] = value;
    this.setState(changeDict);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);

    const customerUrl = "http://localhost:8090/api/journal/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      console.log(newCustomer);

      const cleared = {
        entry_date: "",
        grateful: "",
        daily_aff: "",
        note: "",
        feeling: "",
      };
      this.setState(cleared);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="shadow p-4 mt-4">
            <h1> The Five Minute Journal</h1>
            <form onSubmit={this.handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="1. "
                  required
                  type="text"
                  name="grateful"
                  id="grateful"
                  value={this.state.grateful}
                  className="form-control"
                />
                <label htmlFor="name">
                  3 things you are grateful for today
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Daily Affirmation"
                  required
                  type="text"
                  name="daily_aff"
                  id="daily_aff"
                  value={this.state.daily_aff}
                  className="form-control"
                />
                <label htmlFor="address">Daily Affirmation</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Note"
                  required
                  type="text"
                  name="note"
                  id="note"
                  value={this.state.note}
                  className="form-control"
                />
                <label htmlFor="note">Note</label>
              </div>
              <button className="btn btn-primary bg-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JournalForm;
