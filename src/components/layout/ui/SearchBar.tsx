import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styleFont } from 'src/styles/styleFont';
import { COLORS } from 'src/styles/styleConstants';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchPrams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    if (searchPrams.get('s') === searchTerm) return;
    navigate(`/search/?s=${searchTerm}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.InputSearch
      type="text"
      placeholder="물건을 검색해보세요"
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default SearchBar;

const S = {
  InputSearch: styled.input`
    ${styleFont.body1}
    padding: 0.7rem 1.2rem;
    background-color: ${COLORS.GRAY[200]};
    border-radius: 0.5rem;
    border: none;
  `
};
