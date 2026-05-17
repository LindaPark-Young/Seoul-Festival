import type { Festival, FestivalResponse } from "../types/Festival";
import { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const [documents, setDocuments] = useState<Festival[]>([]);

  useEffect(() => {
    // if(!keyword) return;
    const fetchFestivals = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status} `);
        }

        const data: FestivalResponse = await response.json();
        const rawItems = data?.response?.body?.items?.item;
        const festivals = Array.isArray(rawItems)
          ? rawItems
          : rawItems
            ? [rawItems]
            : [];

        setDocuments(festivals);
      } catch (err) {
        console.error("검색중 오류", err);
      }
    };
    fetchFestivals();
  }, [url]);
  return { documents };
}
