import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { useSidebarOpen } from '../../hooks/sidebar-open';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const Layout = (props: any) => {
  const { children } = props;
  const { isSidebarOpen, setSidebarOpen } = useSidebarOpen();

  return (
    <>
      <LayoutRoot
        style={{
          paddingLeft: isSidebarOpen ? 240 : 64
        }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar isSidebarOpen={isSidebarOpen} onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
