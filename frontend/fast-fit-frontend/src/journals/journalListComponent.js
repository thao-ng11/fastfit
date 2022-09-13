import React, { useEffect, useState } from "react";
import JournalEmoji from "./journalEmoji.js";
import JournalModal from "./journalModal";

function JournalsListComponent(props) {
  const [activeModal, setActiveModal] = useState(false);
  function handleDetail() {
    setActiveModal(true);
  }
  const date = new Date(props.journalKey.entry_date).toLocaleDateString();
  return (
    <div className="flex items-center justify-center">
      <table>
        <tbody className="flex items-center justify-center px-4 gap-4">
          <td className="font-semibold">{date}</td>
          <td>
            <JournalEmoji
              activeEmoji={Number(props.journalKey.feeling)}
              setActiveEmoji={false}
              emojiValue={Number(props.journalKey.feeling)}
            />
          </td>
          <td>
            <h3 className="font-semibold px-2">3 things I'm grateful for</h3>
            <div className="w-[550px] h-[100px] bg-white rounded-md px-3">
              <div>{props.journalKey.grateful}</div>
            </div>
          </td>
          <JournalModal
            journal={props.journalKey}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        </tbody>
        <div className="flex items-end justify-end py-2 px-4">
          <button
            className="bg-[#BF9ACA] btn rounded font-semibold text-[#F1F1F1]"
            onClick={handleDetail}
          >
            View Details
          </button>
        </div>
      </table>
    </div>
  );
}
export default JournalsListComponent;
