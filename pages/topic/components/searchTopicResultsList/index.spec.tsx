import { SearchTopicResultsList } from './index';
import TestRenderer from 'react-test-renderer';

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
  it('returns a list', () => {
    const testRenderer = TestRenderer.create(
      <SearchTopicResultsList
        isLoading={TEST_PROPS.isLoading}
        relatedTopics={TEST_PROPS.relatedTopics}
        handleClickRelatedTopic={TEST_PROPS.handleClickRelatedTopic}
      />
    );

    const testInstance = testRenderer.root;

    const elementList = testInstance.findAllByType('li');
    expect(elementList.length).toEqual(3);
  });
});
