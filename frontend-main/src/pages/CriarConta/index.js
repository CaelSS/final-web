import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {TextField, Button, ButtonGroup, Typography, Grid, FormControl} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Backspace, Check, Edit} from '@mui/icons-material';
import './style.css';
import api from '../../services/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



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
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    if(id){
      api.get(`/contas/${id}`).then(response=>{
        setContas(...response.data);
      });
    }
    else{

      api.get(`/usersemconta/`).then(response=>{
        setUsers(...response.data);
      });


    }
  },[]);

  function handleSubmit(event) {
    event.preventDefault();
    api.post("/contas",conta).then((response)=>{
      navigate('/');
    });
  };

  function handleChange(event) {
    const {name, value} = event.target;
    setContas({...conta, [name]:value});
  };

  function handleSelectChange(event) {
    const {value} = event.target;
    const user = users.filter(user => user.id == value);
    setContas({...conta, "nome_titular":user[0].nome, "user_id":value});
  };

  
  if(conta.id){
    functionButton = <Button margin="dense" onClick={handleSubmit} color="warning" variant="contained"><Edit/></Button>;
  }else{
    functionButton = <Button margin="dense" onClick={handleSubmit} color="success" variant="contained"><Check/></Button>;
  }

  return(
      <Grid container direction="column" alignItems="center" justify="center">
        <FormControl >
            <Typography variant="h5" align='center' >Cadastro</Typography>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="agencia" name="agencia" value={conta.agencia}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="banco" name="banco" value={conta.banco}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="saldo" name="saldo" value={conta.saldo}/>
            <Select value={conta.user_id} onChange={handleSelectChange} inputProps={{ 'aria-label': 'Without label' }}>
              {users.map(user => (<MenuItem name={user.nome} label={user.nome} value={user.id}>{user.nome}</MenuItem>))}
            </Select>
            <Grid container justifyContent="flex-end">
              <ButtonGroup size='small'  align='right'>
                <Button margin="dense" onClick={()=>{navigate('/')}} color="error" variant="contained"><Backspace/></Button>
                {functionButton}
              </ButtonGroup>
            </Grid>
        </FormControl>
      </Grid>
  );
}