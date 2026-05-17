# React 앱에서 축제 검색을 내부에서 처리하는 방법

이 튜토리얼은 현재 API가 검색어 필터를 지원하지 않을 때, 데이터를 한 번 불러와서 앱 내부에서 검색하도록 바꾸는 방법을 설명합니다.

## 1. 왜 이렇게 바꾸어야 하나요?

지금 쓰고 있는 API는 입력한 검색어를 직접 받아서 검색하는 기능이 없습니다.
그래서 앱이 `keyword=서울` 같은 요청을 보내도 API가 거부합니다.

이럴 때는 다음과 같이 합니다.

1. 처음에 축제 데이터를 한 번 모두 가져옵니다.
2. 가져온 데이터를 메모리에 저장합니다.
3. 사용자가 검색어를 입력하면 저장된 데이터를 화면에 보여줄 목록으로 걸러냅니다.

## 2. 전체 흐름

- `SearchBar`에서 사용자가 키워드를 입력합니다.
- 검색 버튼을 누르면 `SearchArea`에서 검색어 상태를 바꿉니다.
- `useFetch`는 한 번 데이터를 가져오고, 그 데이터를 `SearchArea`에 저장합니다.
- 검색어가 있으면 `SearchArea`가 저장된 데이터에서 검색어를 포함한 항목만 선택합니다.
- `FestivalList`는 선택된 항목만 화면에 보여줍니다.

## 3. 어떤 파일을 수정하나요?

- `src/components/SearchArea.tsx`
- `src/hooks/useFetch.ts`
- `src/components/SearchBar.tsx` (필요하면)

## 4. 단계별 수정 방법

### 4.1 `useFetch.ts`를 전체 목록을 가져오는 용도로 바꾸기

지금 `useFetch`는 검색어가 있을 때만 요청하는 구조입니다.
이제는 검색어가 없어도 데이터를 가져오도록 바꿔야 합니다.

예시:

```ts
const endPoint = `${url}&pageNo=${page}&numOfRows=10&serviceKey=${apiKey}`;
```

이렇게 하면 검색어를 붙이지 않고도 데이터를 가져옵니다.

### 4.2 `SearchArea.tsx`에서 전체 데이터를 저장하기

`SearchArea`에 새로운 상태를 만듭니다.

```ts
const [allFestivals, setAllFestivals] = useState<Festival[]>([]);
```

그리고 `useFetch` 호출 결과를 받아서 이 상태에 저장합니다.

### 4.3 검색어로 필터하기

검색어가 있을 때는 `title`에 검색어가 포함된 축제만 보여줍니다.

```ts
const filteredFestivals = query
  ? allFestivals.filter(festival =>
      festival.title.includes(query)
    )
  : allFestivals;
```

그리고 `FestivalList`에 `filteredFestivals`를 넘겨줍니다.

### 4.4 `SearchBar.tsx`에서 `onChange` 추가하기 (선택)

지금은 버튼을 눌렀을 때만 검색어가 반영됩니다.

```tsx
<input
  type="text"
  placeholder="검색어를 입력하세요."
  ref={inputRef}
  onChange={(e) => setInputValue(e.target.value)}
/>
```

이렇게 하면 입력할 때마다 상태를 바꿀 수도 있습니다.

## 5. 중요한 점

- API에서 무조건 전체 데이터를 가져오면 한 번에 많은 양이 나올 수 있습니다.
- 그래서 한 번에 가져오는 양(`numOfRows`)이나 페이지를 조절해야 합니다.
- 만약 데이터가 너무 많으면, 한 번에 모두 가져오는 대신 몇 페이지씩 가져와서 더 모으는 방법도 있습니다.

## 6. 예시 코드 요약

### `useFetch.ts`

- 데이터를 가져온다
- `keyword`를 요청에 붙이지 않는다
- 결과를 배열로 정리해서 반환한다

### `SearchArea.tsx`

- `query`, `page`, `allFestivals` 상태를 가진다
- `useFetch`로 데이터를 가져온 뒤 `setAllFestivals`로 저장한다
- `query`가 있으면 `allFestivals`를 걸러서 `FestivalList`에 전달한다

### `FestivalList.tsx`

- `festivals`를 받아서 목록을 보여준다
- 목록이 비어있을 때는 "검색 결과가 없습니다."를 보여줄 수 있다

## 7. 초등학생도 이해할 수 있는 비유

- 지금은 `도서관에 책을 찾으러 가서 사서에게 책 제목을 말하는` 방법을 쓰고 있었어요.
- 그런데 사서가 그 말을 못 알아들어서 아무것도 찾지 못했어요.
- 그래서 대신 `도서관에서 책을 모두 가져와서 내 방에서 하나씩 찾아보는` 방법으로 바꾸자는 거예요.

이렇게 하면 검색어가 실제로 동작하지 않는 API 문제를 피할 수 있습니다.

---

### 파일명
- 이 튜토리얼은 `LOCAL_SEARCH_TUTORIAL.md`로 저장됩니다.

### 다음 단계
1. `useFetch.ts`에서 검색어 없이 목록을 받아오도록 만들고
2. `SearchArea.tsx`에서 그 목록을 저장하고
3. 검색어가 있으면 저장된 목록을 내부에서 걸러서 보여주세요.
