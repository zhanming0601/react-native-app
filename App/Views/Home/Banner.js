/**
 * Created by zhanming on 2017/6/26.
 */

import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';

import {observer} from 'mobx-react/native';
import Swiper from 'react-native-swiper';
import * as Device from '../../Components/Constant/Device';

import TestView from './testView';

const bannerH = Device.ScreenWidth*(136.0/375.0);
@observer
export default class Banner extends Component{


    constructor(props){
        super(props);
    }
    render(){

        return(

            <View style={{height:bannerH,width:Device.ScreenWidth}}>

                {this._getItem()}

                <View style={styles.bottomView} ></View>
            </View>

        )
    }
    _getItem() {


        if(this.props.homeState.bannerList.length != 0){

            var views=[];

            let key = 0;

            views.push(
                <Swiper  key ={0} height={bannerH} showsPagination={false}
                          autoplayTimeout={2} autoplay>
                    {
                        this.props.homeState.bannerList.map((item)=>{

                            return(<View key={key++}  style={{flex:1,flexDirection:'column',justifyContent: 'center',alignItems:'center',backgroundColor: 'white'}}>

                                    <TouchableOpacity style={{width:Device.ScreenWidth-8 ,height:bannerH-20}}  activeOpacity={1} onPress={ () => {
                                        this.props.navigator.push({
                                            component:TestView,
                                            params:{
                                                ...this.props
                                            }
                                        })
                                    }}>
                                        <Image resizeMode="stretch" style={{height:bannerH-20, width:Device.ScreenWidth-8 }}
                                               source={{uri:item.src}}/>
                                    </TouchableOpacity>
                                </View>

                            )
                        })


                    }

                </Swiper>

            )

            return views;
        }



    }








}
const styles = StyleSheet.create({

    bottomView:{
        height:10,
        width:Device.ScreenWidth,
        backgroundColor:'#F7F7F7',
        position:'absolute',
        left:0,
        bottom:0,
    }

})