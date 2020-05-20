import React, { useState, useEffect } from "react";
import { SmileOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

import emitter from "../../eventProxy"
import './subMenuItem.css';

const SubMenuItem = (props: any) => {

    const [active, setActive] = useState(false);

    const [childOpen, setChildOpen] = useState(false);

    useEffect(() => {
        const userClickMenuItem = () => {
            setActive(false)
        }

        emitter.addListener("userClickMenuItem", userClickMenuItem);

        return () => {
            emitter.removeListener('userClickMenuItem', userClickMenuItem);
        }
    }, [])

    const handleCLickMenuItem = () => {
        if (props.child) {
            setChildOpen(childOpen => !childOpen)
        } else {
            emitter.emit('userClickMenuItem');
            setActive(true);
        }
    }

    return <>
        <div className={'sub-menu-item' + (active ? ' active' : '')} onClick={(e) => { e.stopPropagation(); handleCLickMenuItem() }}
            style={{ ...props.style, background: active ? '#1890ff' : '#03101bf5', color: childOpen ? '#fff' : '#hsla(0, 0%, 100%, .65)' }}>
            {props.icon ? props.icon : <SmileOutlined style={{ fontSize: '12px', marginRight: '10px' }} />}
            {props.text}
            {props.child ? <span className='arrow-icon'>
                {childOpen ? <UpOutlined style={{ fontSize: '10px' }} /> : <DownOutlined style={{ fontSize: '10px' }} />}
            </span> : ''}
        </div>
        {props.child && childOpen ? props.child : ''}
    </>
}

export default SubMenuItem;