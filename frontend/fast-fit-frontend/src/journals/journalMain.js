import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JournalEmoji from "./journalEmoji";
import { summary } from "date-streaks";

function JournalMain() {
  const [activeEmoji, setActiveEmoji] = useState(1);
  const [journalDates, setJournalDates] = useState([]);
  const [streak, setStreak] = useState({ currentStreak: 0 });
  const [count, setCount] = useState([]);

  const fetchJournalDates = async () => {
    const url = "http://localhost:8040/api/journals";
    const res = await fetch(url);
    const journalData = await res.json();
    console.log(journalData);
    let journalDatesArr = [];
    for (let journal of journalData) {
      journalDatesArr.push(journal.entry_date);
    }
    setJournalDates(journalDatesArr);
    setCount(journalDatesArr.length);
    console.log(journalDatesArr);
    console.log(journalDatesArr.length);
  };

  useEffect(() => {
    fetchJournalDates();
  }, []);

  useEffect(() => {
    setStreak(summary(journalDates));
  }, [journalDates]);

  useEffect(() => {
    setCount(journalDates.length);
  }, [journalDates]);
  console.log("Count", count);

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/journals/form", { state: { activeEmoji: activeEmoji } });
  }

  function handleNavigateList() {
    navigate("/journals/details");
  }

  return (
    <div className="w-screen py-4">
      <div className="flex items-center justify-center">
        <div className="grid-col-row-2">
          <div className="w-[600px] bg-[#C7E8F3] shadow-xl border border-gray-300 rounded-lg ">
            <div className="grid-col-row-2 mt-10">
              <div className="px-6 py-2 rounded-lg">
                <div className="grid-col-row-2 bg-[#F1F1F1] rounded-md">
                  <h1 className="text-center font-semibold text-2xl py-4">
                    How are you feeling today?
                  </h1>
                  <div className="emojiscale flex flex-row gap-6 items-center justify-center py-2">
                    <JournalEmoji
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      emojiValue={1}
                    />
                    <JournalEmoji
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      emojiValue={2}
                    />
                    <JournalEmoji
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      emojiValue={3}
                    />
                    <JournalEmoji
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      emojiValue={4}
                    />
                    <JournalEmoji
                      activeEmoji={activeEmoji}
                      setActiveEmoji={setActiveEmoji}
                      emojiValue={5}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-center font-semibold text-xl">
                  It's time to build your gratitude practice
                </h3>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="bg-[#BF9ACA] btn rounded font-bold text-[#F1F1F1]"
                    onClick={handleNavigate}
                  >
                    Start today's journal
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-[600px] bg-[#C7E8F3] shadow-xl rounded-lg">
              <div className="grid-col-row-2 mt-10">
                <div className="px-6 py-4 rounded-lg shadow-xl">
                  <div className="grid grid-cols-3 items-center justify-center bg-[#F1F1F1] rounded-md py-4 px-3">
                    <span className="font-semibold">
                      {" "}
                      Total Entries: {count}{" "}
                    </span>
                    <span className="font-semibold">
                      {" "}
                      Current Streak: {streak.currentStreak}{" "}
                    </span>

                    <button
                      className="bg-[#BF9ACA] btn rounded font-bold text-[#F1F1F1]"
                      onClick={handleNavigateList}
                    >
                      Your journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JournalMain;
