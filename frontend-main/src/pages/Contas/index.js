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

export default function Conta(){
    const navigate = useNavigate();
    const [contas,setContas] = useState([]);
    useEffect(()=>{
        api.get('contas').then(response => {
            setContas(response.data);
        });
    });
    
    async function handleDelete(id) {
        try {
            await api.delete(`/contas/${id}`);
            setContas(contas.filter(conta => conta.id !== id));
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
                            <TableCell align="left">agencia</TableCell>
                            <TableCell align="left">banco</TableCell>
                            <TableCell align="left">nome do titular</TableCell>
                            <TableCell align="left">saldo</TableCell>
                            <TableCell align="left">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contas.map(conta => (
                        <TableRow hover key={conta.id}>
                        <TableCell align="left">{conta.agencia}</TableCell>
                        <TableCell align="left">{conta.banco}</TableCell>
                        <TableCell align="left">{conta.nome_titular}</TableCell>
                        <TableCell align="left">{conta.saldo}</TableCell>
                        <TableCell>
                            <ButtonGroup size="small">
                                <Button margin="dense"color="error" onClick={()=>{handleDelete(conta.id)}} variant="contained"><DeleteIcon/></Button>
                                <Button margin="dense"color="warning" onClick={()=> {navigate(`/editarconta/${conta.id}`)}} variant="contained"><EditIcon/></Button>
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