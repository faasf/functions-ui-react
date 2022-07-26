import React from 'react';
import { Box, Button, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NavItem = (props: any) => {
  const { href, icon, title, isSidebarOpen, ...others } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        flex: 1,
        mb: 0.5,
        py: 0,
        px: isSidebarOpen ? 2 : 0
      }}
      {...others}
    >
      <NavLink
        to={href}
        style={{
          flex: 1,
          width: '100%'
        }}
      >
        {({ isActive }) => (
          <Button
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: isActive ? 'rgba(255,255,255, 0.08)' : null,
              borderRadius: 1,
              color: isActive ? 'secondary.main' : 'neutral.300',
              fontWeight: isActive ? 'fontWeightBold' : null,
              justifyContent: 'flex-start',
              px: 3,
              flex: 1,
              height: 42.5,
              textAlign: 'left',
              textTransform: 'none',
              width: '100%',
              '& .MuiButton-startIcon': {
                color: isActive ? 'secondary.main' : 'neutral.400'
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.08)'
              }
            }}
          >
            {isSidebarOpen ? (
              <Box sx={{ flexGrow: 1 }}>
                {title}
              </Box>
            ) : undefined}

          </Button>
        )}
      </NavLink>
    </ListItem>
  );
};
