import { TArticle } from "@entities/article";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeGuardianArticles = (results: any[]): TArticle[] => {
  return results?.map((res) => {
    return {
      id: res.webTitle,
      title: res.webTitle,
      content: res.fields?.trailText,
      image: res.fields?.thumbnail,
      date: res.fields?.firstPublicationDate,
      url: res.webUrl,
      source: res.fields?.publication,
    };
  });
};


