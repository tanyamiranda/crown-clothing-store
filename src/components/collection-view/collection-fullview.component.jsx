import React from 'react';
import {withRouter} from 'react-router-dom';
import './collection-view.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionFullView = ({title, routeName, items, match, history}) => (

    <div className="collection-view">
        <h1 className="title">{title.toUpperCase()} COLLECTION</h1>
        <div className="preview">
            {
                items
                .map(
                    ({id, ...mapProps}) => (
                        <CollectionItem key={id} {...mapProps}/>                    
                    )
                )
            }
        </div>

    </div>

);

export default withRouter(CollectionFullView);