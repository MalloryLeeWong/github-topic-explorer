import { SearchTopicResultsList } from './index';
import TestRenderer, { act } from 'react-test-renderer';

const TEST_PROPS = {
  handleClickRelatedTopic: jest.fn(),
  isLoading: false,
  relatedTopics: [
    { id: '2', name: 'cheddar', stargazers: { totalCount: 10 } },
    { id: '3', name: 'pizza', stargazers: { totalCount: 20 } },
    { id: '4', name: 'delicious', stargazers: { totalCount: 30 } },
  ],
};

describe('SearchTopicResultsList', () => {
  const testRenderer = TestRenderer.create(
    <SearchTopicResultsList
      isLoading={TEST_PROPS.isLoading}
      relatedTopics={TEST_PROPS.relatedTopics}
      handleClickRelatedTopic={TEST_PROPS.handleClickRelatedTopic}
    />
  );
  const testInstance = testRenderer.root;

  it('returns a list if there are related topics provided', () => {
    const list = testInstance.findAllByType('ul');

    expect(list.length).toEqual(1);
  });

  it('returns a list with a list item for each related topic', () => {
    const testInstance = testRenderer.root;

    const listItem = testInstance.findAllByType('li');

    expect(listItem.length).toEqual(3);
  });
});
