
import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ListView,
    RefreshControl,
    PanResponder,
    Animated,
} from 'react-native';

import {observer} from 'mobx-react/native';
import * as Device from '../../Components/Constant/Device';
import SDNavigationBar from '../../Components/Navigator/SDNavigationBar';
import SDHttpRequest from '../../Network';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProductListCell from './ProductListCell';

// import { BlurView } from 'react-native-blur';
import ProductDetails from '../ProductDetails';

import IndividualChoice from './IndividualChoice';

import PickerView from '../Home/PickerView';

@observer
export default class Product extends Component{

    constructor(props){
        super(props);
        //产品类型
       this.productType = 1;
       //身份
       this.indent = 0;
       // 借款金额
       this.loanMoney = 1000;
       //页码
       this.pageSize = 1;

       this.pageCount = 0;
       //每页显示条数
       this.pageNum = 10;
       //我需要
       this.loanNeed =[];
       //我有
       this.loanHas = [];
       //地域id
       this.areaId = 0;

       this.productList = [];

       this.state = {

            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>{return r1 !== r2}}),
            isLoaded:false,
            isLoadAll:false,
            isRefreshing:true,
            trans: new Animated.ValueXY(),
            bottom:80,
            right:30,
        };

    }

    componentDidMount(){

        this._loadData();

     }

    render(){

        return(

            <View style={{flex:1,backgroundColor:'#F5F5F5'} } ref={(view)=>{this.backgroundImage = view}} >

                <SDNavigationBar title='速贷大全' isTop={true} />


                {this._selectView()}





                <ListView enableEmptySections = {true}

                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._loadData.bind(this)}
                                  //tintColor="#ff0000"
                                  title="加载中..."
                                  //titleColor="#00ff00"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffffff"
                              />
                          }
                          dataSource={this.state.dataSource}
                          renderFooter={this._renderFooter.bind(this)}
                          onEndReached={this._loadMoreDate.bind(this)}
                          onEndReachedThreshold={100}
                          renderRow={(rowData,sectionID,rowID,)=>{return <ProductListCell  key={rowData.platform_product_id}  productModel={rowData} rowID={rowID}onSelect={this._pushDetail.bind(this)}
                          />}}

                >

                </ListView>
                <IndividualChoice ref={(name)=>{this.IndividualChoice = name}}/>
                <PickerView ref={(name)=>{this.moneyChoice = name}} pickViewArray={['金额不限','500元','1000元','1500元','2000元','3000元','4000元','5000元','6000元','7000元','9000元','10000元','150000元','20000元','30000元','50000元','10万元','20万元']} />
                <View><Toast ref={(toast => this.infoSHow = toast)}/></View>

            </View>

        )
    }

    _selectView(){

        return(
            <View style={styles.selectViewStyle}>


                        <TouchableOpacity style={[styles.selectIemViewStyle]} activeOpacity={1}
                                          onPress={()=>{

                                              this.moneyChoice.startAnimation();
                                          }}
                        >
                        <Text style={{color: '#4D4D4D', fontSize: 14}}>金额不限</Text>
                        <Image style={{width: 10, height: 6, marginLeft: 4}}
                               source={require('../../assets/arrows.png')}/>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.selectIemViewStyle} activeOpacity={1} onPress={()=>{



                            this.IndividualChoice.startAnimation();

                        }} >
                        <Text style={{color: '#4D4D4D', fontSize: 14}}>个性选择</Text>
                        <Image style={{width: 10, height: 6, marginLeft: 4}}
                               source={require('../../assets/arrows.png')}/>
                        </TouchableOpacity>
                    <View style={styles.centerLineStyle}/>

            </View>
        )
    }


    _loadData() {

        this.productList = [];

        this.pageSize = 1;

        this.pageCount = 0;

        SDHttpRequest.GET('v1/product/lists', {
            productType: this.productType,
            indent: this.indent,
            loanMoney: this.loanMoney,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            loanNeed: this.loanNeed,
            loanHas: this.loanHas,
            areaId: this.areaId
        }).then((data) => {

            this.productList = data.list;

            this.pageCount = data.pageCount;

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.productList),
                isLoaded: true,
                isRefreshing:false,
            })

        }, (error => {
            this.infoSHow.show(error);
        })).catch(error => {
            this.infoSHow.show(error);
        })

    }
    _loadMoreDate(){

        if(this.pageCount == this.pageSize){

            this.setState({
                isLoadAll:true,
            })

            return;
        }
        this.pageSize++;

        SDHttpRequest.GET('v1/product/lists',{productType:this.productType,indent:this.indent,loanMoney:this.loanMoney,pageSize:this.pageSize,pageNum:this.pageNum,loanNeed:this.loanNeed,loanHas:this.loanHas,areaId:this.areaId}).then((data) => {

            this.productList = this.productList.concat(data.list);
            this.pageCount = data.pageCount;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.productList),
                isLoaded:true,
            })

        },(error =>{
            this.infoSHow.show(error);
        })).catch(error =>{
            this.infoSHow.show(error);
        })

    }

    _renderFooter(){


        if(this.state.isLoaded && !this.state.isLoadAll){//加载完毕

            return (
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        正在加载...
                    </Text>
                </View>);
        }else if(this.state.isLoaded && this.state.isLoadAll){

            return (<View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                    加载完毕
                </Text>
            </View>)
        }else {
            return (<View/>)
        }
    }

    _pushDetail(productID) {

        this.props.navigator.push({
            component: ProductDetails,
            params: {
                ...this.props,
                productID: productID,
            }
        })
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
    },
    selectViewStyle:{

        flexDirection:'row',
        alignItems:'stretch',
        // justifyContent:'center',
        width:Device.ScreenWidth,
        height:45,
        borderBottomColor:'#EAEAEA',
        borderBottomWidth:1,

    },

    selectIemViewStyle:{

        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    centerLineStyle:{
        width:0.5,
        height:40,
        backgroundColor:'#EAEAEA',
        position:'absolute',
        left:Device.ScreenWidth/2.0,
        top:2.5,
    }



})
