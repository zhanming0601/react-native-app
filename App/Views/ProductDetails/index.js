
import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    ListView,
    RefreshControl,
    PanResponder,
} from 'react-native';

import {observer} from 'mobx-react/native';
import * as Device from '../../Components/Constant/Device';
import SDNavigationBar from '../../Components/Navigator/SDNavigationBar';
import SDHttpRequest from '../../Network';
import TagView from '../../Components/View/TagView';
import BackPressComponent from '../../Components/Constant/BackPressComponent';

// import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

@observer
export default class ProductDetail extends Component{


    static propTypes={

        productID:PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.state = {

            calculatorData:null,
            productDetail:null,
            applyCondition:null,

        };

        this.backPress = new BackPressComponent({backPress:(e)=>{return this.onBackPress(e)}});




        // this._panResponder = PanResponder.create({
        //
        //
        //     onStartShouldSetPanResponder: () => {
        //
        //         return this.state.ranResponder;
        //
        //     }, //响应手势
        //
        //     onPanResponderGrant: () => {
        //         this._top= this.state.top;
        //
        //
        //     },
        //     onPanResponderMove: (evt, gs) => {
        //
        //
        //         if(this.state.top<1 && gs.dy<0){
        //
        //
        //             this.setState({
        //                 scrollY:-gs.dy,
        //             })
        //
        //
        //             this.AScrollView.scrollTo({x:0, y:this.state.scrollY , animated: false})
        //             return;
        //         }
        //
        //
        //         console.log(gs.dy);
        //
        //         this.setState({
        //             top: this._top + gs.dy,
        //         })
        //
        //         // if(this.state.top<=0){
        //         //
        //         //     this.setState({
        //         //         top:0,
        //         //         // ranResponder:false,
        //         //         // scrollEnabled:true,
        //         //     })
        //         // }
        //
        //         // if(this.state.top<=0){
        //         //
        //         //     this.setState({
        //         //         top:0,
        //         //         ranResponder:false,
        //         //         scrollEnabled:true,
        //         //
        //         //     })
        //         // }
        //         // if(this.state.top>200){
        //         //
        //         //     this.setState({
        //         //         top:200,
        //         //         ranResponder:false,
        //         //     })
        //         // }
        //     },
        //     onPanResponderRelease: (evt, gs) => {//手松开，回到原始位置
        //
        //
        //         console.log(gs.dy);
        //
        //         if(this.state.top<1 && gs.dy<0){
        //
        //             return;
        //         }
        //
        //
        //
        //         this.setState({
        //             top: this._top + gs.dy,
        //         })
        //         //
        //
        //
        //         // if(this.state.top<=0){
        //         //
        //         //     this.setState({
        //         //         top:0,
        //         //         // ranResponder:false,
        //         //         // scrollEnabled:true,
        //         //     })
        //         // }
        //         // if(this.state.top>200){
        //         //
        //         //     this.setState({
        //         //         top:200,
        //         //         ranResponder:false,
        //         //     })
        //         // }
        //     }
        // })
    }


    componentDidMount(){

        this.backPress.componentDidMount();


        // SDHttpRequest.GET('v2/product/calculator',{productId:this.props.productID}).then((data) => {
        //
        //     console.log(data);
        //
        //     this.setState({
        //
        //         calculatorData:data,
        //     })
        //
        // },(error =>{
        //     this.infoSHow.show(error);
        // })).catch(error =>{
        //     this.infoSHow.show(error);
        // });
        //
        // SDHttpRequest.GET('v2/product/detail',{productId:this.props.productID}).then((data) => {
        //
        //     console.log(data);
        //
        //     this.setState({
        //
        //         productDetail:data,
        //     })
        //
        // },(error =>{
        //     this.infoSHow.show(error);
        // })).catch(error =>{
        //     this.infoSHow.show(error);
        // })


        Promise.all([SDHttpRequest.GET('v2/product/calculator',{productId:this.props.productID}),SDHttpRequest.GET('v2/product/detail',{productId:this.props.productID}),SDHttpRequest.GET('v2/product/particular',{productId:this.props.productID})]).then( (datas) => {

            this.setState({

                calculatorData:datas[0],
                productDetail:datas[1],
                applyCondition:datas[2],
            });

            console.log(datas[2]);


        }).catch(function(reason){
            // ...
        });

    }

    onBackPress(e){

        console.log('3');

        this.props.navigator.pop();
        return true;

    }

    componentWillUpdate(){

    }
    render(){

        return(

            <View style={{flex:1,backgroundColor:'#F5F5F5'} }>
                <SDNavigationBar title="产品详情" isTop={false} navigator = {this.props.navigator} />

                <ScrollView style={{flex:1,backgroundColor:'#F5F5F5'}} showsVerticalScrollIndicator={false}>
                    <Image  style={styles.topBackgroundImageStyle} resizeMode="stretch" source={require('../../assets/navigationImage.png')}/>

                    {this._calculatorView()}
                    {this._productInfoView()}
                    {this._bannerImageView()}
                    {this._applyConditionView()}
                    {this._applyProcess()}
                    {this._loanDetailView()}
                    {this._newGuideView()}
                    {this._productIntroductView()}




                </ScrollView>


            </View>

        )
    }

    //借款利率计算View / Loan Interest Rate View
    _calculatorView() {

        if (this.state.calculatorData == null) {
            return <View/>
        } else {

            return (

                <View>
                    <View style={styles.calculatorViewStyle}>
                        <Text style={styles.calculatorTitleStyle}>{this.state.calculatorData.interest_alg}</Text>
                        <Text style={styles.calculatorTitleStyle}>{this.state.calculatorData.method}</Text>
                        <Text style={styles.calculatorTitleStyle}>平均额度</Text>

                    </View>
                    <View style={[styles.calculatorViewStyle, {marginTop: 10}]}>
                        <Text
                            style={[styles.calculatorTitleStyle, {fontSize: 15}]}>{this.state.calculatorData.interest_rate}%</Text>
                        <Text style={[styles.calculatorTitleStyle, {fontSize: 17}]}>请选择金额/期限</Text>
                        <Text
                            style={[styles.calculatorTitleStyle, {fontSize: 15}]}>{this.state.calculatorData.avg_quota}</Text>

                    </View>
                    <View style={[styles.calculatorViewStyle,{marginTop:16}]}>
                        <View style={[styles.calculatorSelectStyle, {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}>
                            <Image style={[styles.calculatorSelectStyle, {position: 'absolute'}]} resizeMode="stretch"
                                   source={require('../../assets/product_selectButton_banckground.png')}/>
                            <Text
                                style={[styles.calculatorTitleStyle, {fontSize: 15}]}>{this.state.calculatorData.loan_min}~{this.state.calculatorData.loan_max}</Text>
                        </View>
                        <View style={[styles.calculatorSelectStyle, {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}>
                            <Image style={[styles.calculatorSelectStyle, {position: 'absolute'}]} resizeMode="stretch"
                                   source={require('../../assets/product_selectButton_banckground.png')}/>
                            <Text
                                style={[styles.calculatorTitleStyle, {fontSize: 15}]}>{this.state.calculatorData.period_min}~{this.state.calculatorData.period_max}</Text>
                        </View>

                    </View>


                </View>
            )
        }

    }

    _cellTitleView(title){
        return(
            <View style={styles.cellTitleView}>
                <Image resizeMode="stretch" source={require('../../assets/product_title_round.png')} style={styles.cellTitleImageView}/>
                <Text style={styles.cellTitleTextView} >{title}</Text>
            </View>
        )
    }

    _productInfoView() {

        if (this.state.productDetail == null) {
            return <View/>
        } else {

            return (

                <View style={styles.productInfoStyle}>

                    <Image style={styles.productImageStyle} source={{uri:this.state.productDetail.product_logo}}/>

                    <Text style={{marginLeft:55,marginTop:10,color:'#4c4c4c'}}>{this.state.productDetail.platform_product_name}</Text>

                    <View style={{marginTop:20,marginLeft:12}} >
                        <TagView  tagName={this.state.productDetail.tag_name}></TagView>
                    </View>


                    <View style={styles.gradualView}>

                        <View style={styles.gradualCellView}>
                            <Text style={{color: '#4C4C4C', fontSize: 13}}>产品人气： </Text>
                            <Image style={{width: this.state.productDetail.success_width / 2.0}}
                                   source={require('../../assets/rate.png')}></Image>
                            <Text style={styles.degreeText}>{this.state.productDetail.success_num}</Text>
                            <Text style={styles.gradualCellInfo}>{this.state.productDetail.success_count}人申请</Text>
                        </View>

                        <View style={styles.gradualCellView}>
                            <Text style={{color: '#4C4C4C', fontSize: 13}}>放款速度： </Text>
                            <Image style={{width: this.state.productDetail.fast_width / 2.0}}
                                   source={require('../../assets/rate.png')}></Image>
                            <Text style={styles.degreeText}>{this.state.productDetail.fast_num}</Text>
                            <Text style={styles.gradualCellInfo}>平均{this.state.productDetail.fast_time}</Text>
                        </View>
                        <View style={styles.gradualCellView}>
                            <Text style={{color: '#4C4C4C', fontSize: 13}}>下款概率： </Text>
                            <Image style={{width: this.state.productDetail.pass_width / 2.0}}
                                   source={require('../../assets/rate.png')}></Image>
                            <Text style={styles.degreeText}>{this.state.productDetail.pass_num}</Text>
                            <Text style={styles.gradualCellInfo}>通过率{this.state.productDetail.pass_rate}</Text>
                        </View>
                    </View>
                </View>
            )
        }

    }
    //广告图片的View / Advertising Picture View
    _bannerImageView() {

        if ((this.state.productDetail == null) || (this.state.productDetail.banner_img.length == 0)) {
            return <View/>
        } else {

            return (


                <View style={styles.bannerImageStyle}>
                    <Image  style={{ width:Device.ScreenWidth - 30, height:70}} source={{uri: this.state.productDetail.banner_img}} resizeMode="stretch"/>
                </View>
            )
        }
    }

    //申请条件 / Apply Condition
    _applyConditionView(){

        if (this.state.applyCondition == null) {
            return <View/>
        } else {

            return (
                <View style={styles.bannerImageStyle}>

                    {this._cellTitleView('申请条件&要点')}

                    <Text  style={[styles.cellTextStyle,{lineHeight:25,marginLeft:20,marginBottom:10}]}>{this.state.applyCondition.apply_condition.replace(/<br>/g,'\n')}</Text>

                </View>
            )
        }
    }

    //申请流程 / Apply Process

    _applyProcess(){
        if (this.state.applyCondition == null) {
            return <View/>
        } else {

            return (
                <View style={[styles.bannerImageStyle,{marginBottom:10}]}>

                    {this._cellTitleView('流程&材料')}

                    <ScrollView horizontal={true} style={{width:Device.ScreenWidth-20,marginLeft:10}} >
                        {
                            this._applyProcessCell( this.state.applyCondition.process)
                        }
                    </ScrollView>
                </View>
            )
        }

    }

    //
    _applyProcessCell(array){

        let cells = [];

        for(let i = 0 ;i<this.state.applyCondition.process.length;i++){

            let item =  array[i];

            cells.push(
                <View key={i} style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <Image resizeMode="stretch" style={{width:45,height:45}} source={{uri:item.img}}/>
                        {
                            i== (this.state.applyCondition.process.length-1)?<View/>:<Image resizeMode="stretch" style={{
                            marginLeft: 10,}}  source={require('../../assets/process.png')}/>

                        }

                    </View>
                    <View>

                        <Text style={{color:'rgba(81,151,233,1)',fontSize:11}}>{item.name}</Text>
                    </View>

                </View>
            )
        }

        return cells;
    }


    // 借款详情 / Loan Detail
    _loanDetailView(){

        if (this.state.applyCondition == null) {
            return <View/>
        } else {

            return (

                <View style={styles.bannerImageStyle}>
                    {this._cellTitleView('借款审核细节')}
                    {this._loanDetailArray(this.state.applyCondition.loan_detail)}
                </View>
            )
        }

    }

    _loanDetailArray(detailModelArray
    ){

        let detailArray = [];

        for(let i = 0;i<detailModelArray.length;i++){

            let detailModel = detailModelArray[i];

            detailArray.push(

                <View key={i} style={{flexDirection:'row'}} >
                    <Text style={[{width:85,textAlign:'right',lineHeight:25,marginTop:i==0?10:0},styles.cellTextStyle]} >{detailModel.title}：</Text>
                    <Text style={[{lineHeight:25,marginTop:i==0?10:0,marginRight:0,width:Device.ScreenWidth-120},styles.cellTextStyle]}  >{detailModel.content.replace(/<br>/g,'\n')}</Text>
                </View>
            )
        }
        return detailArray;
    }
    // 新手指导 / New guidance
    _newGuideView(){

        if (this.state.applyCondition == null) {
            return <View/>
        } else {

            return (

                <View style={styles.bannerImageStyle}>

                    {this._cellTitleView('新手指导')}

                    <Text style={[styles.cellTextStyle,{lineHeight:20,marginLeft:18,marginTop:10,marginBottom:10}]} >{this.state.applyCondition.guide.replace(/<br>/g,'\n')}</Text>

                </View>
            )
        }
    }
    // 产品介绍 / Product Introduct
    _productIntroductView(){

        if (this.state.applyCondition == null) {
            return <View/>
        } else {

            return (

                <View style={styles.bannerImageStyle}>
                    {this._cellTitleView('产品优势')}
                    <Text style={[styles.cellTextStyle,{lineHeight:20,marginLeft:18,marginTop:10,marginBottom:10}]}>{this.state.applyCondition.product_introduct}</Text>

                </View>
            )
        }
    }

    componentWillMount() {
        this.backPress.componentWillUnmount();
    }






//     _scrollViewTop(){
//
//         this.AScrollView.scrollTo(0,0,false);
// }




    // _loadMoreDate(){
    //
    //     if(this.pageCount == this.pageSize){
    //
    //         this.setState({
    //             isLoadAll:true,
    //         })
    //
    //         return;
    //     }
    //     this.pageSize++;
    //
    //     SDHttpRequest.GET('v1/product/lists',{productType:this.productType,indent:this.indent,loanMoney:this.loanMoney,pageSize:this.pageSize,pageNum:this.pageNum,loanNeed:this.loanNeed,loanHas:this.loanHas,areaId:this.areaId}).then((data) => {
    //
    //         this.productList = this.productList.concat(data.list);
    //         this.pageCount = data.pageCount;
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(this.productList),
    //             isLoaded:true,
    //         })
    //
    //     },(error =>{
    //         this.infoSHow.show(error);
    //     })).catch(error =>{
    //         this.infoSHow.show(error);
    //     })
    //
    // }


}

const styles = StyleSheet.create({

    topBackgroundImageStyle:{

        width:Device.ScreenWidth,
        height:150,
        position:'absolute',
        top:0,
        left:0,
    },
    calculatorViewStyle:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

        width:Device.ScreenWidth - 40,
        marginLeft:20,
    },

    calculatorTitleStyle:{
        backgroundColor:'rgba(255, 255, 255,0)',
        color:'white',
        fontSize:13,

    },

    calculatorSelectStyle:{

        width:(Device.ScreenWidth - 40)/2.0-1,
        height:45,
    },

    productInfoStyle:{


        width:Device.ScreenWidth - 30,
        backgroundColor:'rgba(255, 255, 255,1)',

        marginTop:23,
        marginLeft:15,
    },

    productImageStyle:{
        width:45,
        height:45,
        position:'absolute',
        left:10,
        top:-15,
        backgroundColor:'rgba(255, 255, 255,0)',
    },
    gradualView:{
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between',
        marginLeft:12,
        marginTop:10,
        height:65,
        marginBottom:10,

    },
    gradualCellView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    degreeText:{

        position:'absolute',
        fontStyle:'italic',
        left:143,
        fontSize:11,
        color:'#999999',
        backgroundColor:'rgba(255,255,255,0)'
        
    },
    gradualCellInfo:{
        position:'absolute',
        left:182,
        fontSize:10,
        color:'#999999',
    },
    //广告图片的Style / Advertising picture Style
    bannerImageStyle:{
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        marginLeft:15,
        marginTop:10,
        backgroundColor:'rgba(255, 255, 255,1)',
        width:Device.ScreenWidth - 30,
    },
    applyConditionStyle:{


    },
    cellTitleView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:10,
    },
    cellTitleImageView:{

        width:9,
        height:9,
        marginLeft:5,
    },
    cellTitleTextView:{

        color:'#303030',
        fontSize:14,
        marginLeft:5,
    },

    cellTextStyle:{
        color:'#4c4c4c',
        fontSize:13,

    }








})

