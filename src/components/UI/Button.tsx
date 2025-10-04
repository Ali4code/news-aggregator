import Classes from "./Button.module.css";

export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className={Classes.general_btn} onClick={onClick}>
      {text}
    </button>
  );
};
