import { IFilters } from "../../interfaces/IFilters";

interface Props {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  pageCount: number;
}

export default function Pagination({ filters, setFilters, pageCount }: Props) {
  const setPages = () => {
    if (pageCount > 1) {
      const pageElements = [];
      for (let i = 1; i <= pageCount; i++) {
        pageElements.push(
          <li
            key={i}
            style={{
              cursor: "pointer",
              color: i === filters.page ? "#f00" : undefined,
            }}
            value={i}
            onClick={handlePageClick}
          >
            {i}
          </li>
        );
      }
      return pageElements;
    }
  };
  const handlePageClick = (e: any) => {
    setFilters({ ...filters, page: e.target.value });
  };
  if (filters.pageCount === 1) return <></>;
  else {
    return (
      <>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "space-evenly",
            width: "300px",
            margin: "2em auto",
          }}
        >
          {setPages()}
        </ul>
      </>
    );
  }
}
