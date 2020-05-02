const INITIAL_STATE = {
    sections: [    
        {
            title: 'hats',
            imageUrl: 'https://i.ibb.co/KrKYrXv/hats.jpg',
            id: 1,
            linkUrl: 'shop/hats'
        },
        {
            title: 'jackets',
            imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            id: 2,
            linkUrl: 'shop/jackets'
        },
        {
            title: 'sneakers',
            imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            id: 3,
            linkUrl: 'shop/sneakers'
        },
        {
            title: 'womens',
            imageUrl: 'https://i.ibb.co/8b1mM45/woman-braids.jpg',
            size: 'large',
            id: 4,
            linkUrl: 'shop/womens'
        },
        {
            title: 'mens',
            imageUrl: 'https://i.ibb.co/ZWNMJqH/man-jacket.jpg',
            id: 5,
            size: 'large',  
            linkUrl: 'shop/mens' 
        }

    ]
    
};

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state; 
    }
}

export default directoryReducer;