import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Alert from '../molecules/Alert';

const GET_GIST = gql`
  query Subjects($name: String!) {
    viewer {
      gist(name: $name) {
        files {
          text
        }
      }
    }
  }
`;

interface Props {
  id: string | undefined;
  onLoading?: any;
  onSuccess?: (data: any) => void;
  onError?: any;
  onEmpty?: any;
  children: (data: any) => React.ReactNode;
}

const GistContainer: React.FC<Props> = ({
  id,
  onLoading,
  onSuccess,
  onError,
  onEmpty,
  children
}) => {
  const { loading, error, data } = useQuery(GET_GIST, {
    variables: {
      name: id
    }
  });

  if (loading) return onLoading ? onLoading : <p>Loading...</p>;
  if (error)
    return onError ? (
      onError
    ) : (
      <Alert type="error">Network error: Failed to fetch</Alert>
    );

  if (!data.viewer.gist)
    return onEmpty ? onEmpty : <Alert>Nothing here...</Alert>;

  const result = JSON.parse(data.viewer.gist.files[0].text);
  if (onSuccess) onSuccess(result);
  return children(result);
};

export default GistContainer;
