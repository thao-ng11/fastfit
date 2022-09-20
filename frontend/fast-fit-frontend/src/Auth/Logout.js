import { Navigate } from "react-router-dom";
import { useToken } from "../Authentication";

function Logout(props) {
  const [, , logout] = useToken();
  logout();
  return <Navigate to="../" />;
}

export default Logout;
