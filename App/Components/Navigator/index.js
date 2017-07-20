/**
 * Created by zhanming on 2017/6/27.
 */
import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    Image,
    View,

} from 'react-native'

import SDNavigator from '../TabBar';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class TabBar extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <Navigator initialRoute={{
                component:SDNavigator
            }} renderScene={(route, navigator)=>{
                let Component = route.component;
                return <Component navigator={navigator} {...route.params}>
                </Component>
            }}></Navigator>
        )
    }

 }