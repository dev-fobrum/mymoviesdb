import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  DropdownButton,
  Dropdown,
  Stack,
  Button,
  Form,
} from "react-bootstrap";
import { FaFilter, FaSearch, FaTrash } from "react-icons/fa";

import {
  setQuerySearch,
  setOrdering,
  clearFilters,
  setFavoritesQuerySearch,
  setFavoritesOrdering,
  clearFavoritesFilters,
} from "../../store/filtersSlice";
import InputWithDebounce from "./InputWithDebounce";

interface SearchToolsProps {
  type: string;
}

const SearchTools: FC<SearchToolsProps> = ({ type }) => {
  const dispatch = useDispatch();

  const { q, ordering } = useSelector((state: any) =>
    type === "featured"
      ? state.filters.featuredFilters
      : state.filters.favoritesFilters
  );

  const handleOrdenationChange = (e: string | null) => {
    if (!e) return;

    type === "featured"
      ? dispatch(setOrdering(e))
      : dispatch(setFavoritesOrdering(e));
  };

  const handleClearFilters = () => {
    type === "featured"
      ? dispatch(clearFilters())
      : dispatch(clearFavoritesFilters());
  };

  return (
    <Container className="mt-3">
      <Stack direction="horizontal" gap={3}>
        <InputWithDebounce type={type} />
        {/* <Form.Control
          className="me-auto"
          placeholder="Pesquisar por título..."
          value={q}
          onChange={(e) =>
            type === "featured"
              ? dispatch(setQuerySearch(e.target.value))
              : dispatch(setFavoritesQuerySearch(e.target.value))
          }
        /> */}
        {/* <Button
          variant="secondary"
          className="theme-btn"
          onClick={handleSearch}
        >
          <div className="d-flex gap-1">
            <span>Pesquisar</span>
            <span style={{ position: "relative", bottom: 2 }}>
              <FaSearch />
            </span>
          </div>
        </Button> */}
        <DropdownButton
          id="filter-btn"
          className="filter-btn"
          title={
            <div className="d-flex gap-1">
              <span>{ordering}</span>
              <span style={{ position: "relative", bottom: 1 }}>
                <FaFilter />
              </span>
            </div>
          }
          onSelect={(eventKey) => handleOrdenationChange(eventKey)}
        >
          <Dropdown.Item eventKey="Popularidade">Popularidade</Dropdown.Item>
          <Dropdown.Item eventKey="Data de Lançamento">
            Data de Lançamento
          </Dropdown.Item>
          <Dropdown.Item eventKey="Título (A-Z)">Título (A-Z)</Dropdown.Item>
          <Dropdown.Item eventKey="Título (Z-A)">Título (Z-A)</Dropdown.Item>
        </DropdownButton>
        <Button
          variant="secondary"
          className="theme-btn"
          onClick={handleClearFilters}
        >
          <div className="d-flex gap-1 ">
            <span>Limpar</span>
            <span style={{ position: "relative", bottom: 2 }}>
              <FaTrash />
            </span>
          </div>
        </Button>
      </Stack>
    </Container>
  );
};

export default SearchTools;
