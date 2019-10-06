import SSH from 'react-native-ssh';
import { DUMMY_SERVER } from './constants';

export const sshExecute = (config, command, cbResult, cbError) => {
    if (config.host === DUMMY_SERVER){
        result = 'DummyServer result' + command;
        cbResult(result);
        cbError(null);
    }
    else{
        SSH.execute(config, command).then(
            result => cbResult(result),
            error => cbError(error)
        );
    }

}