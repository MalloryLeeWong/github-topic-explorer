import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/topic.module.css';
import { useGetGitHubTopicByName } from './queries/topic';

const ExploreTopic: NextPage = () => {
  const [topic, setTopic] = useState('');

  // TODO: what if user enters zero as topic
  const { data, error, loading } = useGetGitHubTopicByName({
    name: topic || 'react',
  });

  const topicData = data?.topic;
  const relatedtopics = topicData?.relatedTopics;
  console.log('relatedTopics: ', topicData?.relatedTopics);
  console.log('data: ', data);
  // TODO: handle errors and loading

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // add debounce here or on api call?
    setTopic(e.target.value);
  };

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
        {topicData?.name ? (
          <h2 className={styles.mainTopicHeader}>Topic: {topicData?.name}</h2>
        ) : null}
        <div>
          <input
            type="search"
            id="search-input"
            name="search-input"
            placeholder="Enter a topic"
            onChange={handleInputChange}
            value={topic}
          />
        </div>
        <h3>Related topics:</h3>
        {relatedtopics && relatedtopics.length > 0 ? (
          <ul className={styles.list}>
            {relatedtopics?.map((topic) => (
              <li key={topic?.id} className={styles.listItem}>
                {topic?.name ? (
                  <div className={styles.topicName}>{topic?.name}</div>
                ) : null}
                {topic?.stargazers?.totalCount ? (
                  <div>stars: {topic?.stargazers?.totalCount}</div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ExploreTopic;
