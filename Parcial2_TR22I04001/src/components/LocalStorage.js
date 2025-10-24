import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (keyVal, value) => {
    try {
        await AsyncStorage.setItem(keyVal, value);
    } catch (e) {
    }
};

const getData = async (keyVal, setVal) => {
    try {
        const value = await AsyncStorage.getItem(keyVal);
        if (value !== null) {
            setVal(value) 
        }
    } catch (e) {
    }
};

export {
    getData,
    storeData
};

