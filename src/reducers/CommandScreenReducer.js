import {
    TEXT_ENTERED_IN_CMD_FIELD,
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_CHANGED
    
} from '../constants';

const INITIAL_STATE = {
    commandType: COMMAND_TYPE_TEXT_OUTPUT,
    favorites: [],
    command: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case TEXT_ENTERED_IN_CMD_FIELD:
            return {...state, command: action.payload.command, favorites: action.payload.favorites};
        case COMMAND_TYPE_CHANGED:
                return {...state, commandType: action.payload.commandType}
        default:
            return state;
    }
}