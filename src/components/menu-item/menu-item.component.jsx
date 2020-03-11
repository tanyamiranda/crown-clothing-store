import React from 'react';

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size}) => (

    <div className={`${size} menu-item`} >
        
        {/* Created separate div to control hover zoom action without affecting content zoom*/}
        <div className="background-image" 
            style={{
                backgroundImage: `url( ${imageUrl})` 
            }}
        />
        
        <div className="content">
            <h1 className="title">{title}</h1>
            <span className="subtitle">shop now</span>
        </div>  
    </div>

);

export default MenuItem;