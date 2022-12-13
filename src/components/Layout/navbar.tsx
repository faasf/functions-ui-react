import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../../icons/bell';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import {useOidc} from "@axa-fr/react-oidc";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: (theme as any).palette.background.paper,
  boxShadow: (theme as any).shadows[3]
}));

export const Navbar = (props : any) => {
  const { isSidebarOpen, onSidebarOpen, ...other } = props;
  const { logout} = useOidc();

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 64
          },
          width: {
            lg: 'calc(100% - 64px)' 
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: isSidebarOpen ? 'none' : undefined
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip> */}
          {/* <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
          <Button onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </NavbarRoot>
    </>
  );
};
