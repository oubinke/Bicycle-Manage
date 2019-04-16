import JsonP from 'jsonp';
import axios from 'axios';

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if  (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }
}

// http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=PLGCD1a4RMBuXMZ71OoXz651eru9T4nj