import React from 'react';
import {Card, Button} from 'antd'

export default class Buttons extends React.Component {
    render () {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">Imooc</Button>
                </Card>
            </div>
        );
    }
}