import React from 'react';
import styled from 'styled-components';
import { netflixActions } from '../store';
import { useDispatch } from 'react-redux';

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  const handleGenre = (event) => {
    const selectedGenreId = event.target.value;
    // console.log(selectedGenreId);
    dispatch(netflixActions.getSelectedGenre(selectedGenreId));
  };

  return (
    <Select onChange={handleGenre}>
      {genres.map((genre) => (
        <option value={genre._id} key={genre._id}>
          {genre._id}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;

export default SelectGenre;
