import React from 'react';
import {withRouter} from 'react-router-dom';
import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({count, title, routeName, items, match, history}) => (

    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}
        <span className="viewAllLink" onClick={() => history.push(`${match.url}/${routeName}`)}>view all</span> 
        </h1>
        <div className="preview">
            {
                items
                .filter( (item,index) => index < count)
                .map(
                    ({id, ...mapProps}) => (
                        <CollectionItem key={id} {...mapProps}/>

                    //item => (
                    //<div key={item.id}>{item.name}</div>
                    
                    )
                )
            }
        </div>

    </div>

);

export default withRouter(CollectionPreview);