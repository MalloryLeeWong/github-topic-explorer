import { SearchTopicResultsList } from './index';
import TestRenderer, { act } from 'react-test-renderer';

const DEFAULT_PROPS = {
  handleClickRelatedTopic: jest.fn(),
  isLoading: false,
  relatedTopics: [
    { id: '2', name: 'cheddar', stargazers: { totalCount: 10 } },
    { id: '3', name: 'pizza', stargazers: { totalCount: 20 } },
    { id: '4', name: 'delicious', stargazers: { totalCount: 30 } },
  ],
};

const PROPS_WITH_EMPTY_RELATED_TOPICS = {
  ...DEFAULT_PROPS,
  relatedTopics: [],
};

describe('SearchTopicResultsList', () => {
  const testRendererDefault = TestRenderer.create(
    <SearchTopicResultsList
      isLoading={DEFAULT_PROPS.isLoading}
      relatedTopics={DEFAULT_PROPS.relatedTopics}
      handleClickRelatedTopic={DEFAULT_PROPS.handleClickRelatedTopic}
    />
  );
  const testInstanceDefault = testRendererDefault.root;

  const testRendererWithEmptyRelatedTopics = TestRenderer.create(
    <SearchTopicResultsList
      isLoading={PROPS_WITH_EMPTY_RELATED_TOPICS.isLoading}
      relatedTopics={PROPS_WITH_EMPTY_RELATED_TOPICS.relatedTopics}
      handleClickRelatedTopic={
        PROPS_WITH_EMPTY_RELATED_TOPICS.handleClickRelatedTopic
      }
    />
  );
  const testInstanceWithEmptyRelatedTopics =
    testRendererWithEmptyRelatedTopics.root;

  it('returns a list if there are related topics provided', () => {
    const list = testInstanceDefault.findAllByType('ul');
    expect(list.length).toEqual(1);
  });

  it('returns a list with a list item for each related topic', () => {
    const listItem = testInstanceDefault.findAllByType('li');
    expect(listItem.length).toEqual(3);
  });

  it('does not return a list if length of relatedTopics is zero', () => {
    const list = testInstanceWithEmptyRelatedTopics.findAllByType('ul');
    expect(list.length).toEqual(0);
  });
});
