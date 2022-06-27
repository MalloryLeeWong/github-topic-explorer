import ExploreTopicPage from './index';
import TestRenderer from 'react-test-renderer';

const MOCK_TOPIC_DATA_DEFAULT = {
  topic: {
    id: 1,
    name: 'cheese',
    relatedTopics: [
      { id: '2', name: 'cheddar', stargazers: { totalCount: 10 } },
      { id: '3', name: 'pizza', stargazers: { totalCount: 20 } },
      { id: '4', name: 'delicious', stargazers: { totalCount: 30 } },
    ],
    stargazerCount: 100,
  },
};

const MOCK_TOPIC_DATA_SEARCH_RESULT = {
  topic: {
    id: 1,
    name: 'cheese',
    relatedTopics: [
      { id: '2', name: 'cheddar', stargazers: { totalCount: 10 } },
      { id: '3', name: 'pizza', stargazers: { totalCount: 20 } },
      { id: '4', name: 'delicious', stargazers: { totalCount: 30 } },
    ],
    stargazerCount: 100,
  },
};

const mockSearch = () => MOCK_TOPIC_DATA_SEARCH_RESULT;

jest.mock('../../queries/topic/index.ts', () => ({
  useLazyGetGitHubTopicByName: () => {
    return [mockSearch, { loading: false, data: MOCK_TOPIC_DATA_DEFAULT }];
  },
}));

describe('ExploreTopicPage', () => {
  const testRenderer = TestRenderer.create(<ExploreTopicPage />);
  const testInstance = testRenderer.root;

  it('user can enter text into an input to search for a topic', () => {
    const list = testInstance.findAllByType('input');
    expect(list.length).toEqual(1);
  });

  it('returns a list if there are related topics for a topic', () => {
    const list = testInstance.findAllByType('ul');
    expect(list.length).toEqual(1);
  });

  it('returns a list with a list item for each related topic', () => {
    const listItem = testInstance.findAllByType('li');
    expect(listItem.length).toEqual(3);
  });
});
