import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrinBeam,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
import JournalEmoji from "./journalEmoji";

function JournalMain() {
  const [activeEmoji, setActiveEmoji] = useState(1);

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/journals/form", { state: { activeEmoji: activeEmoji } });
  }
  return (
    <div className="container">
      <div className="journalentry">
        <div>
          <h3>How are you feeling today?</h3>
          <div className="emojiscale flex flex-row">
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
        <h3>It's time to build your gratitude practice</h3>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNavigate}
        >
          Start today's journal
        </button>
      </div>
      <div className="progress"></div>
    </div>
  );
}
export default JournalMain;
