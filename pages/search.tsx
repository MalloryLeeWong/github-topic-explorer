import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/search.module.css';
import { useGetGitHubTopicByName } from './queries/topic';

const ExploreTopic: NextPage = () => {
  const { data, error, loading } = useGetGitHubTopicByName({ name: 'react' });
  const topic = data?.topic;

  // TODO: handle errors and loading

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.pageContainer}>
        <h1 className={styles.pageHeader}>GitHub Topic Explorer</h1>
        <h2 className={styles.mainTopicHeader}>{`Topic: ${topic?.name}`}</h2>
        {/* TODO: Add search input */}
        {/* TODO: Add search results list */}
      </div>
    </div>
  );
};

export default ExploreTopic;
