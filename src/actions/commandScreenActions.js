import{
    NAVIGATE_TO_COMMAND_SCREEN
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

export const onChangeText = (text) => {

};