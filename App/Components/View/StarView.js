
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


export default class StarView extends Component{


    static propTypes ={

        StarWidth:PropTypes.number.isRequired,

        StarHeight:PropTypes.number.isRequired,

        StarNum:PropTypes.number.isRequired,

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
            <View style={{width:this.props.StarWidth,
                height:this.props.StarHeight}} >
                <View style={[styles.greyStarViewStyle,{width:this.props.StarWidth,
                    height:this.props.StarHeight}]} >

                    {this._getStarView(starType.greyStar)}

                </View>

                <View style={[styles.starViewStyle,{width:this.props.StarWidth*(this.props.StarNum/count),
                    height:this.props.StarHeight}]} >

                    {this._getStarView(starType.yellowStar)}
                </View>

            </View>
        )
    }

    _getStarView(type){


        let starViews = [];

        for(let i = 0; i<count;i++){
            starViews.push(
                <View key={i} style={[styles.starSingleViewStyle,{width:this.props.StarWidth/5.0,
                    height:this.props.StarWidth/5.0}]} >
                    <Image style={[styles.starSingleImageStyle,{
                        width:this.props.StarWidth/5.0*0.8,
                        height:this.props.StarWidth/5.0*0.8}]}   source={type == starType.yellowStar?require('../../assets/star.png'):require('../../assets/grayStar.png')}/>
                </View>
            )

        }

        return  starViews;

    }
}

const styles = StyleSheet.create({

    starFatherViewStyle:{



    },

    starViewStyle: {

        top: 0,
        left: 0,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow:'hidden',
    },
    greyStarViewStyle:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    starSingleViewStyle:{


        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    starSingleImageStyle:{

    }






})