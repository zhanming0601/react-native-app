import React, { Component ,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Platform,
    TouchableOpacity,
    findNodeHandle,
    InteractionManager,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import Picker from 'react-native-picker';



const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width, 214];
const [left, top] = [0, 0];

export default class PickerView extends Component {


    static propTypes = {

        pickViewArray:PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
            viewRef: null,
        };
        this.options = this.props.pickViewArray;
        this.callback = function () {};//回调方法
        this.parent ={};
    }

    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
    }

    componentDidUpdate(){

        // console.log('findNodeHandle');
        //
        // InteractionManager.runAfterInteractions(() => {
        //     setTimeout(() => {
        //         this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
        //     }, 500);
        // });


    }

    render() {
        if(this.state.hide){
            return (<View />)
        } else {
            return (
                <View style={styles.container} >
                    <Animated.View style={ [styles.mask,{opacity:this.state.opacity}]} >

                        {this._backView()}

                    </Animated.View>

                    <Animated.View style={[styles.tip , {transform: [{
                        translateY: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [height, (height-aHeight-49)]
                        }),
                    }]
                    }]}>

                        {this._pickerShow()}

                        {/*<View style={styles.tipTitleView} >*/}
                            {/*<Text style={styles.cancelText} onPress={this.cancel.bind(this)}>取消</Text>*/}
                            {/*<Text style={styles.okText} onPress={this.ok.bind(this)} >确定</Text>*/}
                        {/*</View>*/}
                        {/*<Picker*/}
                            {/*style={styles.picker}*/}
                            {/*mode={Picker.MODE_DROPDOWN}*/}
                            {/*itemStyle={styles.itemPicker}*/}
                            {/*selectedValue={this.state.choice}*/}
                            {/*onValueChange={choice => this.setState({choice: choice})}>*/}
                            {/*{this.options.map((aOption) =>  <Picker.Item  label={aOption} value={aOption} key={aOption} /> )}*/}
                        {/*</Picker>*/}


                    </Animated.View>
                </View>
            );
        }
    }

    _pickerShow(){

        Picker.init({
            pickerData: this.props.pickViewArray,
            selectedValue: [this.props.pickViewArray[0]],
            pickerConfirmBtnText:'选择',
            pickerTitleText:'金额',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnColor:[255,255,255,1],
            pickerCancelBtnColor:[255,255,255,1],
            pickerTitleColor:[255,255,255,1],
            pickerToolBarBg:[0,180,255,1],

            pickerBg:[255,255,255,1],

            pickerFontColor:[77,77,77,1],


            onPickerConfirm: data => {

                this.out()
            },
            onPickerCancel: data => {
                this.out()
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });

        Picker.show();
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
                    toValue: 0,
                }
            )
        ]).start();
    }


    _backView() {

        if (Platform.OS === 'ios') {
            return (

                <BlurView style={styles.backViewStyle}
                          blurType='light'
                          blurAmount={10}/>
            )

        } else {

            return (
                <View style={[styles.backViewStyle,{backgroundColor:'rgba(0,0,0,0.6)'}]}>

                </View>
            )
        }
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

    //取消
    cancel(event) {
        if(!this.state.hide){
            this.out();
        }
    }

    //选择
    ok() {
        if(!this.state.hide){
            this.out();
            this.callback.apply(this.parent,[this.state.choice]);
        }
    }

    show(obj:Object,callback:Object) {
        this.parent = obj;
        this.callback = callback;
        if(this.state.hide){
            this.setState({ hide: false}, this.in);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    tip: {
        width:aWidth,
        height:aHeight,
        // left:middleLeft,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
    },
    tipTitleView: {
        height:53,
        width:aWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:0.5,
        borderColor:"#f0f0f0",

    },
    cancelText:{
        color:"#e6454a",
        fontSize:16,
        paddingLeft:30,
    },
    okText:{
        color:"#e6454a",
        fontSize:16,
        paddingRight:27,
        fontWeight:'bold',
    },
    picker:{
        justifyContent:'center',
         height: 216,//Picker 默认高度
        width:aWidth,
    },
    itemPicker:{
        color:'black',
        fontSize:15,
        textAlign: 'center',

    },
    backViewStyle:{
        position: 'absolute',
        left: 0,
        right:0,
        top: 0,
        bottom:0,
    }
});
