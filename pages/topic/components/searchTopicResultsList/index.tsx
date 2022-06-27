import React from 'react';
import { RelatedTopic } from '../../../../queries/topic';
import styles from './index.module.css';
import Image from 'next/image';

type SearchResultsListProps = {
  handleClickRelatedTopic: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  relatedTopics: RelatedTopic[];
};

export const SearchTopicResultsList: React.FC<SearchResultsListProps> = ({
  handleClickRelatedTopic,
  isLoading,
  relatedTopics,
}) => {
  if (isLoading) return <p>Loading...</p>;

  if (!isLoading && relatedTopics.length === 0) return <p>No results found</p>;

  return (
    <>
      <ul className={styles.list}>
        {relatedTopics?.map((topic) => (
          <li key={topic?.id} className={styles.listItem}>
            {topic?.name ? (
              <button
                type="button"
                name={topic?.name}
                onClick={handleClickRelatedTopic}
                value={topic?.name}
                className={styles.button}
              >
                {topic.name}
              </button>
            ) : null}
            {topic?.stargazers?.totalCount ? (
              <div className={styles.starsContainer}>
                <Image
                  src="/star-icon.png"
                  alt="star-icon"
                  width="20px"
                  height="20px"
                />
                <div
                  className={styles.stargazersCount}
                  id="related-topic-stargazers-count"
                >
                  {topic?.stargazers?.totalCount?.toLocaleString('en-US')}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
};
