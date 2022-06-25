import { gql, useQuery } from '@apollo/client';

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

type UseGetGithubTopicByNameParams = {
  name: string;
};

export const useGetGitHubTopicByName = ({
  name,
}: UseGetGithubTopicByNameParams) =>
  useQuery(GET_GITHUB_TOPIC_BY_NAME, {
    variables: { name },
  });
