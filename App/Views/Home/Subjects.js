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
    DeviceEventEmitter,
} from 'react-native';

import {observer} from 'mobx-react/native';
import * as Device from '../../Components/Constant/Device';
@observer




export default class Subjects extends Component{

    constructor(props){
        super(props);

        this.instructionWith = Device.ScreenWidth*0.2;

        this.instructionProgress = this.instructionWith*0.2;
        this.state = {
            Left:0,
        }
    }

    render(){

        return(
            <View style={{width:Device.ScreenWidth}}>
                <ScrollView  style={styles.scrollViewStyle} horizontal={true} showsHorizontalScrollIndicator={false} onScroll={(e)=>{

                    this.setState({

                        Left:e.nativeEvent.contentOffset.x/(((((Device.ScreenWidth-40)/ 2.0)*this.props.homeState.SubjectList.length)+ ((this.props.homeState.SubjectList.length-1)*10)) - (Device.ScreenWidth-30)) *(this.instructionWith- 2 - this.instructionProgress),

                    })

                } } scrollEventThrottle={1}>
                    {this.getImageItem()}
                </ScrollView>

                <View style={styles.bottomView}>
                    <View style={[styles.bottomInstructionStyle,{width:this.instructionWith}]}>
                        <View style={{width:this.instructionProgress,height:4,backgroundColor:'#48B8F8',position:'absolute' ,left:this.state.Left}}>
                        </View>
                    </View>
                </View>

            </View>
        )
    }

    getImageItem(){


        let ImageItems= [];

        for(let i = 0;i<this.props.homeState.SubjectList.length;i++){

            let mageItem = this.props.homeState.SubjectList[i];
            
            ImageItems.push(

                <View key={i}>
                    <TouchableOpacity activeOpacity={1}>
                        <Image style={[styles.scrollCellStyle,{marginLeft:(i == 0?0:10)}]} source={{uri: mageItem.src}}/>
                    </TouchableOpacity>
                </View>

            )
        }
        return ImageItems;
       
    }
}

const styles = StyleSheet.create({

    scrollViewStyle:{
        width:Device.ScreenWidth-30,
        marginLeft:15,
    },
    scrollCellStyle:{
        height: 70,
        width: (Device.ScreenWidth - 40) / 2.0,

    },
    bottomView:{
        height:40,
        width:Device.ScreenWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    bottomInstructionStyle:{
        height:6,
        borderColor:'#f5f5f5',
        borderWidth:1,
        overflow:'hidden',
        // backgroundColor:'red',
    }


})