import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.css'

import {withRouter} from 'react-router-dom';

class Directory extends React.Component {

    constructor () {

        super();

        this.state = {
            sections: [    
                {
                  title: 'hats',
                  imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
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
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    size: 'large',
                    id: 4,
                    linkUrl: 'shop/womens'
                },
                {
                    title: 'mens',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    id: 5,
                    size: 'large',  
                    linkUrl: 'shop/mens' 
                }
    
            ]

        };

    }


    render () {

        return (
            <div className="directory-menu">
                <div className="directory-menu"><a href="/shop">Preview Collections</a></div>
                <div className="directory-menu">
                    
                    {                
                        this.state.sections.map(
                            ({id, ...sectionProps}) => (
                                <MenuItem key={id} {...sectionProps}/>
                            )
                        )
                    }
                </div>
            </div>
             
            /*

            The "...sectionProps" notation above means that each value in the section objects 
            will be passed as parameters in the MenuItem coponent. It is equivalent to spilling
            out each name={value} pair as the code below:
            
            this.state.sections.map(
                ({title, imageUrl, id, size}) => (
                    <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
                )
            )


            The above code is a short way of listing name/value pairs in the collection,
            but cleaner since the function definition deconstructs the values 
            from the sections object and there is no need to prefix the 
            parameters (section.id, section.title, section.imageUrl) with 
            the section object instance variable.  

            this.state.sections.map( 
                section => (
                    <MenuItem key={section.id} title={section.title} imageUrl={section.imageUrl} />
                )
            )

           

            */
               
            
        )
    }
}

export default withRouter(Directory); 