import Classes from "./Button.module.css";

export const Button = ({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button className={Classes.general_btn} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};


