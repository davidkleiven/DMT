import {UPDATE_OUTPUT_FROM_COMMAND} from '../constants';

const INIT_STATE = {
    commandOutput: ''
}

export default (state=INIT_STATE, action) => {
    switch(action.type){
        case UPDATE_OUTPUT_FROM_COMMAND:
            return {...state, commandOutput: action.payload}
        default:
            return state;
    }
}