import { Box, Button, CSSObject, Divider, Drawer as MuiDrawer, IconButton, styled, Theme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import FunctionsIcon from '@mui/icons-material/Functions';
import PageviewIcon from '@mui/icons-material/Pageview';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(() => ({
  right: 0,
  position: "absolute",
  top: "12px",
  height: "40px",
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const items = [
  // {
  //   href: '/',
  //   icon: (<DashboardIcon fontSize="large" />),
  //   title: 'Dashboard'
  // },
  {
    href: '/functions',
    icon: (<FunctionsIcon fontSize="large" />),
    title: 'Functions'
  },
  {
    href: '/logs',
    icon: (<PageviewIcon fontSize="large" />),
    title: 'Logs'
  },
  // {
  //   href: '/settings',
  //   icon: (<SettingsIcon fontSize="large" />),
  //   title: 'Settings'
  // },
];

export const Sidebar = (props: any) => {
  const { open, onClose } = props;

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box>
            <Button
              style={{
                height: 64,
                width: 64,
              }}
            >
              <Link to="/functions">
                <Logo
                  sx={{
                    height: 40,
                    width: 40
                  }}
                />
              </Link>
            </Button>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            mb: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              isSidebarOpen={open}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="permanent"
    >
      {open ? (
        <DrawerHeader>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
      ) : undefined}
      {content}
    </Drawer>
  );
};
