/**
 * Created by zhanming on 2017/6/27.
 */
import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native';

export default class TestView extends Component{

    constructor(props){
        super(props);
        this.state = {
            bottomLeft:0,
        }
    }

    render(){

        return(
            <View style={{flex:1,backgroundColor:'red',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
               <TouchableOpacity onPress={
                   ()=>{
                       this.props.navigator.pop();
                   }

               } >
                   <Text>返回</Text>
               </TouchableOpacity>

            </View>
        )
    }
}