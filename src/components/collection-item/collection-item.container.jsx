import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionItem from './collection-item.component';


// pass the item getting it in client directory 
const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`;


//Variables: { item }, passing dinamicly
const CollectionItemContainer = (props) => (
    <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            addItemToCart => (<CollectionItem {...props} addItem ={  item => addItemToCart({variables: {item} }) } />)
        }
    </Mutation>
);

export default CollectionItemContainer;

