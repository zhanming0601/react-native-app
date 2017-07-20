

import React, {Component,PropTypes} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ViewPropTypes,
    StatusBar,
    TouchableOpacity,

} from 'react-native';



import * as Device from '../../Components/Constant/Device';

const NAV_BAR_HEIGHT_IOS = 44;

const NAV_BAR_HEIGHT_ANDROID = 50;

const STATUS_BAR_HEIGHT = 20;


export default class SDNavigationBar extends Component{


    static propTypes ={

        //标题
        title:PropTypes.string,

        titleStyle:ViewPropTypes.style,

        leftButton:PropTypes.element,

        rightButton:PropTypes.element,
    }

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){

        return(

            <View >

                <View style={{height:Platform.OS === 'ios'?STATUS_BAR_HEIGHT:0,width:Device.ScreenWidth}}>
                    <Image  style={styles.statusImageStyle} source={require('../../assets/navigationImage.png')}></Image>
                    <StatusBar {...this.props.statusBar}></StatusBar>
                </View>

                <View style={styles.navStyle} >
                    <Image  style={styles.navImageStyle} source={require('../../assets/navigationImage.png')}></Image>
                    <TouchableOpacity activeOpacity={1} onPress= {this.props.onClick} >
                        <View style={styles.searchStyle}>
                            <View>
                                <Text>
                                    想借多少钱
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        )

    }

}

const styles = StyleSheet.create({

    navStyle:{

        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        width:Device.ScreenWidth,
    },
    statusImageStyle:{

        flex:1,
        position:'absolute',
        left:0,
        top:0,
        overflow:'hidden',
    },
    navImageStyle:{
        height:Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        width:Device.ScreenWidth,

        position:'absolute',
        left:0,
        top:0,
    },
    searchStyle:{
        width:Device.ScreenWidth*0.7,
        height:29,
        borderRadius:29,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }




})








