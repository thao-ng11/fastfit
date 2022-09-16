import { useEffect, useState } from "react";
import JournalsListComponent from "./journalListComponent";
import { useToken } from "../Authentication";

function JournalsList() {
  const [token] = useToken();
  console.log(token);
  const [journalsList, setJournalsList] = useState([]);

  const fetchJournalsList = async () => {
    const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    if (tokenResponse.status === 200) {
      const { token } = await tokenResponse.json();

      const url = `${process.env.REACT_APP_JOURNALS_HOST}/api/journals/user/`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const journalsListArr = await res.json();
        // console.log("journalsListArr", journalsListArr);
        setJournalsList(journalsListArr);
      }
    }
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
