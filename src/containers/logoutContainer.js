import {connect} from "react-redux";
import Logout from "../Logout";

import {logout} from '../actions/Actions';

const mapDispatchToProps = (dispatch) => ({
    dispatchDeconnexion: () => {
        dispatch(logout())
    }
});

export default connect(null, mapDispatchToProps)(Logout);