import{
    NAVIGATE_TO_COMMAND_SCREEN,
    TEXT_ENTERED_IN_CMD_FIELD,
    COMMAND_TYPE_CHANGED,
    COMMAND_SELECTED_FROM_HISTORY,
    RETRIEVE_SSH_CRED
} from '../constants';

export const navigateToCommandScreen = (navigate) => {
    return (dispatch) => {
        dispatch({
            type: NAVIGATE_TO_COMMAND_SCREEN,
            payload: {}
        })
        navigate('CommandScreen');
    }
}

export const updateFavorites = (command, favorites) => {
    return (dispatch) => {
        dispatch({
            type: TEXT_ENTERED_IN_CMD_FIELD,
            payload: {command, favorites}
        });
    }
};

export const setCommandType = (cmdType) => {
    return (dispatch) => {
        dispatch({
            type: COMMAND_TYPE_CHANGED,
            payload: {commandType: cmdType}
        })
    }
}

export const setCommand = (cmd, matches) => {
    return (dispatch) => {
        dispatch({
            type: COMMAND_SELECTED_FROM_HISTORY,
            payload: {command: cmd, favorites: matches}
        })
    }
}

export const retrieveSSHCred = (sshCred) => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVE_SSH_CRED,
            payload: sshCred
        })
    }
}