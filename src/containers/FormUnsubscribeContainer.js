import {connect} from "react-redux";
import FormUnsubscribeComponent from "../components/FormUnsubscribeComponent";

import {unsubscribe} from '../../actions/Actions';

const mapStateToProps = (state , _ownProps) => ({
    token: state.token

});
const mapDispatchToProps = (dispatch) => ({
    dispatchUnsubscribe: (values) => {
        dispatch(unsubscribe(values.data.token))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(FormUnsubscribeComponent);