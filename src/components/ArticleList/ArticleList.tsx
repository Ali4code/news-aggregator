import { ArticleCard } from "../ArticleCard/ArticleCard";
import { TArticle } from "@entities/article";
import { ArticleCardSkeleton } from "../ArticleCard/ArticleCard.skeleton";
import Classes from "./ArticleList.module.css";

export const ArticleList = ({
  isLoading,
  articles,
}: {
  isLoading: boolean;
  articles?: TArticle[];
}) => {
  if (!isLoading && (!articles || articles?.length === 0)) {
    return (
      <div className={Classes.news_feed_container}>
        Sorry nothing to show please check your filters or api keys for errors
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={Classes.news_feed_container}>
        {Array.from({ length: 15 }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={Classes.news_feed_container}>
      {articles?.map((article) => (
        //fix here
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
