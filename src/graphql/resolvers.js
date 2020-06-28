import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemsCount } from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden : Boolean!
        AddItemToCart(item: Item!) : [Item]!
    }
`;

// @client anything looking for cartHidden is looking in localstorage not backend
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

// pull cart items from client
const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }, _info) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

        cache.writeQuery({
            query: GET_CART_HIDDEN,
            data: { cartHidden : !cartHidden }
        });

        return !cartHidden;
        },

        addItemToCart : (_root, { item }, { cache}) =>{
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            //WILL GIVE US BACK AN ARRAY!
            const newCartItems = addItemToCart(cartItems, item);

            //Update item count query
            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount: getCartItemsCount(newCartItems)}
            })

            //Salva os novos items no cart
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {cartItems : newCartItems }
            });

            //Make sure to return the new values
            return newCartItems;
        }
    }
}