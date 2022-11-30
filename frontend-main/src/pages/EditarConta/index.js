import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {TextField, Button, ButtonGroup, Typography, Grid, FormControl} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Backspace, Check, Edit} from '@mui/icons-material';
import './style.css';
import api from '../../services/api';


export default function Profile() {
  const {id} = useParams();  
  const navigate = useNavigate();
  let functionButton;
  const initConta = {
    agencia: "",
    banco: "",
    saldo: 0,
    nome_titular: "",
    user_id:"",
  }
  const [conta, setContas] = useState(initConta);

  useEffect(()=>{
      api.get(`/contas/${id}`).then(response=>{
        setContas(...response.data);
      });
  },[]);

  function handleSubmit(event) {
    event.preventDefault();
    api.put(`/contas/${id}`,conta).then((response)=>{
      navigate('/');
    });
  };

  function handleChange(event) {
    const {name, value} = event.target;
    setContas({...conta, [name]:value});
  };

  return(
      <Grid container direction="column" alignItems="center" justify="center">
        <FormControl >
            <Typography variant="h5" align='center' >Cadastro</Typography>
            <TextField disabled margin="dense" size="small" variant="standard" label="agencia" name="agencia" value={conta.agencia}/>
            <TextField disabled margin="dense" size="small" variant="standard" label="banco" name="banco" value={conta.banco}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="saldo" name="saldo" value={conta.saldo}/>
            <TextField disabled required margin="dense" size="small" variant="standard" label="Nome do titular" name="nome_titular" value={conta.nome_titular}/>
            <Grid container justifyContent="flex-end">
              <ButtonGroup size='small'  align='right'>
                <Button margin="dense" onClick={()=>{navigate('/')}} color="error" variant="contained"><Backspace/></Button>
                <Button margin="dense" onClick={handleSubmit} color="warning" variant="contained"><Edit/></Button>;
              </ButtonGroup>
            </Grid>
        </FormControl>
      </Grid>
  );
}