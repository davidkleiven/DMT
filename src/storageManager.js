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
}

export default StorageManager;