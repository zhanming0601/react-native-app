
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
import * as Device from '../../Components/Constant/Device';

const meDataSource = [{name:'要好友得现金',source:require('../../assets/gift.png')},{name:'信用资料',source:require('../../assets/credit _information.png')},{name:'设置用户名&身份',source:require('../../assets/identity.png')},{name:'我的收藏',source:require('../../assets/collect.png')},{name:'关注速贷之家',source:require('../../assets/attention.png')},{name:'帮助中心&反馈',source:require('../../assets/help.png')},{name:'设置',source:require('../../assets/setting.png')}];

export default class Me extends Component{

    constructor(props){
        super(props);
        this.state = {
            bottomLeft:0,
        }
    }

    componentWillUpdate(){

        console.log('componentWillUpdate-me');

    }

    render(){

        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <ScrollView >
                    <Image  style={styles.topBackgroundImageStyle} resizeMode="stretch" source={require('../../assets/navigationImage.png')}/>

                    <View style={styles.topViewStyle} >

                        <View style={styles.iconStyle} >
                            <Image style={styles.iconImageStyle} source={require('../../assets/sudai.png')}/>
                        </View>

                        <Text style={styles.nameStyle}>速贷哥</Text>

                        <View style={styles.propertyViewStyle}>
                            <View style={styles.pointsViewStyle} >
                                <Text style={styles.pointsTitleStyle} >积分商城</Text>
                                <Text style={styles.pointsNumStyle}  onLayout={this._titleLayout.bind(this)}>500</Text>
                                <View ref='title' />
                            </View>
                            <View style={styles.pointsViewStyle} >
                                <Text style={styles.pointsTitleStyle} >我的现金</Text>
                                <Text style={styles.pointsNumStyle}>500</Text>
                                <View/>
                            </View>
                        </View>

                        <Image resizeMode="stretch"  style={styles.waveImageStyle} source={require('../../assets/ wave.png')}/>

                    </View>
                    {this._getCellsView()}
                </ScrollView>

            </View>
        )
    }

    _titleLayout(event) {

        this.titleWitdh=event.nativeEvent.layout.width;

        this.refs.title.setNativeProps({
            style:{

                width:this.titleWitdh,
                backgroundColor:'yellow',
                height:1,
            }
        });

    }




    _getCellsView(){

        let cellArray = [];

        cellArray.push(

            meDataSource.map((item =>{

              return(
                  <View style={styles.cellStyle}>

                      <Image resizeMode="stretch"  style={styles.cellImageStyle}  source={item.source} ></Image>

                      <Text style={styles.cellTextStyle}>{item.name}</Text>

                      <View style={styles.cellLineStyle} />

                  </View>
              )



            }))
        )



        return cellArray;




    }

}

const styles = StyleSheet.create({

    topBackgroundImageStyle: {

        width: Device.ScreenWidth,
        height: 270,
        position: 'absolute',
        top: 0,
        left: 0,
    },

    topViewStyle: {

        width: Device.ScreenWidth,
        height: 270,
        flexDirection:'column',
        alignItems:"center",
        justifyContent:'flex-start',

    },

    iconStyle: {

        width: 68,
        height: 68,
        flexDirection:'column',
        alignItems:"center",
        justifyContent:'center',
        marginTop:30,
        borderWidth:3,
        borderColor:'#50D7FF',
        borderRadius:34,

    },
    iconImageStyle: {

        width: 60,
        height: 60,
    },

    nameStyle:{

        color:'white',
        backgroundColor:'rgba(255,255,255,0)',
        fontSize:12,
        marginTop:20,
    },

    cellStyle:{

        flexDirection:'row',
        alignItems:"center",
        justifyContent:'flex-start',
        width:Device.ScreenWidth,
        height:45,
        backgroundColor:'white',
    },

    cellImageStyle:{

        width:22,
        height:22,
        marginLeft:29,
    },
    cellTextStyle:{

        marginLeft:10,
        fontSize:15,
        color:'#4D4D4D',
    },
    cellLineStyle:{
        backgroundColor:'#F5F5F5',
        height:1,
        width:Device.ScreenWidth,
        position:'absolute',
        left:0,
        bottom:0,
    },

    propertyViewStyle:{

        marginTop:20,

        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        width:Device.ScreenWidth*0.5,
    },

    pointsViewStyle:{

        flexDirection:'column',
        alignItems:"center",
        justifyContent:'flex-start',

    },

    pointsTitleStyle:{

        backgroundColor:'rgba(255,255,255,0)',
        color:'white',
        fontSize:11,
        marginTop:10,
    },
    pointsNumStyle:{

        backgroundColor:'rgba(255,255,255,0)',
        color:'yellow',
        fontSize:19,
        fontWeight:'600',
    },

    pointsLineStyle:{
        backgroundColor:'yellow',
        height:1,
        width:200,

    },

    waveImageStyle:{

        width:Device.ScreenWidth,
        height:40,
        position:'absolute',
        bottom:0,
        left:0,
    },








})