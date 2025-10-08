import { TArticle } from "@entities/article";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeNewsApiArticles = (articles: any[]): TArticle[] => {
  return articles?.map((article) => {
    return {
      id: article.title,
      title: article.title,
      content: article.description,
      image: article.urlToImage,
      date: article.publishedAt,
      url: article.url,
      source: article.source?.name,
    };
  });
};


