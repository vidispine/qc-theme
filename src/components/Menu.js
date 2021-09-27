/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MoreVert as MenuIcon } from '@mui/icons-material';
import { Menu, IconButton } from '@mui/material';

export default ({
  icon: IconComponent = MenuIcon,
  button: ButtonComponent = IconButton,
  children,
  size,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonComponent onClick={handleMenuClick} disableRipple size={size} {...rest}>
        <IconComponent />
      </ButtonComponent>
      <Menu
        onClick={handleMenuClose}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        elevation={1}
        PaperProps={{ square: true }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Menu>
    </>
  );
};
