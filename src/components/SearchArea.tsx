import { useState } from "react";
import "./SearchArea.css";
import FestivalList from "./FestivalList";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { ENV } from "../env";

type SearchAreaProps = {
  language: "kr" | "en";
};

export default function SearchArea({ language }: SearchAreaProps) {
  const [query, setQuery] = useState<string>(""); // 축제 이름 검색
  const [page, setPage] = useState<number>(1);

  const apiBaseUrl =
    language === "kr" ? ENV.OPEN_API_URL_KR : ENV.OPEN_API_URL_EN;

  //let url = ENV.OPEN_API_URL;
  let url = apiBaseUrl;
  if (query) {
    url += "/searchKeyword2?";
  } else {
    url += "/areaBasedList2?";
  }

  url += `serviceKey=${ENV.OPEN_API_KEY}&numOfRows=10&pageNo=${page}&_type=json&MobileOS=WEB&MobileApp=aa&lDongRegnCd=11&arrange=D`;

  if (query) {
    url += `&keyword=${encodeURIComponent(query)}`;
  } else {
    url += `&contentTypeId=15`;
  }
  const { documents } = useFetch(url);
  const resetPage = () => setPage(1);

  const onClickNext = () => setPage((p) => p + 1);
  const onClickPrev = () => setPage((p) => p - 1);

  const onChangeQuery = (q: string) => setQuery(q);

  return (
    <div className="search-area">
      <SearchBar onChangeQuery={onChangeQuery} resetPage={resetPage} />
      <FestivalList festivals={documents} />
      <Pagination
        page={page}
        handlePrev={onClickPrev}
        handleNext={onClickNext}
        isEnd={false}
      />
    </div>
  );
}
