import { styled, alpha, InputBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(grey[200], 0.8),
    '&:hover': {
      backgroundColor: alpha(grey[200], 1),
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
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchBar;
