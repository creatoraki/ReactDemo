import React from "react";


import './fotter.css';
import { GithubOutlined } from "@ant-design/icons";

const Fotter = (props: any) => {

    return <div className='fotter-container'>
        <div className='fotter'>
            <div>
                <span>Pro 首页</span>
                <span> <GithubOutlined style={{ margin: '0 4em' }} /> </span>
                <span>Ant Design</span>
            </div>
            <div style={{ marginTop: '10px' }}>
                Copyright © 2018蚂蚁金服体验技术部出品
            </div>
        </div>
    </div>
}

export default Fotter;