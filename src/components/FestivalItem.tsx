import { useContext } from "react";
import type { Festival } from "../types/Festival";
import FestivalContext from "../contexts/FestivalContext";

interface FestivalItemProps {
  festival: Festival;
}
export default function FestivalItem({ festival }: FestivalItemProps) {
  const context = useContext(FestivalContext);
  if (!context) throw new Error("Context가 없습니다.");
  const { selectFestival } = context;

  return (
    <div className="festival-item" onClick={() => selectFestival(festival)}>
      <img src={festival.firstimage} alt={`${festival.title}의 표지`} />
      <div className="festival-info">
        <h3>{festival.title}</h3>
        <p>{festival.addr1}</p>
      </div>
    </div>
  );
}
