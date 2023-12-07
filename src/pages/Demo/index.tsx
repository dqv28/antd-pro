import type { ProCardTabsProps } from '@ant-design/pro-components'
import { ProCard } from "@ant-design/pro-components"
import { Button } from "antd"
import { Input } from 'antd';
// import type { SearchProps } from '../Search';
import React, { useState } from "react"

import './index.css'
import ChatComp from './components/ChatComp';

const { Search } = Input;

const Demo: React.FC = () => {
    const [isHidden, setHidden] = useState(false)
    const [tab, setTab] = useState('tab1');
    const [tabPosition] = useState<ProCardTabsProps['tabPosition']>('top');

    return (
        
        <ProCard direction="row" bodyStyle={{ padding: '0', minHeight: '100vh' }}>
            <ProCard direction="row" colSpan={7} bodyStyle={{ padding: '0', minHeight: '100vh' }} bordered>
                <ProCard
                    colSpan={4}
                    bodyStyle={{ 
                        padding: '32px 0 24px', 
                        backgroundColor: '#0091ff',
                    }}

                >
                    <div className='zl-tabs'>
                        <div style={{
                            padding: '0 8px 24px'
                        }}>
                            <img 
                                className='zl-tabs__avatar'
                                src="https://s120-ava-talk.zadn.vn/d/0/b/b/1/120/5d93addd978b671bc667e34b6fe8dc8b.jpg" 
                                alt="avatar" 
                                title='Đỗ Vương'
                            />
                        </div>

                        <button className='zl-tabs__item zl-tabs__item--active'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                                <path fill='#fff' d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                            </svg>
                        </button>
                    </div>
                    
                </ProCard>
                <div className='zl-chat'>
                    <div className="zl-chat__action">
                        <Input 
                            placeholder="Tìm kiếm" 
                            className='zl-chat__search'
                            bordered={false}
                            prefix={
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </svg>
                            }
                            
                        />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                            </svg>
                        </button>
                    </div>
                    <ProCard
                        colSpan={20}
                        style={{
                            height: '32px'
                        }}
                        tabs={{
                            tabPosition,
                            activeKey: tab,
                            items: [
                                {
                                    label: `Tất cả`,
                                    key: 'tab1',
                                    children: <ChatComp children={true} />,
                                },
                                {
                                    label: `Chưa đọc`,
                                    key: 'tab2',
                                    children: <ChatComp children={false} />,
                                },
                            ],
                            onChange: (key) => {
                                setTab(key);
                            },
                        }}
                    />
                </div>
            </ProCard>
            <ProCard style={{ flex: '1' }} bordered>
                <Button 
                    type="primary"
                    onClick={() => setHidden(!isHidden)}
                >
                    Primary Button
                </Button>
            </ProCard>
            <ProCard colSpan={ isHidden ? 5 : 0} bordered>
                colSpan-6
            </ProCard>
        </ProCard>
    )
}

export default Demo