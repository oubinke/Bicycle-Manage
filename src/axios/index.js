import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from '../utils/utils';


export default class Axios {

    static requestList(_this, url, params, isMock) {
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }, isMock).then((data) => {
            if (data && data.result) {
                let list;
                // 注意返回数据名称的不同
                if (data.result.list) {
                    list = data.result.list.map((item, index) => {
                        item.key = index;
                        return item;
                    });
                } else {
                    list = data.result.item_list.map((item, index) => {
                        item.key = index;
                        return item;
                    });
                }
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        });
    }

    // 跨域请求天气信息
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options, isMock) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi;
        if (isMock) {
            baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        } else {
            baseApi = 'http://localhost:8888';
            // baseApi = 'https://www.easy-mock.com/mock/5cb5d9425ea1070405312b0f/api';
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                // 对于&&操作符，如果两个操作数都为对象，则返回第二个对象。
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}

// http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=PLGCD1a4RMBuXMZ71OoXz651eru9T4nj