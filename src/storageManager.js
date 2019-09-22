import { AsyncStorage } from "react-native";

class StorageManager{
    _retrieveData = async (key) => {
        try{
            var value = await AsyncStorage.getItem(key);
            return value;
        } catch(error){
            console.log("Could not retrieve data!");
            console.log(error);
        }
        return null;
    }

    _retrieveMany = async (keys) => {
        try{
            var value = []
            await AsyncStorage.multiGet(keys).then( (response) =>{
                value = response.map((x) => x[1]);
            })
            return value;
        } catch(error){
            console.log("Could not retrieve data!");
            console.log(error);
        }
        return null;
    }

    _storeData = async (key, value) => {
        try{
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }

    updateCommand = (cmd) => {
        this._retrieveData(cmd).then((numCalls) => {
            var num = 1;
            if (numCalls !== null){
                num = parseInt(numCalls);
                num += 1;
            }
            this._storeData(cmd, num);
            this.updateKnownCommands(cmd);
        });
    }

    updateKnownCommands = (cmd) => {
        this._retrieveData('known_commands').then((cmds) => {
            let known_commands = [];
            if (cmds !== null){
                known_commands = JSON.parse(cmds);
            }

            if (known_commands.indexOf(cmd) === -1){
                known_commands.push(cmd);
                this._storeData('known_commands', known_commands);
            }
        })
    }

    clearAll = () => {
        this._retrieveData('known_commands').then((cmds) => {
            let know_commands = []
            if (cmds !== null){
                known_commands = JSON.parse(cmds);
            }
            AsyncStorage.multiRemove(known_commands);
        })
    }

    mostCalled = (text, cb) => {
        this._retrieveData('known_commands').then((known_keys) => {
            // Find all keys starting with text
            let keys = []
            if (known_keys !== null){
                keys = JSON.parse(known_keys);
            }

            var matches = [];
            for (var i=0;i<keys.length;i++){
                if (keys[i].startsWith(text)){
                    matches.push(keys[i]);
                }
            }
            //console.log(keys);

            if (matches.length === 0){
                cb([]);
                return;
            }
            //console.log(matches);

            this._retrieveMany(matches).then((values) => {
                // Sort based on number of hits
                const intValues = values.map((x) => parseInt(x));
                const zipped = matches.map((item, index) => [intValues[index], item]);
                const sortedZipped = zipped.sort(([count1], [count2]) => count2 - count1);
                const sorted = sortedZipped.map(([_, item]) => item);
                cb(sorted);
            })
        })
    }

    updateAliases = (alias) => {
        this._retrieveData('alias').then((values) => {
            let known_alias = []
            if (values !== null){
                known_alias = JSON.parse(values);
            }
            console.log(known_alias);
            if (known_alias.indexOf(alias) === -1){
                // This is a new alias
                known_alias.push(alias);
                this._storeData('alias', known_alias);
            }
        })
    }

    getKnownConnections = (cb) => {
        this._retrieveData('alias').then((values) => {
            let known_alias = [];
            if (values !== null){
                known_alias = JSON.parse(values);
            }
            console.log(known_alias);
            cb(known_alias);
        })
    }

    deleteKnownConnection = (alias, cb) => {
        this._retrieveData('alias').then((values) => {
            if (values !== null){
                known_alias = JSON.parse(values);
                let index = known_alias.indexOf(alias);
                known_alias.splice(index, 1);
                this._storeData('alias', known_alias).then(() => {
                    AsyncStorage.removeItem(alias, (err) => {
                        cb();
                    });
                })
            }
        })
    }

    deleteCommand = (cmd, cb) => {
        this._retrieveData('known_commands').then((cmds) => {

            let known_cmds = [];
            if (cmds !== null){
                known_cmds = JSON.parse(cmds);
                let index = known_cmds.indexOf(cmd);
                known_cmds.splice(index, 1);
            }
            this._storeData('known_commands', known_cmds).then(() => {
                AsyncStorage.removeItem(cmd, (err) => {
                    cb();
                })
            })
        })
    }
}

export default StorageManager;