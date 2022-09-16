import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../Authentication";

function JournalForm() {
  const { state } = useLocation();
  const datetime = new Date().toISOString();
  const navigate = useNavigate();
  const [body, setBody] = useState({
    username: "",
    entry_date: datetime,
    grateful: "",
    daily_aff: "",
    note: "",
    feeling: 1,
  });
  const [token] = useToken();
  // console.log(token);

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
    const customerUrl = `${process.env.REACT_APP_JOURNALS_HOST}/api/journals/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(body);

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      console.log(newCustomer);
      const cleared = {
        username: "",
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
          <div className="w-[800px] h-[600px] bg-[#C7E8F3] shadow-xl border border-gray-300 rounded-lg ">
            <div className="grid-col-row-2 mt-6">
              <h1 className="text-center font-semibold text-2xl py-1 ">
                {" "}
                The Five Minute Journal
              </h1>
              <div className="px-6 py-6 rounded-lg">
                <div className="w-[750px] bg-[#F1F1F1] rounded-md px-4 py-6">
                  <form onSubmit={handleSubmit} id="create-customer-form">
                    <label className="font-semibold px-3 py-1">
                      3 things you are grateful for today
                    </label>
                    <div className="form-floating mb-3  ">
                      <textarea
                        onChange={handleChange}
                        required
                        type="text"
                        name="grateful"
                        id="grateful"
                        value={body.grateful}
                        className="block p-2 px-4 w-[700px] h-[100px] rounded-lg"
                      />
                    </div>
                    <label className="font-semibold px-3 py-1">
                      Daily Affirmation
                    </label>
                    <div className=" form-floating mb-3">
                      <textarea
                        onChange={handleChange}
                        required
                        type="text"
                        name="daily_aff"
                        id="daily_aff"
                        value={body.daily_aff}
                        className="block p-2 px-4 w-[700px] h-[40px] rounded-lg"
                      />
                    </div>
                    <label className="font-semibold px-3 py-1">Note</label>
                    <div className="form-floating mb-3 ">
                      <textarea
                        onChange={handleChange}
                        required
                        type="text"
                        name="note"
                        id="note"
                        value={body.note}
                        className="block p-2 px-4 w-[700px] h-[100px] rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-center py-2 px-4">
                      <button className=" bg-gradient-to-r from-[#c7e8f3] to-[#BF9ACA] btn border border-[#F1F1F1] shadow-sm font-bold  hover:bg-gradient-to-bl from-[#c7e8f3] to-[#BF9ACA] hover:text-[#F1F1F1]">
                        Save today's journal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JournalForm;
