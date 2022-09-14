import React, { useState } from "react";
import JournalEmoji from "./journalEmoji.js";
import JournalModal from "./journalModal";

function JournalsListComponent(props) {
  const [activeModal, setActiveModal] = useState(false);
  function handleDetail() {
    setActiveModal(true);
  }
  const date = new Date(props.journalKey.entry_date).toLocaleDateString();
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="font-semibold px-4">{date}</td>
            <td className="px-3">
              <JournalEmoji
                activeEmoji={Number(props.journalKey.feeling)}
                setActiveEmoji={false}
                emojiValue={Number(props.journalKey.feeling)}
              />
            </td>
            <td className="w-[550px] h-[110px] align-text-top  bg-white rounded-md px-3 py-1">
              <div className="font-semibold">3 things I'm grateful for</div>
              <div>{props.journalKey.grateful}</div>
            </td>
            <td>
              <JournalModal
                journal={props.journalKey}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
              />
            </td>
          </tr>
          <tr>
            <td className="py-3" colSpan="3" style={{ textAlign: "right" }}>
              <button
                className="bg-[#BF9ACA] btn rounded font-semibold text-[#F1F1F1]"
                onClick={handleDetail}
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default JournalsListComponent;
