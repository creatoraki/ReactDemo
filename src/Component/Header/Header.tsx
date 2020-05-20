import React, { useState } from "react";
import { MenuFoldOutlined, AntDesignOutlined, MenuUnfoldOutlined, MessageTwoTone, AliwangwangOutlined, GithubOutlined, SearchOutlined, BellOutlined, TwitterOutlined } from "@ant-design/icons";

import emitter from "../../eventProxy"

import './header.css';
import { Badge } from "antd";

const Header = (props: any) => {

    const [isFold, setIsFold] = useState(false);

    const handleClickFoldBtn = () => {
        setIsFold(isFold => !isFold)
        emitter.emit("toogleFoldBtn")
    }

    const iconStyle = { marginRight: '20px', fontSize: '16px' }

    return <div className='header-container'>
        <div className='logo' style={{ width: isFold ? '70px' : '200px' }}>
            <AntDesignOutlined style={{ fontSize: '40px', lineHeight: '80px', marginLeft: '10px' }} />
            {isFold ? '' : <span className='logo-text'>Ant Design Pro</span>}
        </div>
        {isFold ? <MenuUnfoldOutlined className="fold-btn" onClick={handleClickFoldBtn} /> : <MenuFoldOutlined className="fold-btn" onClick={handleClickFoldBtn} />}
        <div className='header-float-right right-icon'>
            <TwitterOutlined style={iconStyle} />
            <GithubOutlined style={iconStyle} />
            <AliwangwangOutlined style={iconStyle} />
            <SearchOutlined style={iconStyle} />
            <Badge count={5} style={{ marginRight: '15px' }}>
                <BellOutlined style={iconStyle} />
            </Badge>
            <span className='icon-text'>
                <MessageTwoTone style={{ ...iconStyle, marginRight: '5px' }} />
                Serati Ma
            </span>
        </div>
    </div>
}

export default Header;