import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AvatarMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        variant="rounded"
        width="64px"
        sx={{ width: 64, height: 64 }}
        src={user.profileImg}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      ></Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="bg-catGrey" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem className="bg-catGrey" onClick={handleClose}>
          Search
        </MenuItem>
        <MenuItem className="bg-catGrey" onClick={handleClose}>
          Settings
        </MenuItem>
        <MenuItem className="bg-catGrey" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
