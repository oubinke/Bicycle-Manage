import React from 'react';
import { Card, Button, Table, Form, Input, Checkbox, Select, Radio, Icon, message, Modal, DatePicker } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable/index';
import Moment from 'moment';
import BaseForm from '../../components/BaseForm';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class User extends React.Component {

    state = {
        list: []
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: 'INPUT',
            label: '员工姓名',
            field: 'name',
            placeholder: '请输入姓名',
            width: 80,
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'phone_num',
            placeholder: '请输入手机号',
            width: 80,
        }
    ]

    requestList = () => {
        axios.requestList(this, '/employee', this.params, false);
        // axios.ajax({
        //     url: '/table/list1',
        //     data: {
        //         params: {
        //             page: this.params.page
        //         }
        //     }
        // }, true).then((res) => {
        //     let _this = this;
        //     this.setState({
        //         list: res.result.list.map((item, index) => {
        //             item.key = index
        //             return item;
        //         }),
        //         pagination: Utils.pagination(res, (current) => {
        //             _this.params.page = current;
        //             _this.requestList();
        //         })
        //     })
        // })
    }

    componentDidMount() {
        this.requestList();
    }

    // 处理表单查询操作
    // TODO：将参数传递到后端进行查询
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    // 操作员工
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            })
        } else if (type == "edit" || type == 'detail') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type == 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item[0],
                type
            })
        } else if (type == "delete") {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title: '确认删除',
                content: '确定要删除此用户吗？',
                onOk: () => {
                    axios.ajax({
                        url: '/employee/delete',
                        data: {
                            params: {
                                id: item[0].id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            this.setState({
                                isVisible: false
                            })
                            this.requestList();
                            this.state.selectedRowKeys = [];
                        }
                    })
                }
            })
        }
    }

    handleSubmit = () => {
        let type = this.state.type;
        let employeeInfo = this.userForm.props.form.getFieldsValue();
        if (type === 'detail') {
            this.setState({
                isVisible: false,
            });
            return;
        } else if (type === 'edit') {
            employeeInfo.id = this.state.userInfo.id;
        }
        axios.ajax({
            url: type == 'create' ? '/employee/insert' : '/employee/update',
            data: {
                params: employeeInfo
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isVisible: false,
                    selectedRowKeys: []
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            width: 100
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: 100
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            },
            width: 100
        }, {
            title: '婚姻状态',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已婚' : '未婚'
            },
            width: 100
        },{
            title: '手机号码',
            dataIndex: 'phone_num',
            width: 200            
        }, 
        {
            title: '身份证号',
            dataIndex: 'identify_num',
            width: 300
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }
        ];
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operator-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button type="primary" icon="file-text" onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
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
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst} />
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        // 对于||来说，如果第一个操作数的求值结果为false，则返回第二个操作符
        // 当type为create时，this.props.userInfo为undefined，将其转换为一个空对象，保证后面不会报错
        // const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        var userInfo;
        if (type === 'create') {
            userInfo = {};
        } else {
            userInfo = this.props.userInfo;
        }

        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        // 对于&&来说，如果第一个操作数是对象，则返回第二个操作数；如果第一个操作数是undefined，则返回undefined
                        (userInfo && type == 'detail') ? userInfo.name :
                            getFieldDecorator('name', {
                                initialValue: userInfo.name
                            })(
                                <Input type="text" placeholder="请输入姓名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? (userInfo.sex == 1 ? '男' : '女') :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )}
                </FormItem>
                <FormItem label="婚姻状态" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? (userInfo.isMarried == 0 ? '未婚' : '已婚') :
                            getFieldDecorator('isMarried', {
                                initialValue: userInfo.isMarried
                            })(
                                <RadioGroup>
                                    <Radio value={0}>未婚</Radio>
                                    <Radio value={1}>已婚</Radio>
                                </RadioGroup>
                            )}
                </FormItem>
                <FormItem label="手机号码" {...formItemLayout}>
                    {
                        // 对于&&来说，如果第一个操作数是对象，则返回第二个操作数；如果第一个操作数是undefined，则返回undefined
                        (userInfo && type == 'detail') ? userInfo.phone_num :
                            getFieldDecorator('phone_num', {
                                initialValue: userInfo.phone_num
                            })(
                                <Input type="text" placeholder="请输入手机号码" />
                            )
                    }
                </FormItem>
                <FormItem label="身份证号码" {...formItemLayout}>
                    {
                        // 对于&&来说，如果第一个操作数是对象，则返回第二个操作数；如果第一个操作数是undefined，则返回undefined
                        (userInfo && type == 'detail') ? userInfo.identify_num :
                            getFieldDecorator('identify_num', {
                                initialValue: userInfo.identify_num
                            })(
                                <Input type="text" placeholder="请输入身份证号码" />
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <Input.TextArea rows={3} placeholder="请输入联系地址" />
                            )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);