import React from "react";
import { useState, useEffect } from "react";

function JournalWidget() {
  const [benefit, setBenefit] = useState([
    "Reduce Stress",
    "Journaling is a incredible stress management tool, a good-for-you habit that lessens impact of physical stressors on your health.",
  ]);
  function handleCount() {}

  function renderBenefit() {
    switch (handleCount) {
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
          "Journaling helps keep your brain in tip-top shape. It boosts memory and comprehension, it also increases working memory capacity, which may reflect improved cognitive processing.",
        ];
        break;
      case 4:
        return [
          "Boosts Mood",
          "Writing, like anything, improves with practice. When you journal every day, you’re practicing the art of writing. And if you use a journal to express your thoughts and ideas, it’ll help improve your overall communication skills.",
        ];
        break;
      case 5:
        return [
          "Strengthens Emotional Functions",
          "Journaling evokes mindfulness and helps writers remain present while keeping perspective. It helps in the management of personal adversity and change, and emphasize important patterns and growth in life. ",
        ];
        break;

        defeat: break;
    }
  }

  useEffect(() => {
    setBenefit(renderBenefit);
  }, []);

  return (
    <div>
      {/* <div>
        <div className="flex flex-col text-center" onClick={handleCount}>
          <span>{benefit[0]}</span>
          <span>{benefit[1]}</span>
        </div>
      </div> */}
      <div>
        <h3 className="text-center font-semibold text-xl">
          It's time to build your gratitude practice
        </h3>
      </div>
    </div>
  );
}
export default JournalWidget;
