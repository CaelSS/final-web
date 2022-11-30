import React from 'react';
import { Typography, Menu, MenuItem, AppBar, Grid, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';



export default function Header() {
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);
    const handleMenuOpen = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchor(null);
    };
    
    const navigate = useNavigate();


    return(
        <AppBar id="main-header">
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                <Grid sx={{marginLeft:'auto',marginRight:0}}>
                    <Button id="app-bar-button" aria-controls={open ? 'app-bar-menu' : undefined} 
                            aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleMenuOpen}>
                        <MenuIcon sx={{ color: 'white' }}/>
                    </Button>
                    <Menu id="app-bar-menu" aria-labelledby="app-bar-button" anchorEl={anchor} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={()=>{navigate('/');handleMenuClose();}}>Home</MenuItem>
                        <MenuItem onClick={()=>{navigate('/create');handleMenuClose();}}>Cadastrar usuario</MenuItem>
                        <MenuItem onClick={()=>{navigate('/contas');handleMenuClose();}}>Listar contas</MenuItem>
                        <MenuItem onClick={()=>{navigate('/criarconta');handleMenuClose();}}>Criar conta</MenuItem>
                    </Menu>
                    
                </Grid>
            </Grid>
        </AppBar>
        );
    }

    