
import React, {
    Component
} from 'react';

import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    DeviceEventEmitter,
    RefreshControl,
} from 'react-native';

import Swiper from 'react-native-swiper';
import HomeState from '../../Mobx/Home';
import {observer} from 'mobx-react/native';
import  Banner from './Banner';
import  Recommend from './Recommend';
import  Subjects from  './Subjects';
import NewProduct from  './NewProduct';
import SDHttpRequest from '../../Network';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as Device from '../../Components/Constant/Device';
import PickerView from './PickerView';
import FilterTagDataBase from '../../Components/Constant/FilterTagDataBase'

import HomeNavigator from './HomeNavigator';

@observer
export default class Home extends Component{


    homeState = new HomeState();
    constructor(props) {
        super(props)

        this.state = {

            RecommendAllArray:[],

            NewProductArray:[],
        }

    }

    componentDidMount(){



        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         var initialPosition = JSON.stringify(position);
        //
        //         console.log('position');
        //
        //         console.log(position);
        //     },
        //     (error) => alert(JSON.stringify(error)),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // );


        SDHttpRequest.GET('v2/banners').then((data) => {
            this.homeState.setBannerList(data);

        },(error =>{
            this.infoSHow.show(error);
        })).catch(error =>{
            this.infoSHow.show(error);
        })

        SDHttpRequest.GET('v1/product/recommends').then((data) => {

            this.setState({
                RecommendAllArray:data.list,

            });

            DeviceEventEmitter.emit('zhanming');
        },(error =>{
            this.infoSHow.show(error);
        })).catch(error =>{
            this.infoSHow.show(error);
        })




        SDHttpRequest.GET('v1/banners/subjects').then((data) => {

            this.homeState.setSubjectList(data);

        },(error =>{
            this.infoSHow.show(error);
        })).catch(error =>{
            this.infoSHow.show(error);
        })

        SDHttpRequest.GET('v1/product/online').then((data) => {


            //
            // this.setState({
            //     NewProductArray:data,
            // })
            DeviceEventEmitter.emit('NewProduct',data);

        },(error =>{
            this.infoSHow.show(error);
        })).catch(error =>{
            this.infoSHow.show(error);
        });


        SDHttpRequest.GET('v1/product/searchtag').then((data) => {

            FilterTagDataBase.saveFilterTagArray(data);

        });



        // Promise.all(SDHttpRequest.GET('v2/banners'),SDHttpRequest.GET('v1/product/recommends')).then((array)=>{
        //     console.log(array);
        // })

    }

    componentWillUpdate(){
    }
    render(){

        return(

            <View style={{flex: 1, backgroundColor: 'white'}}>

                <HomeNavigator   onClick={this.showPickerView.bind(this)} />

                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                        progressBackgroundColor="#ffffff"
                    />
                }>
                    {/*首页轮播*/}
                    <Banner homeState={this.homeState}
                            {...this.props}
                            navigator = {this.props.navigator}
                    >

                    </Banner>

                    {this._guideView()}

                    <Recommend RecommendAllArray = {this.state.RecommendAllArray} homeState={this.homeState} navigator = {this.props.navigator}/>

                    <Subjects homeState={this.homeState} {...this.props}/>

                    <Image resizeMode="stretch" style={styles.homeGuideImageStyle} source={require('../../assets/home_guide.png')}/>

                    <NewProduct {...this.props} />


                    <View><Toast ref={(toast => this.infoSHow = toast)}/></View>
                </ScrollView>

                <PickerView ref ={(e)=>{this.PickerView = e}} pickViewArray={['金额不限','500元','1000元','1500元','2000元','3000元','4000元','5000元','6000元','7000元','9000元','10000元','150000元','20000元','30000元','50000元','10万元','20万元']} />
            </View>

        )
    }

    _guideView(){

        return <View style={styles.guideViewStyle}>
             <View style = {[styles.guideCellStyle]} >
                 <Image source={require('../../assets/homeTotal.png')} style={styles.guideImageStyle}/>
             </View>

             <View style = {[styles.guideCellStyle]}>
                 <Image source={require('../../assets/homeBbs.png')} style={styles.guideImageStyle}/>
             </View>
         </View>
    }

    //点击Nav上借钱
    showPickerView(){

        this.PickerView.startAnimation();

    }



}

const styles = StyleSheet.create({

    guideViewStyle:{

        width:Device.ScreenWidth,
        height:100,
        flexDirection:'row',

    },
    guideCellStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    guideImageStyle:{
        width:90,
        height:90,
    },
    homeGuideImageStyle:{
        width:Device.ScreenWidth,
        height:60.0/375*Device.ScreenWidth,


    }


})

