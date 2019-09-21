import {onChangeText} from '../actions/commandScreenActions';
import {TEXT_ENTERED_IN_CMD_FIELD, COMMAND_TYPE_TEXT_OUTPUT} from '../constants';

const INITIAL_STATE = {
    commandType: COMMAND_TYPE_TEXT_OUTPUT
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TEXT_ENTERED_IN_CMD_FIELD:
            return {...state, cmd: action.cmd};
        default:
            return state;
    }
}