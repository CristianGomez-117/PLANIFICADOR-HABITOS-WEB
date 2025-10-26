import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

import { useContext } from 'react'; // Importamos useContext
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import AuthContext from '../context/AuthContext'; // Importamos el contexto
import Tooltip from '@mui/material/Tooltip';
import { SitemarkIcon } from '../shared-theme/CustomIcons';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

// Función para obtener iniciales del nombre
const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}` || '?';
};

// Función para generar color basado en el nombre
const getAvatarColor = (name) => {
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#cddc39',
    '#ff9800', '#ff5722', '#795548', '#607d8b'
  ];
  
  if (!name) return colors[0];
  
  // Generar índice basado en el código del primer carácter
  const charCode = name.charCodeAt(0);
  const index = charCode % colors.length;
  return colors[index];
};

export default function SideMenu() {
  // 1. Usa el hook useContext para acceder al estado global de autenticación
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si por alguna razón el usuario no está en el contexto, se redirige.
  // Esto es una capa extra de seguridad.
  if (!currentUser) {
    navigate('/signin');
    return null;
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
        marginTop: '64px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >

        <SitemarkIcon />
        {/* <SelectContent /> */}
        <Typography variant="h4" component="h1" sx={{ color: 'text.primary', position: 'relative', left: 10, fontSize: 20, fontWeight: 'bold' }}>
          Tigre Habit Planner
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="big"
          alt={currentUser.first_name}
          sx={{ 
            width: 36, 
            height: 36,
            bgcolor: getAvatarColor(currentUser.first_name),
            fontWeight: 'bold'
          }}
        >
          {getInitials(currentUser.first_name, currentUser.last_name)}
        </Avatar>
        <Box sx={{ mr: 'auto' }}>
          <Tooltip title={currentUser.email}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.primary',
                maxWidth: 150,
                fontSize: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {currentUser.first_name}
            </Typography>
          </Tooltip>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
