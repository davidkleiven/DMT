import{
    NAVIGATE_TO_COMMAND_SCREEN,
    TEXT_ENTERED_IN_CMD_FIELD,
    COMMAND_TYPE_CHANGED
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