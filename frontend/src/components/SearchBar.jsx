import { styled, alpha, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';

const SearchBar = ({ setUsers }) => {
  const searchRef = useRef(null);

  const fetchUser = async (searchedUser) => {
    const URL = 'http://localhost:8000/chatconnect/api/users';
    try {
      const res = await fetch(`${URL}?search=${searchedUser}`);
      const jsonRes = await res.json();
      console.log(jsonRes);
      return jsonRes.users;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event) => {
    if (event.key === 'Enter' && searchRef.current.value) {
      console.log(event);
      const users = await fetchUser(searchRef.current.value);
      setUsers(users);
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(grey[400], 0.8),
    '&:hover': {
      backgroundColor: alpha(grey[400], 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      height: '2rem',
      width: '100%',
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchRef}
        placeholder='Search…'
        onKeyDown={(event) => handleChange(event)}
      />
    </Search>
  );
};

export default SearchBar;
