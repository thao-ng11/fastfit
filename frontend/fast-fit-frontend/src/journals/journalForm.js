import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JournalForm() {
  const { state } = useLocation();
  const datetime = new Date().toISOString();
  const navigate = useNavigate();
  const [body, setBody] = useState({
    username: "testuser1",
    entry_date: datetime,
    grateful: "",
    daily_aff: "",
    note: "",
    feeling: 1,
  });

  useEffect(() => {
    setBody({ ...body, feeling: state.activeEmoji });
  }, []);
  function handleChange(event) {
    const value = event.target.value;
    const key = event.target.name;
    setBody({ ...body, [key]: value });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const customerUrl = "http://localhost:8040/api/journals/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(body);

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      console.log(newCustomer);
      const cleared = {
        username: "testuser1",
        entry_date: "",
        grateful: "",
        daily_aff: "",
        note: "",
        feeling: "",
      };
      setBody(cleared);
      navigate("/journals/details/");
    }
  }

  return (
    <div className="w-screen py-4">
      <div className="flex items-center justify-center">
        <div className="grid-col-row-2">
          <div className="w-[600px] bg-[#C7E8F3] shadow-xl border border-gray-300 rounded-lg ">
            <div className="grid-col-row-2 mt-10">
              <div className="px-6 py-2 rounded-lg">
                <h1 className="text-center font-semibold text-2xl py-1">
                  {" "}
                  The Five Minute Journal
                </h1>
                <form onSubmit={handleSubmit} id="create-customer-form">
                  <div className="form-floating mb-3 bg-[#F1F1F1]">
                    <input
                      onChange={handleChange}
                      placeholder="Grateful"
                      required
                      type="textarea"
                      name="grateful"
                      id="grateful"
                      value={body.grateful}
                      className="form-control"
                    />
                    <label htmlFor="grateful">
                      3 things you are grateful for today
                    </label>
                  </div>
                  <div className="form-floating mb-3 bg-[#F1F1F1]">
                    <input
                      onChange={handleChange}
                      placeholder="Daily Affirmation"
                      required
                      type="text"
                      name="daily_aff"
                      id="daily_aff"
                      value={body.daily_aff}
                      className="form-control"
                    />
                    <label htmlFor="address">Daily Affirmation</label>
                  </div>
                  <div className="form-floating mb-3 bg-[#F1F1F1]">
                    <input
                      onChange={handleChange}
                      placeholder="Note"
                      required
                      type="text"
                      name="note"
                      id="note"
                      value={body.note}
                      className="form-control"
                    />
                    <label htmlFor="note">Note</label>
                  </div>
                  <button className="bg-[#BF9ACA] btn rounded font-bold text-[#F1F1F1]">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JournalForm;
