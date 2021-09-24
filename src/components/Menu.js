import React from 'react';
import { MoreVert as MenuIcon } from '@mui/icons-material';
import { Menu, IconButton } from '@mui/material';

export default ({ icon: IconComponent = MenuIcon, children, size }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuClick} disableRipple size={size}>
        <IconComponent />
      </IconButton>
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
