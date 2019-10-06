import {
    UPDATE_OUTPUT_FROM_COMMAND
} from '../constants';

export const updateCommandUpdateText = (output) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_OUTPUT_FROM_COMMAND,
            payload: output
        })
    }
}