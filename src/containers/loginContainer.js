import {connect} from "react-redux";
import Login from "../Login";
import {login} from '../actions/Actions';

const mapDispatchToProps = (dispatch) => ({
     dispatchConnexion: (values) => {
        console.log(values.data);
        dispatch(login(values.data.userid, values.data.mail, values.data.username, values.data.accessToken, values.data.point, values.data.verified))
    }
});



export default connect(null, mapDispatchToProps)(Login);