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

/* TODO: finish addressing warning recommending using react-test-renderer act method
 * https://reactjs.org/docs/test-renderer.html#testrendereract
 */

describe('ExploreTopicPage', () => {
  const testRenderer = TestRenderer.create(<ExploreTopicPage />);
  const testInstance = testRenderer.root;

  it('allows a user to input text into a search input field', () => {
    const searchInput = testInstance.findByType('input');

    expect(searchInput).toBeDefined();
    expect(searchInput.props.value).toEqual('');

    const mockChangeEvent = { target: { value: 'cheese' } };
    TestRenderer.act(() => {
      searchInput.props.onChange(mockChangeEvent);
    });

    expect(searchInput.props.value).toEqual('cheese');
  });

  it('shows a list if there are related topics for a topic', () => {
    const list = testInstance.findAllByType('ul');
    expect(list.length).toEqual(1);
  });

  it('shows a list with a list item for each related topic', () => {
    const listItems = testInstance.findAllByType('li');
    expect(listItems.length).toEqual(3);
    expect(listItems[0])
  });
});
