import React, { useEffect, useState } from "react";

import './menuItem.css';

import emitter from "../../eventProxy"
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const MenuItem = (props: any) => {

    const [isFold, setIsFold] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const toggleIsFold = () => {
            setIsFold(isFold => !isFold)
        }

        emitter.addListener("toogleFoldBtn", toggleIsFold);

        return () => {
            emitter.removeListener('toogleFoldBtn', toggleIsFold);
        }
    }, [])

    const toggleOpen = () => {
        setIsOpen(isOpen => !isOpen);
    }

    const arrowStyle = { fontSize: '10px' }

    return <li style={{ height: isOpen ? '' : '60px' }} onClick={toggleOpen} className={isOpen ? 'open' : ''}>
        <div className='menu-item'>
            {props.icon}
            {isFold ? '' : <>
                <div style={{ fontSize: 12, color: isOpen ? '#fff' : '#hsla(0, 0%, 100%, .65)' }}>
                    {props.title}
                </div>
                <span className='arrow-icon'>
                    {isOpen ? <UpOutlined style={arrowStyle} /> : <DownOutlined style={arrowStyle} />}
                </span>
            </>}
        </div>
        <div className='sub-container' style={{ display: !isFold && isOpen ? 'block' : 'none' }}>
            {props.subItem}
        </div>
    </li>
}

export default MenuItem;