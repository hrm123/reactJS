import React from 'react';
import '../App.css';

const TabBarItem = ({ border, title, selected, setType, type }) => {
    var liClasses = "tabbaritem ";
    liClasses = liClasses + ((type === title) ? 'selected ' : ''); 
    liClasses = liClasses + ((border) ? 'border ' : '');
   
    return (
        <div
            onClick={setType}
            className={liClasses}
        >
                {title}
        </div>
    );
};

export default TabBarItem;