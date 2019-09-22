import {
    RETRIEVED_NEW_KNOWN_CONNECTIONS
} from '../constants';

export const setKnownConnections = (con) => {
    return (dispatch) => {
        dispatch({
            type: RETRIEVED_NEW_KNOWN_CONNECTIONS,
            payload: {connections: con}
        });
    }
}