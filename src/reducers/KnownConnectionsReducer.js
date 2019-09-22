import {
    RETRIEVED_NEW_KNOWN_CONNECTIONS
} from '../constants';

const INIT_STATE = {
    known_connections: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type){
        case RETRIEVED_NEW_KNOWN_CONNECTIONS:
            return {...state, known_connections: action.payload.connections}
        default:
            return state
    }
}