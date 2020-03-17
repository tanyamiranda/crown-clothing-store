import React from 'react';

import SHOP_DATA from '../shop.data.js';

import CollectionFullView from '../../../components/collection-fullview/collection-fullview.component';

class CollectionFullViewPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA,
            collectionName : props.collectionName
        }
        console.log("CollectionFullViewPage props=", props)
        console.log("collectionName=", props.collectionName);
    }



    render() {

        const {collections, collectionName} = this.state;

        const filteredCollection = collections.filter( 
            collection => collection.title.toLowerCase().match(`^` + collectionName.toLowerCase() + `$`)
        );

        console.log("collectionName=", collectionName);
        console.log("filteredCollection", filteredCollection);

        return (
            
            <div className="shop-page">
               { 
                    filteredCollection.map(
                        ({id, ...collectionProps}) => (
                            <CollectionFullView key={id} {...collectionProps} />
                        )
                    )
                }
            </div>
        );
    }


}

export default CollectionFullViewPage;