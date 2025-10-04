import { ButtonLink } from "../UI/ButtonLink";
import Classes from "./ArticleCard.module.css";

export type TArticle = {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  url: string;
  source: string;
};
export const ArticleCard = ({ article }: { article: TArticle }) => {
  return (
    <div className={Classes.article_card_container}>
      <img
        className={Classes.article_image}
        src={
          article?.image ?? "https://placehold.co/500/white/111?text=No+Image"
        }
        alt={article?.title}
      />
      <div className={Classes.article_content}>
        <p className={Classes.primary_text}>{article?.title}</p>
        {article?.content && (
          <p dangerouslySetInnerHTML={{ __html: article?.content }} />
        )}
        <p>
          Source: <strong>{article?.source}</strong>
        </p>
        <ButtonLink text="Read more" href={article.url} />
      </div>
    </div>
  );
};
