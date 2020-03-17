import React from 'react';
import {withRouter} from 'react-router-dom';
import './collection-fullview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionFullView = ({title, routeName, items, match, history}) => (

    <div className="collection-fullview">
        <h1 className="title">OUR {title.toUpperCase()} COLLECTION</h1>
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