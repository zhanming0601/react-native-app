
//个性选择

import React, { Component ,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    Dimensions,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { BlurView} from 'react-native-blur';
import FilterTagDataBase from '../../Components/Constant/FilterTagDataBase';



const {width, height} = Dimensions.get('window');

const [left, top] = [0, Platform.OS === 'ios'?(64+45):(50+45)];


const [cellWidth,cellHeight] = [72,23];

const marginRight = ((width-30)- cellWidth*4)/3.0;

const identityArray = [{value:'上班族',id:2},{value:'学生党',id:1},{value:'生意人',id:3},{value:'自由职业',id:4}];

export default class IndividualChoice extends Component {

    //
    // static propTypes = {
    //
    //     pickViewArray:PropTypes.array.isRequired,
    // }

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
            filterArray: [],
            Height:0,
    };


        console.log(width);

        this.callback = function () {};//回调方法
         FilterTagDataBase.GetFilterTagArray().then((date)=>{

                 this.filterArray = date;
             console.log(date);

         });
    }

    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
    }

    // componentDidMount() {
    //     // this.in()
    // }

    render() {
        if(this.state.hide){
            return (<View />)
        } else {
            return (
                <View style={styles.container} >

                    <Animated.View style={ [styles.mask,{opacity:this.state.opacity}]}>
                        {this._backView()}
                    </Animated.View>


                    <Animated.View onLayout={({nativeEvent:e})=>this.layout(e)}  style={[styles.tip , {transform: [{
                        translateY: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-height,0]
                        }),
                    }]
                    }]
                    }>

                        <ScrollView >


                            {this._filterView('我是',identityArray)}

                            {this._filterView('我需要',this.filterArray.loan_need_lists)}

                            {this._filterView('我有',this.filterArray.loan_has_lists)}

                            <View style={styles.filterBottomStyle} >
                                <TouchableOpacity style={[styles.filterButtonStyle,{backgroundColor:'#E6E6E6'}]}
                                                  onPress={()=>{
                                                      this.out()
                                                  }}
                                >
                                    <Text style={{color:'#666666'}}>重置</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.filterButtonStyle,{backgroundColor:'#00b4ff'}]}
                                                  onPress={()=>{
                                                      this.out()
                                                  }}
                                >
                                    <Text style={{color:'#ffffff'}} >确定</Text>
                                </TouchableOpacity>


                            </View>

                        </ScrollView>


                    </Animated.View>
                </View>
            );
        }
    }

    componentDidMount() {
    }

    layout(e){
        this.setState({

            Height:e.layout.height,
        })
    }


    _backView(){

        if (Platform.OS === 'ios') {
            return (

                <BlurView style={styles.backViewStyle}

                          blurType='light'
                          blurAmount={10}>

                    <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{

                        this.out()
                    }} >
                    </TouchableOpacity>
                </BlurView>
            )

        } else {

            return (
                <View style={[styles.backViewStyle,{backgroundColor:'rgba(0,0,0,0.6)'}]}>

                    <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{

                        this.out()
                    }} >
                    </TouchableOpacity>
                </View>
            )
        }
    }

    //显示动画
    startAnimation() {

        this.setState({
            hide:false,
        })

        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start();

        this.timer = setTimeout(
            () => this.setState({hide: true}),
            500
        );
    }

    //
    _filterView(title,array){

        let fiterBtnArray = [];

        fiterBtnArray.push(

            <Text key={1} style={styles.filterCellTitleStyle} >{title}</Text>


        );

        let i = -1;
        fiterBtnArray.push(

            <View key = {2} style={styles.filterViewStyle}>
                {


                    array.map((item=>{
                        return ( <Text key={item.id} style={[styles.filterCellStyle,{marginLeft: (i++) %4 == 0?15:marginRight}]}>{item.value}</Text>)
                    }))
                }

                <View style={styles.filterCellLineStyle}/>
            </View>


        );

        return  fiterBtnArray;
    }

}

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
        overflow:'hidden',
    },
    mask: {
        justifyContent:"center",
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:0,
    },
    tip: {
        width:width,
        backgroundColor:'white',
    },

    filterViewStyle:{
        flexDirection:'row',
        alignItems:"center",
        flexWrap:'wrap',
    },
    filterCellTitleStyle:{

        color:'#4d4d4d',
        fontSize:16,
        marginTop:15,
        marginLeft:15,

    },
    filterCellLineStyle:{
        marginTop:15,
        width:width,
        height:1,
        backgroundColor:'#F0F0F0',
    },
    filterCellStyle:{

        height:cellHeight,
        width:cellWidth,
        backgroundColor:'#FFFFFF',
        color:'#62B3D3',
        borderWidth:1,
        borderColor:'#99E2FE',
        lineHeight:cellHeight-2,
        textAlign:'center',
        fontSize:13,
        borderRadius:cellHeight/2.0,
        marginTop:15,

    },

    filterBottomStyle:{

        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        width:width-100,
        marginLeft:50,
        marginBottom:20,


    },

    filterButtonStyle:{
        width:116,
        height:36,
        borderRadius:5,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',

    },
    backViewStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }



});
