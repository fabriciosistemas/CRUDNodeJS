const express = require('express');
const app = express();

const bodyparser = require('body-parser');

const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.2viwx.gcp.mongodb.net/Cadastrar_Aluno?retryWrites=true&w=majority";
 
MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('Cadastrar_Aluno'); // coloque o nome do seu DB

    app.listen(3001, () => {
        console.log('Server running on port 3001');
    })
})

app.use(bodyparser.urlencoded({ extended: true}));

app.set('views', './view');
app.set('view engine', 'ejs');

// REGIÃO DE FABRÍCIO

app.get('/', function(req, res) {
    res.render('Fabricio/index');
    var cursor = db.collection('alunos').find()
});

app.get('/alunos/show', (req, res) => {
    db.collection('alunos').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Fabricio/shows', { data: results })

    })
})

app.get('/alunos/create', (req, res) => {
    db.collection('alunos').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Fabricio/create', { data: results })

    })
})

app.get('/alunos/edit', (req, res) => {
    db.collection('alunos').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Fabricio/edit', { data: results })

    })
})

app.get('/alunos/delete', (req, res) => {
    db.collection('alunos').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('Fabricio/edit', { data: results })

    })
})

app.post('/alunos/show', (req, res) => {
    db.collection('alunos').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/alunos/show')
    })
})

app.route('/alunos/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('alunos').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('Fabricio/edit', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var sexo = req.body.sexo
  var matricula = req.body.matricula
  var curso = req.body.curso
  var email = req.body.email
  var endereco = req.body.endereco
  var bairro = req.body.bairro
  var cidade = req.body.cidade
  var cpf = req.body.cpf
  var idade = req.body.idade
  var telefone = req.body.telefone
 
  db.collection('alunos').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname,
      sexo: sexo,
      matricula: matricula,
      curso: curso,
      email: email,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      cpf: cpf,
      idade: idade,
      telefone: telefone
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/alunos/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/alunos/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('alunos').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/alunos/show')
  })
})

// REGIÃO DE YURI

app.get('/livros/show', (req, res) => {
  db.collection('livros').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Yuri/show', { data: results })

  })
})

app.get('/livros/create', (req, res) => {
  db.collection('livros').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Yuri/index', { data: results })

  })
})

app.get('/livros/edit', (req, res) => {
  db.collection('livros').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Yuri/edit', { data: results })

  })
})

app.get('/livros/delete', (req, res) => {
  db.collection('livros').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Yuri/delete', { data: results })

  })
})

app.post('/livros/show', (req, res) => {
  db.collection('livros').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('Salvo no Banco de Dados')
      res.redirect('/livros/show')
  })
})

app.route('/livros/edit/:id')
.get((req, res) => {
var id = req.params.id

db.collection('livros').find(ObjectId(id)).toArray((err, result) => {
  if (err) return res.send(err)
  res.render('Yuri/edit', { data: result })
})
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var quant = req.body.quant
  var local = req.body.local
  var tema = req.body.tema
  var classi = req.body.classi
  var descri = req.body.descri
  var resumo = req.body.resumo

db.collection('livros').updateOne({_id: ObjectId(id)}, {
  $set: {
    name: name,
    surname: surname,
    quant: quant,
    local: local,
    tema: tema,
    classi: classi,
    descri: descri,
    resumo: resumo
  }
}, (err, result) => {
  if (err) return res.send(err)
  res.redirect('/livros/show')
  console.log('Atualizado no Banco de Dados')
})
})

app.route('/livros/delete/:id')
.get((req, res) => {
var id = req.params.id

db.collection('livros').deleteOne({_id: ObjectId(id)}, (err, result) => {
  if (err) return res.send(500, err)
  console.log('Deletado do Banco de Dados!')
  res.redirect('/livros/show')
})
})

// REGIÃO DE JEFERSON


app.get('/prof/show', (req, res) => {
  db.collection('prof').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Jeferson/shows', { data: results })

  })
})

app.get('/prof/create', (req, res) => {
  db.collection('prof').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Jeferson/index', { data: results })

  })
})

app.get('/prof/edit', (req, res) => {
  db.collection('prof').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Jeferson/edit', { data: results })

  })
})

app.get('/prof/delete', (req, res) => {
  db.collection('prof').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('Jeferson/delete', { data: results })

  })
})

app.post('/prof/show', (req, res) => {
  db.collection('prof').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('Salvo no Banco de Dados')
      res.redirect('/prof/show')
  })
})

app.route('/prof/edit/:id')
.get((req, res) => {
var id = req.params.id

db.collection('prof').find(ObjectId(id)).toArray((err, result) => {
  if (err) return res.send(err)
  res.render('Jeferson/edit', { data: result })
})
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var CPF = req.body.CPF
  var sexo = req.body.sexo
  var telefone = req.body.telefone
  var idade = req.body.idade
  var endereco = req.body.endereco
  var email = req.body.email
  var codigo = req.body.codigo
  var especialidade = req.body.especialidade

db.collection('prof').updateOne({_id: ObjectId(id)}, {
  $set: {
    name: name,
    CPF: CPF,
    sexo: sexo,
    telefone: telefone,
    idade: idade,
    endereco: endereco,
    email: email,
    codigo: codigo,
    especialidade: especialidade
  }
}, (err, result) => {
  if (err) return res.send(err)
  res.redirect('/prof/show')
  console.log('Atualizado no Banco de Dados')
})
})

app.route('/prof/delete/:id')
.get((req, res) => {
var id = req.params.id

db.collection('prof').deleteOne({_id: ObjectId(id)}, (err, result) => {
  if (err) return res.send(500, err)
  console.log('Deletado do Banco de Dados!')
  res.redirect('/prof/show')
})
})