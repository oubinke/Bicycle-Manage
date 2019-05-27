import React from 'react';
import { Col, Row } from 'antd';
import './index.less'
import Util from '../../utils/utils';
import axios from '../../axios'

export default class Header extends React.Component {
    state = {}
    componentWillMount() {
        this.setState({
            userName: 'Bingo'
        })
        setInterval(() => {
            let sysTime = Util.formateDate();
            this.setState({
                sysTime
            })
        }, (1000));
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = '北京';
        axios.jsonp({
            url: "http://api.map.baidu.com/telematics/v3/weather?location=" +encodeURIComponent(city)+"&output=json&ak=PLGCD1a4RMBuXMZ71OoXz651eru9T4nj"
        }).then((res) => {
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                });
            }
        });
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img alt="This is picture about weather" src={this.state.dayPictureUrl}></img>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}