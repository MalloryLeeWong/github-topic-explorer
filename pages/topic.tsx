import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/topic.module.css';
import { useLazyGetGitHubTopicByName } from './queries/topic';
import debounce from 'lodash/debounce';

const ExploreTopic: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [search, { loading: lazyLoading, data: data }] =
    useLazyGetGitHubTopicByName();

  useEffect(() => {
    search({ variables: { name: 'react' } });
  }, []);

  const topic = data?.topic;
  const relatedtopics = topic?.relatedTopics;

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
        <div>
          <input
            type="search"
            id="search-input"
            name="search-input"
            placeholder="Enter a topic"
            onChange={handleInputChange}
            value={searchTerm}
          />
        </div>

        {topic?.name ? (
          <h2 className={styles.mainTopicHeader}>Topic: {topic?.name}</h2>
        ) : null}

        <h3>Related topics:</h3>
        {relatedtopics && relatedtopics.length > 0 ? (
          <ul className={styles.list}>
            {relatedtopics?.map((topic) => (
              <li key={topic?.id} className={styles.listItem}>
                {topic?.name ? (
                  <button
                    type="button"
                    name={topic?.name}
                    onClick={handleClickRelatedTopic}
                    value={topic?.name}
                  >
                    {topic.name}
                  </button>
                ) : null}
                {topic?.stargazers?.totalCount ? (
                  <div>stars: {topic?.stargazers?.totalCount}</div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ExploreTopic;
