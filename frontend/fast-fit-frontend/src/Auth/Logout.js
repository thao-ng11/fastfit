import { Navigate } from 'react-router-dom';
import {useToken} from "../Authentication"

function Logout(props) {
    const [token, login, logout, signup, update] = useToken();
    logout()
    return <Navigate to="../" />;
}

export default Logout;
