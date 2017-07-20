/**
 * Created by zhanming on 2017/7/5.
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

import TagView from '../../Components/View/TagView'

import StarView from '../../Components/View/StarView';

import * as Device from '../../Components/Constant/Device';

const labelSource = [require('../../assets/product_top1.png'),require('../../assets/product_top2.png'),require('../../assets/product_top3.png'),require('../../assets/product_top4.png'),require('../../assets/product_top5.png'),require('../../assets/product_jian.png')]


export default class ProductListCell extends Component{

    static propTypes ={

        onSelect:PropTypes.func,
    }


    constructor(props) {
        super(props)


        console.log(this.props.productModel);
    }

    render(){

        return (<TouchableOpacity activeOpacity={1}
                                  onPress={()=>{this.props.onSelect(this.props.productModel.platform_product_id)}}>

            <View style={styles.cellStyle}>

                <Image resizeMode="stretch" style={styles.backImageStyle}
                       source={require('../../assets/productBackImage.png')}/>


                {this._labelView()}

                <View style={styles.topViewStyle}>


                    <View style={styles.topLeftViewStyle}>
                        <Image style={{flex: 1}} resizeMode="stretch"
                               source={{uri: this.props.productModel.product_logo}}/>
                    </View>
                    <View style={styles.topRightViewStyle}>

                        <View>
                            <Text style={{
                                backgroundColor: 'white',
                                fontSize: 13
                            } }>{this.props.productModel.platform_product_name}</Text>
                        </View>

                        <StarView StarWidth={75} StarHeight={14} StarNum={this.props.productModel.composite_rate}/>

                        <TagView tagName={this.props.productModel.tag_name}/>

                    </View>



                    <Text style={styles.successCountStyle} >{this.props.productModel.success_count}人已申请</Text>

                </View>
                <View style={styles.lineStyle}/>

                <Text style={styles.productIntroductStyle}>{this.props.productModel.product_introduct}</Text>


            </View>
        </TouchableOpacity>)
    }

    _labelView(){


        if(this.props.rowID<20){

            return(<Image style={styles.labelStyle} resizeMode="stretch" source={this.props.rowID<5?labelSource[this.props.rowID]:labelSource[5]}/>)

        }


    }

}

const styles = StyleSheet.create({

    backImageStyle: {
        position:'absolute',
        top:10,
        width:Device.ScreenWidth-20,
        left:10,
        height:90
    },
    cellStyle: {
        height:100,
        width:Device.ScreenWidth,

        backgroundColor:'#F5F5F5',
    },
    topViewStyle: {
        height: 65,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 14,
        // backgroundColor: 'red',
        flexDirection:'row',
        alignItems:'center',
    },
    topLeftViewStyle:{
        height:50,
        width:50,
        marginLeft:10,
    },
    topRightViewStyle:{

        marginTop:5,
        height:55,
        flexDirection:'column',

        justifyContent:'space-between',

        marginLeft:13,

    },
    tagFatherViewStyle:{
        flexDirection:'row',
        alignItems:'center',
    },
    tagViewStyle:{
        borderWidth:1,
        width:50,
        height:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:4,
    },

    labelStyle:{
        position:'absolute',
        top:10,
        right:10,
        height:36,
        width:43,
    },
    successCountStyle:{

        position:'absolute',
        top:23,
        right:10,
        fontSize:10,
        color:'#4d4d4d',
        backgroundColor:'rgba(255,255,255,0)',

    },
    lineStyle:{

        width:Device.ScreenWidth - 40,
        marginLeft:20,
        height:1,
        marginTop:4,
        backgroundColor:'#f5f5f5',
    },
    productIntroductStyle:{

        marginLeft:25,
        marginTop:2,
        fontSize:10,
        color:'#4d4d4d',
        backgroundColor:'rgba(255,255,255,0)',

    }

})

