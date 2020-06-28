import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTIONS = gql`
    {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

//Query will give back the Query component, that gives back a function that will be a object
const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
       {({loading, data}) => {
            if(loading) return <Spinner />
            return <CollectionsOverview collections={data.collections} />
        }}
    </Query>
);

export default CollectionsOverviewContainer;
