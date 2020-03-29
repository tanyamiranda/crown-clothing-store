import React from 'react';
import {withRouter} from 'react-router-dom';
import './collection-view.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionFullView = ({title, items}) => (

    <div className="collection-view">
        <h1 className="title">{title.toUpperCase()} COLLECTION</h1>
        <div className="preview">
            {
                items.map(
                    (item) => (
                        <CollectionItem key={item.id} item={item}/>                    
                    )
                )
            }
        </div>

    </div>

);

export default withRouter(CollectionFullView);