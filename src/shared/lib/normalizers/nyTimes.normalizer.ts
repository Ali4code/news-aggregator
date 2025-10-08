import { TArticle } from "@entities/article";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeNyTimesArticles = (docs: any[]): TArticle[] => {
  return docs?.map((doc) => {
    const image: string = doc.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${doc.multimedia?.[0]?.url}`
      : "";
    return {
      id: doc.headline?.main,
      title: doc.headline?.main,
      content: doc.abstract,
      image,
      date: doc.pub_date,
      url: doc.web_url,
      source: doc.source,
    };
  });
};


