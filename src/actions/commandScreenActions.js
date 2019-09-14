import{
    NAVIGATE_TO_COMMAND_SCREEN,
    TEXT_ENTERED_IN_CMD_FIELD
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

export const updateFavorites = (res) => {
    return (dispatch) => {
        dispatch({
            type: TEXT_ENTERED_IN_CMD_FIELD,
            payload: {text, db}
        })
    }
};