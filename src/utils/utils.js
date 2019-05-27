import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {
    // 格式化时间
    formateDate() {
        // console.log(time);
        var date = new Date();
        var time = {
            Y: date.getFullYear(),
            M: date.getMonth() + 1,
            D: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        };
        for (var key in time) {
            time[key] = time[key] < 10 ? ('0' + time[key]) : time[key];
        }
        return time.Y + '-' + time.M + '-' + time.D + ' ' + time.h + ':' + time.m + ':' + time.s;
    },
    // 分页
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            showQuickJumper: true
        }
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
    // 将输入的数组转换为<Opting>组件
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys 是一个数组
     * @param {*选中行对象} selectedItem 是一个数组
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        // 对于多选框，需要一个selectedIds来作为选中的唯一标识
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            // 对于单选框
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}