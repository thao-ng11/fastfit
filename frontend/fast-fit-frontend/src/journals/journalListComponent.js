import React, { useEffect, useState } from "react";
import JournalEmoji from "./journalEmoji.js";
import JournalModal from "./journalModal";

function JournalsListComponent(props) {
  const [activeModal, setActiveModal] = useState(false);
  function handleDetail() {
    setActiveModal(true);
  }
  return (
    <div>
      <span>{props.journalKey.entry_date}</span>
      <span>
        <JournalEmoji
          activeEmoji={Number(props.journalKey.feeling)}
          setActiveEmoji={false}
          emojiValue={Number(props.journalKey.feeling)}
        />
      </span>
      <div>
        <textarea>{props.journalKey.grateful}</textarea>
        <button onClick={handleDetail}>View Details</button>
      </div>
      <JournalModal
        journal={props.journalKey}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </div>
  );
}
export default JournalsListComponent;
