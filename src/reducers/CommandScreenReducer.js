import {
    TEXT_ENTERED_IN_CMD_FIELD,
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_CHANGED,
    COMMAND_SELECTED_FROM_HISTORY,
    RETRIEVE_SSH_CRED
    
} from '../constants';

const INITIAL_STATE = {
    commandType: COMMAND_TYPE_TEXT_OUTPUT,
    favorites: [],
    command: '',
    sshCred: {}
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type){
        case TEXT_ENTERED_IN_CMD_FIELD:
            return {...state, command: action.payload.command, favorites: action.payload.favorites};
        case COMMAND_TYPE_CHANGED:
                return {...state, commandType: action.payload.commandType}
        case COMMAND_SELECTED_FROM_HISTORY:
            return {...state, command: action.payload.command, favorites: action.payload.favorites}
        case RETRIEVE_SSH_CRED:
            return {...state, sshCred: action.payload}
        default:
            return state;
    }
}