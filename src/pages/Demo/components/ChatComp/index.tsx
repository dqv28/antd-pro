import { CheckCard } from "@ant-design/pro-components";
import { Avatar } from "antd";
import React, { useState } from "react"

import './index.css'

const ChatComp: React.FC = ({children}) => {
    return (
        // <span>{children ? 'Tất cả' : 'Chưa đọc'}</span>
        <>
            {
                children ? 
                <CheckCard
                    style={{
                        width: '100%',
                    }}
                    avatar={
                        <Avatar
                            src="https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg"
                            size={48}
                        />
                    }
                    title={
                        <div>
                            <span className="zl-item__title" style={{
                                fontWeight: 400
                            }}>
                                Dev Community
                            </span>
                        </div>
                    }
                    description={
                        <span className="zl-item__desc">Tony Do: ae git cái gì cũng để awesome </span>
                    }
                    
                    bordered={false}
                /> : 
                <CheckCard
                    style={{
                        width: '100%',
                    }}
                    avatar={
                        <Avatar
                            src="https://ava-grp-talk.zadn.vn/d/3/0/6/6/360/3178fa4759ad4515238c47d8e27f4cc4.jpg"
                            size={48}
                        />
                    }
                    title={
                        <div>
                            <span className="zl-item__title" style={{
                                fontWeight: 500
                            }}>
                                Dev Community
                            </span>
                        </div>
                    }
                    description={
                        <span className="zl-item__desc" style={{
                            color: '#333'
                        }}>Tony Do: ae git cái gì cũng để awesome </span>
                    }
                    
                    bordered={false}
                />
            }
            
        </>
    )
}

export default ChatComp