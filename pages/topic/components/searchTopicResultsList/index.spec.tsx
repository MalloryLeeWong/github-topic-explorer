import { SearchTopicResultsList } from './index';
import TestRenderer from 'react-test-renderer';

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

/* TODO: address warning recommending using react-test-renderer act method
 * https://reactjs.org/docs/test-renderer.html#testrendereract
 */

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

  describe('if there are more than zero related topics', () => {
    it('lists all related topics', () => {
      const list = testInstanceDefault.findAllByType('ul');
      expect(list.length).toEqual(1);
    });

    it('shows the name of each related topic', () => {
      const listItems = testInstanceDefault.findAllByType('li');
      expect(listItems.length).toEqual(3);

      const buttons = testInstanceDefault.findAllByType('button');

      expect(buttons[0].children[0]).toEqual('cheddar');
      expect(buttons[1].children[0]).toEqual('pizza');
      expect(buttons[2].children[0]).toEqual('delicious');
    });

    it('shows the stargazers count for each related topic', () => {
      const stargazerCountElements = testInstanceDefault.findAllByProps({
        id: 'related-topic-stargazers-count',
      });

      expect(stargazerCountElements.length).toEqual(3);
      expect(stargazerCountElements[0].children[0]).toEqual('10');
      expect(stargazerCountElements[1].children[0]).toEqual('20');
      expect(stargazerCountElements[2].children[0]).toEqual('30');
    });
  });

  describe('if there are zero related topics', () => {
    it('does not show any related topics', () => {
      const list = testInstanceWithEmptyRelatedTopics.findAllByType('ul');
      expect(list.length).toEqual(0);
    });
  });
});
