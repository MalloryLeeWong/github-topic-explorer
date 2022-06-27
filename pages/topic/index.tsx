import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useLazyGetGitHubTopicByName } from '../../queries/topic';
import debounce from 'lodash/debounce';
import { SearchTopicResultsList } from './components/searchTopicResultsList';

const ExploreTopic: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [search, { loading, data: data }] = useLazyGetGitHubTopicByName();

  useEffect(() => {
    // Be default display topics related to react
    search({ variables: { name: 'react' } });
  }, []);

  const topic = data?.topic;
  const relatedTopics = topic?.relatedTopics;

  // TODO: handle errors and loading

  const debouncer = useCallback(debounce(search, 500), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncer({ variables: { name: e.target.value || 'react' } });
  };

  const handleClickRelatedTopic = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      debouncer({ variables: { name: e.currentTarget.value } });
    },
    []
  );

  // TODO: refactor and move input, list into own components
  return (
    <div className={styles.container}>
      <Head>
        <title>Github Topic Explorer</title>
        <meta name="Github Topic Explorer" content="Github Topic Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        <h1 className={styles.pageHeader}>GitHub Topic Explorer</h1>
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Enter a topic"
          onChange={handleInputChange}
          value={searchTerm}
          className={styles.input}
        />

        {topic?.name ? (
          <h2 className={styles.mainTopicHeader}>Topic: {topic?.name}</h2>
        ) : null}

        <h3 className={styles.relatedTopicsHeader}>Related topics:</h3>
        <SearchTopicResultsList
          relatedTopics={relatedTopics || []}
          handleClickRelatedTopic={handleClickRelatedTopic}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ExploreTopic;
