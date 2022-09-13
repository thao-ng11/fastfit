import { useEffect, useState } from "react";
import JournalsListComponent from "./journalListComponent";

function JournalsList() {
  const [journalsList, setJournalsList] = useState([]);

  const fetchJournalsList = async () => {
    const url = "http://localhost:8040/api/journals/";
    const res = await fetch(url);
    const journalsListArr = await res.json();
    console.log(journalsListArr);
    setJournalsList(journalsListArr);
  };
  useEffect(() => {
    fetchJournalsList();
  }, []);

  return (
    <div className="w-screen py-4">
      <div className="flex items-center justify-center">
        <div className="w-[900px] rounded-lg bg-[#C7E8F3] shadow-xl px-14 py-8">
          <div className="w-[800px]  bg-[#F1F1F1] rounded-md  py-4">
            {journalsList.map((journal) => {
              return <JournalsListComponent journalKey={journal} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default JournalsList;
