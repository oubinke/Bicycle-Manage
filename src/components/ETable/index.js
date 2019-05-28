import React from 'react';
import { Table } from 'antd';
import "./index.less";

// TODO：完成复选框逻辑的梳理
export default class ETable extends React.Component {

    state = {}
    //处理行点击事件
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        // 多选框 OR 单选框
        if (rowSelection == 'checkbox') {
            let selectedRowKeys = this.props.selectedRowKeys || [];
            let selectedIds = this.props.selectedIds;
            let selectedItem = this.props.selectedItem || [];
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                // 如果点击的行在点击前没有被选中，那么就选中它
                if (i == -1) {
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    // 如果点击的行在点击前被选中了，那么就反选它
                    selectedIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem || {}, selectedIds);
        } else {
            let page = this.props.pagination.current;
            let selectKey = [(page - 1) * 10 + index];
            const selectedRowKeys = this.props.selectedRowKeys;
            // 如果当前行已经被选中，则反选
            if (selectedRowKeys && selectedRowKeys[0] == selectKey[0]) {
                selectKey = [];
                record = [];
            }
            // console.log('selectKey: ', selectKey, ',record:', record);
            // console.log('-----------------------------------');
            this.props.updateSelectedItem(selectKey, [record]);
        }
    };

    // 处理按钮点击事件
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let rowSelection = this.props.rowSelection;
        const selectedIds = [];
        // 如果是多选框
        if (rowSelection == 'checkbox') {
            selectedRows.map((item) => {
                selectedIds.push(item.id);
            });
        }
        console.log('selectedRowKeys', selectedRowKeys, 'selectedRows', selectedRows);
        this.props.updateSelectedItem(selectedRowKeys, selectedRows, selectedIds);
    };

    // 选择所有行的回调。
    // onSelectAll = (selected, selectedRows, changeRows) => {
    //     console.log(selectedRows);
    //     let selectedIds = [];
    //     let selectKey = [];
    //     selectedRows.forEach((item, i) => {
    //         selectedIds.push(item.id);
    //         selectKey.push(i);
    //     });
    //     this.props.updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds);
    // }

    getOptions = () => {
        let p = this.props;
        const name_list = {
            "订单编号": 170,
            "车辆编号": 80,
            "手机号码": 96,
            "用户姓名": 70,
            "密码": 70,
            "运维区域": 300,
            "车型": 42,
            "故障编号": 76,
            "代理商编码": 97,
            "角色ID": 64
        };
        if (p.columns && p.columns.length > 0) {
            p.columns.forEach((item) => {
                //设置每一列的宽度
                if (!item.title) {
                    return
                }
                if (!item.width) {
                    if (item.title.indexOf("时间") > -1 && item.title.indexOf("持续时间") < 0) {
                        item.width = 132
                    } else if (item.title.indexOf("图片") > -1) {
                        item.width = 86
                    } else if (item.title.indexOf("权限") > -1 || item.title.indexOf("负责城市") > -1) {
                        item.width = '40%';
                        item.className = "text-left";
                    } else {
                        if (name_list[item.title]) {
                            item.width = name_list[item.title];
                        }
                    }
                }
                item.bordered = true;
            });
        }
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            // 点击表格中某一行的单选按钮触发的事件
            onChange: this.onSelectChange,
            // onSelectAll: this.onSelectAll
        };
        let row_selection = this.props.rowSelection;
        // 当属性未false或者null时，说明没有单选或者复选列
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection == 'checkbox') {
            //设置类型为复选框
            rowSelection.type = 'checkbox';
        } else {
            //默认为单选
            row_selection = 'radio';
        }
        return <Table
            className="card-wrap page-table"
            bordered
            columns={this.props.columns}
            dataSource={this.props.dataSource}
            pagination={this.props.pagination}
            rowSelection={row_selection ? rowSelection : null}
            // 点击表格中某一行触发的事件
            onRow={(record, index) => ({
                onClick: () => {
                    if (!row_selection) {
                        return;
                    }
                    this.onRowClick(record, index)
                }
            })}
        />
    };

    render = () => {
        return (
            <div>
                {this.getOptions()}
            </div>
        )
    }
}