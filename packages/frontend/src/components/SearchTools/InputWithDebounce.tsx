import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import {
  setFavoritesQuerySearch,
  setQuerySearch,
} from "../../store/filtersSlice";

interface InputWithDebounceProps {
  type: string;
}

const InputWithDebounce: React.FC<InputWithDebounceProps> = ({ type }) => {
  const dispatch = useDispatch();
  const [q, setQ] = useState<string>("");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQ(value);
    },
    []
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (type === "featured") {
        dispatch(setQuerySearch(q));
      } else {
        dispatch(setFavoritesQuerySearch(q));
      }
    }, 800);

    return () => clearTimeout(debounceTimeout);
  }, [q, dispatch, type]);

  return (
    <Form.Control
      className="me-auto"
      placeholder="Pesquisar por título..."
      value={q}
      onChange={handleInputChange}
    />
  );
};

export default InputWithDebounce;
