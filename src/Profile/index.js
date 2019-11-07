import React from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';
import { Query } from 'react-apollo';

import RepositoryList , { REPOSITORY_FRAGMENT  } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

// query to get repositories with pageInfo for pagination
const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query ($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

// It uses React render props pattern, query result in children component
const Profile = () => (
  <Query 
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      const { viewer } = data;

      // only show loading indicator on initial request only
      if (loading && !viewer) {
        return <Loading />;
      }
      return (
        <RepositoryList 
          loading={loading}
          repositories={viewer.repositories} 
          fetchMore={fetchMore}
          entry={'viewer'}
        />
      );
    }}
  </Query>
);
export default Profile;



