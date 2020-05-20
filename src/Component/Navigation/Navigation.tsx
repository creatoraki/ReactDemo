import React, { useEffect, useState } from "react";

import './navigation.css';

import emitter from "../../eventProxy"
import MenuItem from "../MenuItem/MenuItem";
import { DashboardOutlined, FormOutlined, TableOutlined, ProfileOutlined, CheckCircleOutlined, UserOutlined, HighlightOutlined } from "@ant-design/icons";
import SubMenuItem from "../SubMenuItem/SubMenuItem";

const Navigation = (props: any) => {

    const [isFold, setIsFold] = useState(false);

    useEffect(() => {
        const toggleIsFold = () => {
            setIsFold(isFold => !isFold)
        }

        emitter.addListener("toogleFoldBtn", toggleIsFold);

        return () => {
            emitter.removeListener('toogleFoldBtn', toggleIsFold);
        }
    }, [])

    const iconStyle = isFold ?
        {
            fontSize: '20px',
            lineHeight: '63px',
            transition: 'all 0.4s ease-in-out'
        } : {
            marginRight: '10px',
            lineHeight: '63px',
            transition: 'all 0.4s ease-in-out'
        }

    return <div className='navigation-container' style={{ width: isFold ? "70px" : "200px" }}>
        <ul className='navigate-list'>
            <MenuItem title='Dashboard' icon={<DashboardOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='分析页'></SubMenuItem>
                        <SubMenuItem text='监控页'></SubMenuItem>
                        <SubMenuItem text='工作台'></SubMenuItem>
                    </>
                }></MenuItem>
            <MenuItem title='表单页' icon={<FormOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='基础表单'></SubMenuItem>
                        <SubMenuItem text='分布表单'></SubMenuItem>
                        <SubMenuItem text='高级表单'></SubMenuItem>
                    </>
                }>></MenuItem>
            <MenuItem title='列表页' icon={<TableOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='搜索列表' icon={<TableOutlined style={{ fontSize: '12px', marginRight: '10px' }} />}
                            child={<>
                                <SubMenuItem text='搜索列表 (文章)' style={{ paddingLeft: '60px' }}></SubMenuItem>
                                <SubMenuItem text='搜索列表 (项目)' style={{ paddingLeft: '60px' }}></SubMenuItem>
                                <SubMenuItem text='搜索列表 (应用)' style={{ paddingLeft: '60px' }}></SubMenuItem>
                            </>}
                        ></SubMenuItem>
                        <SubMenuItem text='查询表格'></SubMenuItem>
                        <SubMenuItem text='标准列表'></SubMenuItem>
                        <SubMenuItem text='卡片列表'></SubMenuItem>
                    </>
                }>></MenuItem>
            <MenuItem title='详情页' icon={<ProfileOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='基础详情页'></SubMenuItem>
                        <SubMenuItem text='高级详情页'></SubMenuItem>
                    </>
                }>>></MenuItem>
            <MenuItem title='结果页' icon={<CheckCircleOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='成功页'></SubMenuItem>
                        <SubMenuItem text='失败页'></SubMenuItem>
                    </>
                }>>></MenuItem>
            <MenuItem title='异常页' icon={<UserOutlined style={iconStyle} />}
                subItem={
                    <>
                        <SubMenuItem text='403'></SubMenuItem>
                        <SubMenuItem text='404'></SubMenuItem>
                        <SubMenuItem text='500'></SubMenuItem>
                    </>
                }>>></MenuItem>
            <MenuItem title='个人页' icon={<UserOutlined style={iconStyle} />} subItem={
                <>
                    <SubMenuItem text='个人中心'></SubMenuItem>
                    <SubMenuItem text='个人设置'></SubMenuItem>
                </>
            }>>></MenuItem>
            <MenuItem title='图形编辑器' icon={<HighlightOutlined style={iconStyle} />} subItem={
                <>
                    <SubMenuItem text='流程编辑器'></SubMenuItem>
                    <SubMenuItem text='脑图编辑器'></SubMenuItem>
                    <SubMenuItem text='拓扑编辑器'></SubMenuItem>
                </>
            }>>></MenuItem>
        </ul>
    </div>
}

export default Navigation;