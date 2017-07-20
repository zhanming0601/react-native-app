/**
 * Created by zhanming on 2017/6/19.
 */


import React, {Component,PropTypes} from 'react';

import {
    AppRegistry,
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
          title:PropTypes.string.isRequired,

          titleStyle:ViewPropTypes.style,

          leftButton:PropTypes.element,

          rightButton:PropTypes.element,

          isTop: PropTypes.bool,
      }

      static defaultProps ={
          isTop:false,
      }

      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      render(){


          return(
              <View >
                  <View style={styles.statusBarStyle}>
                      <Image  style={[styles.statusBarStyle,{position:'absolute', left:0,
                          top:0,overflow:'hidden'}]} source={require('../../assets/navigationImage.png')}></Image>
                      <StatusBar {...this.props.statusBar } hidden={false} >

                      </StatusBar>
                  </View>


                  <View style={styles.navBarStyle} >
                      <Image  style={styles.navBarBackImageStyle} source={require('../../assets/navigationImage.png')}></Image>
                      <TouchableOpacity activeOpacity={1} onPress={()=>{
                          this.props.navigator.pop();

                      }} >
                          <View style={styles.buttonStyle} >
                              {this._leftBtnView()}
                          </View>
                      </TouchableOpacity>

                      <View style={{flex:1,
                          flexDirection:'row',
                          justifyContent:'center',
                          alignItems:'center',
                      }}>
                          <Text style={styles.titleStyle} >{this.props.title}</Text>
                      </View>

                      <TouchableOpacity>
                          <View style={styles.buttonStyle} >
                              {this._rightBtnView()}
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>

          )

      }

      _leftBtnView(){

          if (this.props.isTop) {
              return <View />
          } else {
              return this.props.leftButton ? <View>{this.props.leftButton}</View> :<Image source={require('../../assets/back.png')} style={{marginLeft:10}}/>;

          }

      }
      _rightBtnView(){

          return this.props.leftButton ? <View>{this.props.rightButton}</View>:<View></View>;
      }

}

const styles = StyleSheet.create({


    statusBarStyle: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
        width: Device.ScreenWidth,

    },
    navBarStyle: {
        flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        height: Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        width:Device.ScreenWidth,
    },

    navBarBackImageStyle:{

        height:Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        width:Device.ScreenWidth,
        position:'absolute', left:0,
        top:0,
    },
    buttonStyle:{
        flex:1,
        backgroundColor:'rgba(255, 255, 255,0)',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    titleStyle:{
        color:'white',
        backgroundColor:'rgba(255, 255, 255,0)',
        fontSize:16,
        textAlign:'center',


    }
})








