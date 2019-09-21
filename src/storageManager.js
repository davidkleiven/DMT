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
        });
    }

    clearAll = () => {
        AsyncStorage.getAllKeys().then((keys) => {
            AsyncStorage.multiRemove(keys);
        });
    }

    mostCalled = (text, cb) => {
        AsyncStorage.getAllKeys((_, keys) => {
            // Find all keys starting with text
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
}

export default StorageManager;