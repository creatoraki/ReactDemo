import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Modal, Alert, Table, message, Badge } from 'antd';
import { UpOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";


import "./content.css"
import Fotter from "../Fotter/Fotter";

axios.defaults.baseURL = "https://reactDemo.cn/api";

const { Option } = Select;

const lineStyle = { width: '31%', marginTop: '20px', }


const Content = (props: any) => {

    const [isFold, setIsFold] = useState(false);

    const [visible, setVisible] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [dataSource, setDataSource] = useState<any>([]);

    const [filteredInfo, setFilteredInfo] = useState<any>({});

    const [count, setCount] = useState(0);

    const [form] = Form.useForm();

    useEffect(() => {
        let tableListDataSource = [];
        for (let i = 0; i < 46; i += 1) {
            tableListDataSource.push({
                key: i,
                disabled: i % 6 === 0,
                href: 'https://ant.design',
                avatar: [
                    'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
                    'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
                ][i % 2],
                no: `TradeCode ${i}`,
                title: `⼀个任务名称 ${i}`,
                owner: '曲丽丽',
                description: '这是⼀段描述',
                callNo: Math.floor(Math.random() * 1000),
                status: Math.floor(Math.random() * 10) % 4,
                updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
                createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
                progress: Math.ceil(Math.random() * 100),
            });
        };

        setDataSource(tableListDataSource);
    }, [])

    const onFinish = async (values: any) => {
        message.info('已发起数据请求');
        const response = await axios.post('/getList', values);
        if (response.status === 200) {
            setDataSource(response.data);
        } else {
            message.error('请求数据失败');
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleToggleFold = () => {
        setIsFold(isFold => !isFold);
    }

    const handleClickAdd = () => {
        setVisible(true)
    }

    const format = (date: Date, format: string) => {
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? (o as any)[k] : ("00" + (o as any)[k]).substr(("" + (o as any)[k]).length));
            }
        }
        return format;
    };

    const valueMap = [{
        key: 0,
        value: '运行中',
        color: 'cyan'
    }, {
        key: 1,
        value: '已上线',
        color: 'green'
    },
    {
        key: 2,
        value: '异常',
        color: 'red'
    },
    {
        key: 3,
        value: '已关闭',
        color: 'gray'
    }]

    const generateStatusUI = (value: number) => {
        const entity = valueMap.find(et => et.key === value);
        return <Badge color={entity?.color} text={entity?.value} />
    }

    const columns = [
        {
            title: '规则编号',
            dataIndex: 'no',
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: (a: any, b: any) => a.callNo - b.callNo,
            render: (_: any, record: any) => {
                return <>
                    <div style={{ textAlign: 'right' }}>{record.callNo}万</div>
                </>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: [
                { text: '运行中', value: 0 },
                { text: '已上线', value: 1 },
                { text: '异常', value: 2 },
                { text: '已关闭', value: 3 },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value: any, record: any) => record.status === value,
            render: (_: any, record: any) => {
                return <>
                    {generateStatusUI(record.status)}
                </>
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            render: (_: any, record: any) => {
                return <>
                    <span>{format(record.updatedAt, 'yyyy-MM-dd hh:mm:ss')}</span>
                </>
            },
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (_: any, record: any) => {
                return <>
                    <span className='mark pointer'>配置</span>
                    <span> / </span>
                    <span className='mark pointer'>订阅警报</span>
                </>
            }
        }
    ];

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
        const result = dataSource.filter((record: any) => {
            return selectedRowKeys.includes(record.key)
        });
        let count = 0;
        result?.forEach((record: any) => {
            count += record.callNo
        });

        setCount(count);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setFilteredInfo(filters);
    }

    return <div className='content-container'>
        <div className='content-header'>
            <span className='gray'>首页 <span> / </span></span>
            <span className='gray'>列表页 <span> / </span></span>
            <span>查询表格 </span>
        </div>
        <div className='content-title'>
            查询表格
        </div>
        <div className='content'>
            <div className='form'>
                <Form
                    form={form} layout='inline' name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        label="规则编号"
                        name="no"
                        style={lineStyle}
                    >
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item
                        label="使用状态"
                        name="status"
                        style={lineStyle}
                    >
                        <Select
                            placeholder="请选择"
                            allowClear
                            style={{ minWidth: '200px' }}
                        >
                            <Option value="error">异常</Option>
                            <Option value="runing">运行中</Option>
                            <Option value="released">已上线</Option>
                        </Select>
                    </Form.Item>
                    {isFold ? '' : <>
                        <Form.Item
                            label="调用次数"
                            name="callNo"
                            style={lineStyle}
                        >
                            <Input placeholder='请输入' />
                        </Form.Item>
                        <Form.Item
                            label="更新日期"
                            name="updatedAt"
                            style={lineStyle}
                        >
                            <DatePicker placeholder='请输入更新日期' style={{ minWidth: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="使用状态"
                            name="status2"
                            style={lineStyle}
                        >
                            <Select
                                placeholder="请选择"
                                allowClear
                                style={{ minWidth: '200px' }}
                            >
                                <Option value="error">异常</Option>
                                <Option value="runing">运行中</Option>
                                <Option value="released">已上线</Option>
                            </Select>
                        </Form.Item>
                    </>}

                    <Form.Item style={{ flex: 'auto', marginTop: '20px', paddingLeft: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={onReset} style={{ marginLeft: '10px' }}>
                                重置
                            </Button>
                            <Button type="link" htmlType="button" onClick={handleToggleFold}>
                                {isFold ? <>展开
                                <DownOutlined /></> : <>收起
                                <UpOutlined /></>}

                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <div className='table'>
                    <Button type='primary' icon={<PlusOutlined />} style={{ borderRadius: '5px', marginBottom: '20px' }} onClick={handleClickAdd}>新建</Button>
                    <Modal
                        title="新建规则"
                        visible={visible}
                        onOk={() => { setVisible(false) }}
                        onCancel={() => { setVisible(false) }}
                        okText='确定'
                        cancelText='取消'
                    >
                        <Form>
                            <Form.Item
                                label="描述"
                                name="description"
                                rules={[{ required: true, message: '必须输入描述' }]}
                                style={{ margin: 'auto', width: '80%' }}
                            >
                                <Input placeholder='请输入' />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Alert
                        message={
                            <div>已选择 <span className='mark' >0</span> 项,服务调用次数总计 <b>{count} 万</b>
                                <Button type="link" htmlType="button" onClick={() => { setSelectedRowKeys([]); setCount(0) }}>
                                    清空
                            </Button>
                            </div>
                        }
                        type="info"
                        showIcon
                        className='table-alert'
                        style={{ marginBottom: '10px' }}
                    />
                    <Table columns={columns} rowSelection={rowSelection} dataSource={dataSource} onChange={handleChange}></Table>
                </div>
            </div>
            <Fotter></Fotter>
        </div>
    </div>
}

export default Content;