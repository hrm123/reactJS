import React from 'react';
import TabBarItem from './TabBarItem';
import '../App.css';

const TabBar = ({ setType, type }) => (
    <div className="tabbarcontainer">
        <TabBarItem type={type} title='All'
        setType={() => setType('All')} />
        <TabBarItem type={type} title='Active'
        setType={() => setType('Active')} />
        <TabBarItem type={type} title='Complete'
        setType={() => setType('Complete')} />
    </div>
)


export default TabBar;