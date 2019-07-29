import{AsyncStorage} from 'react-native';

export const setItem = async (dataName,data) => {
    try {
        await AsyncStorage.setItem(dataName,data)
    }
    catch(error){
    }
}

export const getItem = async dataName => {
    try{
        const value = await AsyncStorage.getItem(dataName);
        if(value !== null){
            return JSON.parse(value);
        }
    }
    catch(error){
    }
}