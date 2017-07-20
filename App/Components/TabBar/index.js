import React, { 
    Component  
} from 'react'

import {
    StyleSheet,
    Text,
    Image,
    View,

} from 'react-native'

import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import Home from '../../Views/Home';

import Product from '../../Views/Product';

import Me from '../../Views/Me';


export default class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home'
        }
    }
    
    render() {
        return (
            <View style={styles.container}>

                <TabNavigator >

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Image source={require('../../assets/home.png')} style={styles.imageSize}
                        />}
                        renderSelectedIcon={() => <Image source={require('../../assets/homeSelect.png')} style={styles.imageSize}/>}
                        onPress={() => this.setState({ selectedTab: 'home' })}>

                        <Home navigator={navigator} {...this.props}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'product'}
                        title="Product"
                        renderIcon={() => <Image source={require('../../assets/supermarket.png')} style={styles.imageSize}
                        />}
                        renderSelectedIcon={() => <Image source={require('../../assets/supermarketSelect.png')} style={styles.imageSize}/>}
                        onPress={() => this.setState({ selectedTab: 'product' })}>

                        <Product navigator={navigator} {...this.props}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        title="me"
                        renderIcon={() => <Image source={require('../../assets/me.png')} style={styles.imageSize}
                        />}
                        renderSelectedIcon={() => <Image source={require('../../assets/me_select.png')} style={styles.imageSize}/>}
                        onPress={() => this.setState({ selectedTab: 'me' })}>

                        <Me navigator={navigator} {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>



            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

      flex:1,
    },
    imageSize:{
        height:22,
        width:22,

    }
})