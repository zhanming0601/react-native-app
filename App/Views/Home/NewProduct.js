

import React, { Component,ViewPropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ScrollView,
    DeviceEventEmitter,

} from 'react-native';

import NewProductCell from './NewProductCell';
import * as Device from '../../Components/Constant/Device';

export default class NewProduct extends Component{

    // 构造
    constructor(props) {
        super(props);

        this.state = {

             dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>{return r1 !== r2}}),
        }

    }

    componentDidMount(){

        DeviceEventEmitter.addListener('NewProduct',(data)=>{

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
            })

        });
    };

    render(){
        return (

            <View style={{flex: 1}}>

                <View>
                    <View style = {styles.topBlockStyle}/>
                    <Text style={styles.topTextStyle}>新品入住</Text>
                    <View style = {styles.topLineStyle}/>
                </View>

                <ListView enableEmptySections={true}
                          dataSource={this.state.dataSource}
                          renderRow={(productModel) => {
                              return this._renderRowGG(productModel)
                          }}
                ></ListView>

            </View>
        )
    }

    _renderRowGG(productModel){



        return <NewProductCell productModel={productModel}/>
    }
}

const styles = StyleSheet.create({

    productItemStyle: {
        height: 100,
        width: 375,
        backgroundColor: 'red',

    },
    topTextStyle: {
        color:'#4f4f4f',
        fontSize:15,
        marginLeft:20,
        marginTop:10,
    },
    topLineStyle: {
        height: 1,
        width: Device.ScreenWidth-20,
        backgroundColor: '#D7D7D7',
        marginLeft:20,
        marginTop:10,
    },
    topBlockStyle:{
        height: 10,
        width: Device.ScreenWidth,
        backgroundColor: '#F7F7F7',

    }

})
