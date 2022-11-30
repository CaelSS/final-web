const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
const connection = require('./database/connection');

routes.get('/users',async(req, res)=>{
    const users = await connection('users').select('*'); //seleciona todos os usuários na tabela users
    res.json(users);
});

routes.post('/users/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await connection('users').where('id',id).select('*'); //seleciona o usuário da tabela user com o id recebido no parametro da rota
    res.json(user);
});

routes.post('/users',async(req, res)=>{
    const {nome, email, idade, empresa} = req.body;
    const id = crypto.randomBytes(4).toString('HEX'); //gero uma id randomica pro usuário
    await connection('users').insert({ //cria um novo usuário no bd
        id,
        nome,
        email,
        idade,
        empresa
    });
    res.json({id});
});

routes.post('/contas',async(req, res)=>{
    const {agencia, banco, user_id, saldo, nome_titular} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('contas').insert({ //cria uma nova conta
        id,
        agencia,
        banco,
        user_id,
        saldo,
        nome_titular,
    });
    res.json({id});
});

routes.get('/contas/:id', async(req, res)=>{
    const {id} = req.params; 
    const conta = await connection('contas').where('id',id).select('*'); //busca uma na tabela contas com id recebido nos parametros do request
    res.json(conta);
});

routes.put('/contas/:id', async(req, res)=>{ //put server pra quando quer atualizar alguma coisa
    const {id} = req.params;
    const {saldo} = req.body;
    const conta = await connection('contas').update({saldo}).where('id',id); //atualziar na tabela contas a conta com o id recebido no parametro com o saldo recebido no body do request 
    res.json(conta);
});

routes.get('/contas',async(req, res)=>{
    const conta = await connection('contas').select('*');
    res.json(conta);
});

routes.delete('/users/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await connection('users').where('id', id).delete();
    res.json(user);
});

routes.get('/usersemconta',async(req, res)=>{
    const userscomconta = await connection('users')
                .join('contas', 'users.id', '=', 'contas.user_id') //faço um join das duas tabelas a partir do user_id
                .select('users.id') //seleciono somente o user_id do usuarios com contas
    const ids = userscomconta.map(user => user.id); //transformo o resultado em uma array de ids
    const userssemconta = await connection('users').whereNotIn("id", ids); //busco quais usuários não estão na array de usuários com contas

    //await connection ('contas').where("id", "16d8159a").delete(); deletar nome do usuario na base da raiva essa porra
    
    res.json([userssemconta]);// o resultado deve ser enviado entre '[]' para força o retorno como array.
});

routes.delete('/contas/:id', async(req, res)=>{
    const {id} = req.params;
    const user = await connection('contas').where('id', id).delete();
    res.json(user);
});


module.exports = routes;