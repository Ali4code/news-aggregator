import { ButtonLink } from "@shared/ui/ButtonLink";
import Classes from "./ArticleCard.module.css";
import { TArticle } from "@entities/article";
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
