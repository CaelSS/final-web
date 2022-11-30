import React,{useState, useEffect} from 'react';
import api from '../../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';

export default function User(){
    const navigate = useNavigate();
    const [users,setUser] = useState([]);
    useEffect(()=>{
        api.get('users').then(response => {
            setUser(response.data);
        });
    });
    
    async function handleDelete(id) {
        try {
            await api.delete(`/users/${id}`);
            setUser(users.filter(user => user.id !== id));
        } catch (error) {
            alert('error!')
        }
    }

    return(
        <Paper>
            <TableContainer id='userTableContainer'>
                <Table aria-label="table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Idade</TableCell>
                            <TableCell align="left">Empresa</TableCell>
                            <TableCell align="left">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                        <TableRow hover key={user.id}>
                        <TableCell align="left">{user.nome}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.idade}</TableCell>
                        <TableCell align="left">{user.empresa}</TableCell>
                        <TableCell>
                            <ButtonGroup size="small">
                                <Button margin="dense"color="error" onClick={()=>{handleDelete(user.id)}} variant="contained"><DeleteIcon/></Button>
                                <Button margin="dense"color="warning" onClick={()=> {navigate(`/update/${user.id}`)}} variant="contained"><EditIcon/></Button>
                            </ButtonGroup>
                        </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Paper>
    );
};