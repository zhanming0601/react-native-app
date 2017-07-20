
import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native';

const count = 5.0;

let  StarWidth = 0;


const starType={
    greyStar:'greyStar',
    yellowStar:'yellowStar',
}


export default class TagView extends Component{


    static propTypes ={

        tagName:PropTypes.array.isRequired,


    }


    constructor(props){
        super(props);

    }

    // componentWillReceiveProps(){
    //
    //     this.StarNum = this.props.StarNum;
    // }



    render(){

        return(
            <View style={styles.tagFatherViewStyle}>
                {this._tagViews(this.props.tagName)}

            </View>
        )
    }

    _tagViews(tagItem){

        let tagViewList = [];
        let width = 50;
        let height = 20;
        for(let i = 0;i<tagItem.length;i++){

            let tagModel = tagItem[i];

            tagViewList.push(

                <View key={i} style={[styles.tagViewStyle,{borderColor:'#'.concat(tagModel.boder_color),backgroundColor:'#'.concat(tagModel.bg_color)}]} >

                    <Text style={{fontSize:10,color:'#'.concat(tagModel.font_color)}} >{tagModel.name}</Text>
                </View>
            )


        }

        return tagViewList;



    }
}

const styles = StyleSheet.create({


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






})/**
 * Created by zhanming on 2017/7/9.
 */
