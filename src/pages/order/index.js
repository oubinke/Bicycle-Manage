import React from 'react';
import { Card, Button, Table, Form, Select, Modal, DatePicker, message } from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';
import Utils from './../../utils/utils';
import ETable from '../../components/ETable/index';

export default class Order extends React.Component {
    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'INPUT',
            label: '订单编号',
            field: 'order_num',
            placeholder: '请输入订单编号',
            width: 100
        },
        {
            type: '时间查询',
            field: 'time',
            placeholder: '请选择日期'
        }, {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '',
            width: 80,
            list: [{ id: '', name: '全部' }, { id: '0', name: '进行中' }, { id: '1', name: '结束行程' }]
        }
    ]
    componentDidMount() {
        this.requestList()
    }

    // 处理表单查询操作
    handleFilter = (params) => {
        // 表单返回的时间都为 moment 对象，所以在提交服务器前需要预处理。
        params.start_time = params.start_time ? params.start_time.format('YYYY-MM-DD') : '';
        params.end_time = params.end_time ? params.end_time.format('YYYY-MM-DD') : '';
        this.params = params;

        console.log(params);
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/order_info', this.params, false);
    }

    // 点击订单结束按钮触发的事件
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        console.log('item', item);
        if (item === [] || !item ) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        if (item[0].order_status === 1) {
            Modal.info({
                title: '信息',
                content: '该订单已结束，请选择其它订单'
            })
            return;
        }
        axios.ajax({
            url: '/order_info/finish',
            data: {
                params: {
                    order_num: item[0].order_num
                }
            }
        }, false).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功')
            }
            this.requestList();
        })
    }

    // 点击订单详情触发的事件
    // openOrderDetail = () => {
    //     let item = this.state.selectedItem;
    //     if (!item) {
    //         Modal.info({
    //             title: '信息',
    //             content: '请先选择一条订单'
    //         })
    //         return;
    //     }
    //     // 打开新窗口
    //     // TODO：对新窗口的处理
    //     window.open(`/#/common/order/detail/${item.id}`, '_blank')
    // }

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_num'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_num'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'phone_num'
            },
            {
                title: '行驶距离(公里)',
                dataIndex: 'distance',
                render(distance) {
                    return distance ? Math.ceil(distance / 1000) : null;
                }
            },
            {
                title: '行驶时长(分钟)',
                dataIndex: 'total_time'
            },
            {
                title: '订单状态',
                dataIndex: 'order_status',
                render(order_status) {
                    return order_status === 0 ? '进行中' : '已结束';
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
            },
            {
                title: '订单金额(元)',
                dataIndex: 'total_fee'
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        // const selectedRowKeys = this.state.selectedRowKeys;
        // const rowSelection = {
        //     type: 'radio',
        //     selectedRowKeys,
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRowKeys: selectedRowKeys,
        //             selectedItem: selectedRows
        //         });
        //     }
        // }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    {/* <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button> */}
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleFinishOrder}>结束订单</Button>
                </Card>
                {/* <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                }
                            };
                        }}
                    />
                </div> */}
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        /* rowSelection={'checkbox'} */
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                    />
                </div>
            </div>
        );
    }
}