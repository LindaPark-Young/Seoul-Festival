import "./FestivalList.css";
import type { Festival } from "../types/Festival";
import FestivalItem from "./FestivalItem";

interface FestivalListProps {
  festivals: Festival[];
}

export default function FestivalList({ festivals }: FestivalListProps) {
  if (festivals.length === 0) {
    return <div className="festival-list">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="festival-list">
      {festivals.map((festival) => (
        <FestivalItem key={festival.contentid} festival={festival} />
      ))}
    </div>
  );
}
