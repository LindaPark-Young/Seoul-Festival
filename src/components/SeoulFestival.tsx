import { useState } from "react";
import type { Festival } from "../types/Festival";
import FestivalContext from "../contexts/FestivalContext";
import Header from "./Header";
import Footer from "./Footer";
import FestivalDetail from "./FestivalDetail";
import "./SeoulFestival.css";

import SearchArea from "./SearchArea";

export default function SeoulFestival() {
  const [selected, setSelected] = useState<Festival | null>(null);
  const [language, setLanguage] = useState<"kr" | "en">("kr");
  const selectFestival = (festival: Festival) => {
    setSelected(festival);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "kr" ? "en" : "kr"));
  };

  return (
    <FestivalContext.Provider value={{ selectFestival }}>
      <div className="SeoulFestival">
        <Header language={language} onToggleLanguage={toggleLanguage} />
        <div className="main-content">
          <SearchArea language={language} />
          <FestivalDetail festival={selected} />
        </div>
        <Footer />
      </div>
    </FestivalContext.Provider>
  );
}
