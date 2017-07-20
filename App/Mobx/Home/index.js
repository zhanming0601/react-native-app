/**
 * Created by zhanming on 2017/6/26.
 */

import {observable, computed, action} from 'mobx';
import * as Device from '../../Components/Constant/Device';
const instructionWith = Device.ScreenWidth*0.2;

//待办事项行数据
export default class HomeState {

    @observable
    bannerList = [];
    @action
    setBannerList(data) {
        this.bannerList =  data;
    }
    @observable
    RecommendList = [];

    @action
    setRecommendList(array) {
        this.RecommendList =  array;
    }

    @observable
    SubjectList = [];

    @action
    setSubjectList(array) {
        this.SubjectList =  array;
    }

    @computed get subjectProgressWith() {
        return  Device.ScreenWidth/( this.SubjectList.length * ( ( Device.ScreenWidth  - 40)/2.0 ) )*instructionWith;
    }

    @observable
    NewProductList = [1,2,3,4,5,6,7,8,9];

    @action
    setNewProductList(array) {
        this.NewProductList =  array;
    }



}