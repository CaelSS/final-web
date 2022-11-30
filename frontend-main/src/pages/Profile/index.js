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
  const initUser = {
    nome: "",
    email: "",
    idade: 0,
    empresa: "",
  }
  const [user, setUser] = useState(initUser);

  useEffect(()=>{
    if(id){
      api.get(`/users/${id}`).then(response=>{
        setUser(...response.data);
      });
    }
  },[]);

  function handleSubmit(event) {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const route = id ? `/users/${id}` : '/users'
    api[method](route,user).then((response)=>{
      navigate('/');
    });
  };

  function handleChange(event) {
    const {name, value} = event.target;
    setUser({...user, [name]:value});
  };

  
  if(user.id){
    functionButton = <Button margin="dense" onClick={handleSubmit} color="warning" variant="contained"><Edit/></Button>;
  }else{
    functionButton = <Button margin="dense" onClick={handleSubmit} color="success" variant="contained"><Check/></Button>;
  }

  return(
      <Grid container direction="column" alignItems="center" justify="center">
        <FormControl >
            <Typography variant="h5" align='center' >Cadastro</Typography>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="Nome" name="nome" value={user.nome}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="Email" name="email" value={user.email}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="Idade" name="idade" value={user.idade}/>
            <TextField onChange={handleChange} required margin="dense" size="small" variant="standard" label="Empresa" name="empresa" value={user.empresa}/>
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