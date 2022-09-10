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
    console.log(props);
    if (props.setActiveEmoji) {
      props.setActiveEmoji(props.emojiValue);
    }
  }
  function renderEmoji() {
    switch (props.emojiValue) {
      case 1:
        return [faFaceGrinBeam, "happy"];
        break;
      case 2:
        return [faFaceSmile, "good"];
        break;
      case 3:
        return [faFaceMeh, " meh"];
        break;
      case 4:
        return [faFaceFrown, " sad"];
        break;
      case 5:
        return [faFaceTired, "somber"];
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    setEmoji(renderEmoji);
  }, []);

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
    <div className="flex flex-col" onClick={handleActive}>
      <FontAwesomeIcon style={renderStyle()} icon={emoji[0]} />
      <span>{emoji[1]}</span>
    </div>
  );
}
export default JournalEmoji;
