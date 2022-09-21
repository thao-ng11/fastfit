import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function JournalWidget() {
  const [benefit, setBenefit] = useState([
    "Reduce Stress",
    "Journaling is a incredible stress management tool, a good-for-you habit that lessens impact of physical stressors on your health.",
  ]);
  const [count, setCount] = useState(1);

  function handleCount(direction) {
    switch (direction) {
      case "forward":
        if (count === 5) {
          setCount(1);
        } else {
          setCount(count + 1);
        }
        break;
      case "backwards":
        if (count === 1) {
          setCount(5);
        } else {
          setCount(count - 1);
        }
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    function renderBenefit() {
      switch (count) {
        case 1:
          return [
            "Reduce Stress",
            "Journaling is a incredible stress management tool, a good-for-you habit that lessens impact of physical stressors on your health.",
          ];
          break;
        case 2:
          return [
            "Improves Immune Function",
            "Expressive writing has been shown to improve and strengthen immune celss and combat certain diseases.",
          ];
          break;
        case 3:
          return [
            "Keeps Memory Sharp",
            "Journaling boosts memory and comprehension, which may reflect improved cognitive processing.",
          ];
          break;
        case 4:
          return [
            "Opening Up",
            "Writing privately about a stressful event could encourage some to reach out for social support. This can help with emotional healing..",
          ];
          break;
        case 5:
          return [
            "Strengthens Emotional Functions",
            "Journaling evokes mindfulness. It helps in the management of personal adversity with emphasizing on patterns and growth in life. ",
          ];
          break;

        default:
          break;
      }
    }

    setBenefit(renderBenefit);
  }, [count]);

  return (
    <div>
      <div>
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <div
              className="flex flex-row text-center px-2"
              onClick={handleCount}
            >
              <button
                onClick={() => {
                  handleCount("backwards");
                }}
                className="font-semibold"
              >
                <FontAwesomeIcon
                  className="text-[#8e4162] text-xl font-bold"
                  icon={faChevronLeft}
                />
              </button>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{benefit[0]}</span>
                <span className="text-lg">{benefit[1]}</span>
              </div>
              <button
                onClick={() => {
                  handleCount("forward");
                }}
                className="font-semibold"
              >
                <FontAwesomeIcon
                  className="text-[#8e4162] text-xl font-bold"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </div>
        </div>
        <div>
          <a
            href="../journals"
            className="flex py-1 h-1/2 w-full bg-[#c7e8f3] rounded-md justify-center text-black hover:text-black hover:border-[#195569] border-transparent border-2"
          >
            <h3 className="text-center font-semibold text-lg text-[#8e4162]">
              It's time to build your gratitude practice
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
}
export default JournalWidget;
