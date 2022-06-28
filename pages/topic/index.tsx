import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useLazyGetGitHubTopicByName } from '../../queries/topic';
import debounce from 'lodash/debounce';
import { SearchTopicResultsList } from './components/searchTopicResultsList';

const ExploreTopicPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clearSearch, setClearSearch] = useState(false);

  const [search, { loading, data, error }] = useLazyGetGitHubTopicByName();

  useEffect(() => {
    // Be default display topics related to react
    search({ variables: { name: 'react' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      alert('Error occured. Please try again later.');
    }
  }, [error]);

  const topic = data?.topic;
  const relatedTopics = topic?.relatedTopics;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncer = useCallback(debounce(search, 500), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClearSearch(false);
    setSearchTerm(e.target.value);
    debouncer({ variables: { name: e.target.value || 'react' } });
  };

  const handleClickRelatedTopic = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setClearSearch(true);
      debouncer({ variables: { name: e.currentTarget.value } });
    },
    [debouncer]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Topic Explorer</title>
        <meta name="Github Topic Explorer" content="Github Topic Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        <h1 className={styles.pageHeader}>GitHub Topic Explorer</h1>
        <label htmlFor="search" className={styles.inputLabel}>
          Search:
        </label>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search for a GitHub topic"
          aria-label="Search for a GitHub topic"
          onChange={handleInputChange}
          value={clearSearch ? '' : searchTerm}
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

export default ExploreTopicPage;
