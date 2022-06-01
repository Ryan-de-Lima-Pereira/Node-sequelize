const express = require('express');
const path = require('path');
const app = express();
const postagens = require('./controllers/postcontrol');
const Post = require('./models/Post')
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');

// Config
    // Template Engine
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
        }}));
        app.set('view engine', 'handlebars');
    
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
// Rotas

    app.get('/', async(req, res) => {
        await Post.findAll({order: [['id','DESC']]}).then((posts) => res.render('home', {posts: posts}));
    })


    app.get('/cad', function(req,res){
        res.render('formulario')
    })

    app.post('/add', function(req,res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send('Houve um erro'+erro);
        })
    }) 
    app.get('/delete/:id', function(req,res){
        Post.destroy({ where: {id: req.params.id}}).then(
            res.send('Postagem deletada com sucesso')
        ).catch(
            res.send('Essa postagem não existe')
        )
    })

    app.listen(8081, function (params) {
        console.log('Server aberto');
    })