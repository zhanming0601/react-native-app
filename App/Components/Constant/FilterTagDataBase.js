

import React, {
    Component
} from 'react'

import {
    Dimensions,
    AsyncStorage,
} from 'react-native';


const FILTERTAG_KEY='FilterTag'



export default class FilterTagDataBase{

    static GetFilterTagArray(){

        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(FILTERTAG_KEY,(error,result)=>{
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }else {
                    reject(error);
                }
            });
        });

    }

    static saveFilterTagArray(value){



        AsyncStorage.setItem(FILTERTAG_KEY,JSON.stringify(value),(error,result)=>{


        });

    }

}