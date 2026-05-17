import "./FestivalDetail.css";
import type { Festival } from "../types/Festival";

const formatKoreanDate = (dateString: string) => {
  const match = dateString.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!match) return dateString;
  const year = match[1];
  const month = String(Number(match[2]));
  const day = String(Number(match[3]));
  return `${year}년${month}월${day}일`;
};

interface FestivalDetailProps {
  festival: Festival | null;
}

export default function FestivalDetail({ festival }: FestivalDetailProps) {
  if (!festival) {
    return <div> 축제를 선택하세요</div>;
  }

  // const mapUrl = `https://map.kakao.com/search/${encodeURIComponent(
  //   festival.addr1,
  // )}`;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(festival.addr1)}`;
  return (
    <div className="festival-detail">
      <h2>{festival.title}</h2>
      <a href={festival.firstimage} target="_blank">
        <img src={festival.firstimage} alt={`${festival.title}의 표지`} />
        {/* <img src={festival.firstimage2} alt={`${festival.title}의 표지`} /> */}
      </a>
      <p>
        <strong>Festival Detail:</strong>
        {festival.addr2}
      </p>

      <p>
        <strong>Address:</strong>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          {festival.addr1} ⬅️ Click the address(지도에서 보기)
        </a>
      </p>

      <p>
        <strong>Tel:</strong>
        {festival.tel}
      </p>

      <p>
        <strong>Create Date:</strong>
        {formatKoreanDate(festival.createdtime)}
      </p>

      {/* <p>
        <strong>Modified Date:</strong>
        {festival.modifiedtime}
      </p> */}

      {/* <p>
        <strong>상세내용:</strong>
        <a href={festival.firstimage} target="_blank">
          <img src={festival.firstimage} alt={`${festival.title}의 표지`} />
        </a>
      </p> */}
    </div>
  );
}
