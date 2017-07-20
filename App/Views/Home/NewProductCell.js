/**
 * Created by zhanming on 2017/6/28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    DeviceEventEmitter,

} from 'react-native';
import * as Device from '../../Components/Constant/Device';
import TagView from '../../Components/View/TagView';

export default class NewProductCell extends Component{

    // 构造
    constructor(props) {
        super(props);

    }
    render(){

        return(
            <View style={styles.productItemStyle}>
                <Image  style={{height:50,width:50,marginLeft:17}} source={{uri:this.props.productModel.product_logo}} ></Image>

                <View style={styles.rightViewStyle}>

                    <View style={styles.rightTopStyle}>
                        <View style={{width:50,height:14,flexDirection: 'row', justifyContent: 'center',alignItems:'center'}}>
                            <Image style={{width:50,height:14,position:'absolute',left:0,top:0}}  resizeMode="stretch" source={require('../../assets/home_new_product_time.png')} />
                            <Text style={{color:'white',backgroundColor:'rgba(255,255,255,0)',fontSize:10}} >{this.props.productModel.update_date}</Text>
                        </View>

                        <Text numberOfLines={1} style={{backgroundColor:'white',color:'#F33736',fontSize:13,marginLeft:3} }>{this.props.productModel.platform_product_name}</Text>
                        <Text numberOfLines={1} style={{backgroundColor:'white',fontSize:13,marginLeft:3} }>{this.props.productModel.product_conduct}</Text>
                    </View>

                    <TagView tagName={this.props.productModel.tag_name}/>

                    <View>
                        <Text style={{backgroundColor:'white',fontSize:11,color:'#999999'} }>{this.props.productModel.product_introduct}</Text>
                    </View>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    productItemStyle: {
        height: 75,
        width: Device.ScreenWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topLeftViewStyle: {
        height: 50,
        width: 50,
        marginLeft: 10,
    },
    rightViewStyle: {

        marginTop: 5,
        height: 60,
        flexDirection: 'column',

        justifyContent: 'space-between',

        marginLeft: 13,

    },
    rightTopStyle: {

        flexDirection: 'row',
        justifyContent: 'flex-start',
    }


})
