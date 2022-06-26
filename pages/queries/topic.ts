import {
  gql,
  useQuery,
  QueryResult,
  OperationVariables,
  useLazyQuery,
  LazyQueryResult,
  LazyQueryResultTuple,
} from '@apollo/client';

export const GET_GITHUB_TOPIC_BY_NAME = gql`
  query ($name: String!) {
    topic(name: $name) {
      id
      name
      relatedTopics {
        id
        name
        stargazers {
          totalCount
        }
      }
      stargazerCount
    }
  }
`;

type GetGitHubTopicByNameParams = {
  name: string;
};

type RelatedTopic = {
  id: string;
  name: string;
  stargazers: {
    totalCount: number;
  };
};

type Topic = {
  id: string;
  name: string;
  relatedTopics: RelatedTopic[];
  stargazerCount: number;
};

type GetGitHubTopicByNamesResult = {
  topic: Topic;
};

export const useGetGitHubTopicByName = ({
  name,
}: GetGitHubTopicByNameParams): QueryResult<
  GetGitHubTopicByNamesResult,
  OperationVariables
> =>
  useQuery<GetGitHubTopicByNamesResult>(GET_GITHUB_TOPIC_BY_NAME, {
    variables: { name },
  });

export const useLazyGetGitHubTopicByName = (): LazyQueryResultTuple<
  GetGitHubTopicByNamesResult,
  OperationVariables
> => useLazyQuery<GetGitHubTopicByNamesResult>(GET_GITHUB_TOPIC_BY_NAME);
