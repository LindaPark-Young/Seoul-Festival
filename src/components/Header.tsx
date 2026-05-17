import "./Header.css";

type HeaderProps = {
  language: "kr" | "en";
  onToggleLanguage: () => void;
};

function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="header">
      <h1> Seoul Festival</h1>
      <button className="button" type="button" onClick={onToggleLanguage}>
        {language === "kr" ? "English" : "한국어"}
      </button>
    </header>
  );
}
export default Header;
