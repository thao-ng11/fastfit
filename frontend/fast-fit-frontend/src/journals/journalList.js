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
    <div>
      {journalsList.map((journal) => {
        return <JournalsListComponent journalKey={journal} />;
      })}
    </div>
  );
}
export default JournalsList;
