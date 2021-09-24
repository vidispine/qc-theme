import React from 'react';
import { Paper, Box, Button, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { withStyles } from '@mui/styles';

const SearchActions = ({ onClear, canClear }) => {
  return (
    <Box display="flex" alignItems="center" height={1}>
      {canClear && (
        <IconButton size="small" disableRipple onClick={onClear}>
          <CloseIcon />
        </IconButton>
      )}
      <Button
        style={{ height: '100%', borderRadius: 0 }}
        type="submit"
        color="primary"
        variant="contained"
        disableRipple
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

const SearchInput = ({ onSubmit, onChange, value, defaultValue, searchPlaceholder, classes }) => {
  const inputRef = React.useRef(null);
  const [canClear, setCanClear] = React.useState(Boolean(defaultValue));

  const handleOnChange = (val) => {
    onChange(val);
    setCanClear(inputRef.current.value.length > 0);
  };

  const setInput = (val) => {
    if (val === undefined) inputRef.current.value = val;
    handleOnChange(val);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputRef && inputRef.current) inputRef.current.blur();
    const { value: currValue } = inputRef.current || '';
    onSubmit(currValue);
    if (currValue) setCanClear(true);
  };
  const onClear = () => {
    setCanClear(false);
    onSubmit('');
    setInput('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputBase
        fullWidth
        value={value}
        classes={classes}
        defaultValue={defaultValue}
        placeholder={searchPlaceholder}
        inputRef={inputRef}
        onChange={(e) => handleOnChange(e.target.value)}
        endAdornment={<SearchActions onClear={onClear} canClear={canClear} />}
      />
    </form>
  );
};

export const styles = ({ spacing, palette, transitions }) => ({
  root: {
    height: spacing(6),
    paddingLeft: spacing(2),
    borderColor: palette.primary.main,
    borderRadius: spacing(0.5),
    backgroundColor: palette.background.paper,
    transition: transitions.create(['box-shadow']),
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  focused: {
    boxShadow: `inset 0 0 0 2px ${palette.primary.main}`,
  },
});

const Search = ({
  value,
  onSubmit = () => null,
  onChange,
  classes,
  placeholder = 'Search files...',
}) => (
  <Paper>
    <SearchInput
      value={value}
      classes={classes}
      onChange={onChange}
      onSubmit={onSubmit}
      searchPlaceholder={placeholder}
    />
  </Paper>
);

export default withStyles(styles)(Search);
