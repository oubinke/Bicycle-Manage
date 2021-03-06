import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import BaseForm from '../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }


    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: 'SELECT',
            label: '用车模式',
            field: 'mode',
            placeholder: '全部',
            initialValue: '0',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '指定停车点模式' }, { id: '2', name: '禁停区模式' }]
        },
        {
            type: 'SELECT',
            label: '营运模式',
            field: 'op_mode',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '自营' }, { id: '2', name: '加盟' }]
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    // 处理表单查询操作
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        axios.requestList(this, '/open_city', this.params, false);
    }

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }
    // 城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/open_city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code === '0') {
                message.success('开通成功');
                this.setState({
                    isShowOpenCity: false
                })
                this.requestList();
            }
        })
    }
    render() {
        // columns能不能放render外面？
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode == 1 ? '停车点' : '禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                // 这里要渲染的是一个数组对象，需要把数组转换为基本数据类型。
                // render(arr) {
                //     return arr.map((item) => {
                //         return item.user_name;
                //     }).join(',');
                // }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time',
                // 从数据库读取出来的时间格式为1994-07-19T19:56:36.000Z，需要去掉T和Z
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => { this.cityForm = inst; }} />
                </Modal>
            </div>
        );
    }
}

// 点击开通城市之后弹出的表单
class OpenCityForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">上海市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="操作人" {...formItemLayout}>
                    {
                        getFieldDecorator('sys_user_name', {
                            initialValue: 'Bingo'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="Bingo">Bingo</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);