import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrinBeam,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";

function JournalEmoji(props) {
  const [emoji, setEmoji] = useState([faFaceGrinBeam, "happy"]);

  function handleActive() {
    // console.log(props);
    if (props.setActiveEmoji) {
      props.setActiveEmoji(props.emojiValue);
    }
  }

  useEffect(() => {
    function renderEmoji() {
      switch (props.emojiValue) {
        case 1:
          setEmoji([faFaceGrinBeam, "happy"]);
          break;
        case 2:
          setEmoji([faFaceSmile, "good"]);
          break;
        case 3:
          setEmoji([faFaceMeh, "meh"]);
          break;
        case 4:
          setEmoji([faFaceFrown, "sad"]);
          break;
        case 5:
          setEmoji([faFaceTired, "down"]);
          break;

        default:
          break;
      }
    }
    renderEmoji();
  }, [props.emojiValue]);

  function renderStyle() {
    if (props.emojiValue === props.activeEmoji) {
      return {
        color: "green",
        height: "45px",
        width: "45px",
      };
    } else {
      return {
        color: "gray",
        height: "45px",
        width: "45px",
      };
    }
  }
  return (
    <div className="flex flex-col text-center" onClick={handleActive}>
      <FontAwesomeIcon style={renderStyle()} icon={emoji[0]} />
      <span>{emoji[1]}</span>
    </div>
  );
}
export default JournalEmoji;
