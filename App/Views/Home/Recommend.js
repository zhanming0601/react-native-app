/**
 * Created by zhanming on 2017/6/26.
 */
//推荐产品 recommend products

import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    DeviceEventEmitter,
    TouchableOpacity,
} from 'react-native';

import {observer} from 'mobx-react/native';
import * as Device from '../../Components/Constant/Device';

import HomeState from '../../Mobx/Home';

import ProductDetails from '../ProductDetails/index';

@observer


export default class Recommend extends Component {

    static  PropTypes ={
        RecommendAllArray:PropTypes.array,
        homeState:PropTypes.instanceOf(HomeState),
    }

    static defaultProps = {
        RecommendAllArray:[],
    }

    constructor(props) {
        super(props);



        this.state ={
            defualtNum:8,
            count:0,
        }
    }

    componentDidMount(){
        DeviceEventEmitter.addListener('zhanming',this.nextStep.bind(this));
    };

    render() {

        return (

            <View style={styles.recommendStyle}>
                    <View style={styles.topStyle}>

                        <Text style={{marginLeft:20}}>推荐产品</Text>
                        <TouchableOpacity>
                            <Image style={{marginLeft:10}} source={require('../../assets/homeRemind.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:'absolute',right:5}} activeOpacity={1} onPress={
                            this.nextStep.bind(this)
                        }>
                            <Text style={{color:'#909090',fontSize:12}}>下一批></Text>
                        </TouchableOpacity>
                        <View style={
                            {
                                position:'absolute',
                                left:20,bottom:0,height:1,
                                width:Device.ScreenWidth,
                                backgroundColor:'#D7D7D7'
                            }
                        }></View>



                    </View>
                {this._getItem()}

                <View style = {styles.bottomViewStyle} />

            </View>
        )

    }

    nextStep(){

        let count = this.state.count;

        if (count > 3) {
            count = 0;
        }

        this.props.homeState.setRecommendList(this.props.RecommendAllArray.slice(count * this.state.defualtNum, count * this.state.defualtNum + 8));

        this.setState({
            count: ++count,
        })
    }

    _getItem() {

        var views = [];

        for (let i = 0; i < this.props.homeState.RecommendList.length; i++) {

            let itemModel = this.props.homeState.RecommendList[i];

            console.log(itemModel);

            views.push(
                <TouchableOpacity key={i} activeOpacity={1} onPress={()=>{

                    //push to ProductDetails / 跳转到ProductDetails
                    this.props.navigator.push({
                        component:ProductDetails,
                        params:{
                            ...this.props,
                            productID:itemModel.platform_product_id,

                        }
                    })
                }}>
                    <View  style={styles.recommendCellStyle}>
                        <Image style={styles.cellImageStyle} resizeMode="stretch"
                               source={{uri: itemModel.product_logo}}></Image>
                        <View style={styles.cellLeftViewStyle} >
                            <View style={styles.cellLeftTopStyle}>
                                <View style={{height: 8, width: 8, backgroundColor: '#00B7FF', borderRadius: 5}}/>
                                <Text style={{
                                    color: '#4f4f4f',
                                    fontWeight: '900',
                                    fontSize: 12,
                                    marginLeft:2,
                                }}>{itemModel.platform_product_name}</Text>
                            </View>
                            <Text style={{
                                color: '#585858',
                                fontSize: 12
                            }}>{itemModel.loan_min}-{itemModel.loan_max}</Text>
                            <View style={styles.cellLeftBottomStyle} >
                                <Text style={{color: '#585858', fontSize: 12}}>成功率</Text>

                                <Text style={{color: '#fb604c', fontSize: 12}}>{itemModel.success_rate}</Text>

                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        return views;
    }

}

const styles = StyleSheet.create({

    topStyle:{
        height:40,
        width: Device.ScreenWidth,
        flexDirection:'row',
        alignItems:'center',
    },
    recommendStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        backgroundColor:'white',
    },
    recommendCellStyle:{
        height: 70,
        width: Device.ScreenWidth / 2.0,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
    },
    cellImageStyle:{
        height:40,
        width:40,
        marginLeft:26,
        backgroundColor:'white',
        marginRight:10,
    },
    //cell Lift View / cell 右边的View
    cellLeftViewStyle:{

        flexDirection:'column',
        justifyContent:'space-between',
        height:48,

    },

    cellLeftTopStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellLeftBottomStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomViewStyle:{
        height: 10,
        width: Device.ScreenWidth,
        backgroundColor: '#F7F7F7',
    }




})