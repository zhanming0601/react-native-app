


import React, {Component, PropTypes} from "react";
import {BackHandler} from "react-native";

export default class BackPressComponent{
    constructor(props){
        this.props=props;
    }
    componentDidMount(){
        if(this.props.backPress){

            BackHandler.addEventListener('hardwareBackPress',this.props.backPress);

        }

    }
    componentWillUnmount(){
        if(this.props.backPress){

            BackHandler.removeEventListener('hardwareBackPress',this.props.backPress);
        }

    }
}