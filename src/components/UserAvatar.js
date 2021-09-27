import React from 'react';
import { ButtonBase, Avatar, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { Person, Logout, ArrowDropDown } from '@mui/icons-material';
import Menu from './Menu';

const ButtonComponent = ({ letter, onClick }) => (
  <ButtonBase onClick={onClick} disableRipple>
    <Avatar>{letter}</Avatar>
    <ArrowDropDown />
  </ButtonBase>
);

const UserAvatar = ({ userName, onLogout }) => {
  const [letter] = userName.split('');
  return (
    <Menu button={ButtonComponent} letter={letter}>
      <MenuItem disabled>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary={userName} />
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
};

export default UserAvatar;
