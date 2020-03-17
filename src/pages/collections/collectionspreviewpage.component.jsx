import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionPreview from '../../components/collection-view/collection-preview.component';

class CollectionPreviewPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA
        }

        console.log("CollectionPreviewPage props=", props);
    }


    render() {

        return (
            
            <div className="shop-page">
               { 
                    this.state.collections.map(
                        ({id, ...collectionProps}) => (
                            <CollectionPreview key={id} count={4} viewAll={false} {...collectionProps} />
                        )
                    )
                }
            </div>
        );
    }


}

export default CollectionPreviewPage;