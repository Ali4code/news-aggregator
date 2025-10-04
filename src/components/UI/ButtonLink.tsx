import Classes from "./ButtonLink.module.css";

export const ButtonLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <a className={Classes.card_btn} href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
};
