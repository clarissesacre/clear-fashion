const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');
const { Console } = require('console');

function getClient() {
  const uri = "mongodb+srv://clarissesacre:clarisse@clusterclearfashion.7kttiwq.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  return client;
}

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': false});
});

app.get('/brands', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    const found = await collection.distinct('brand');
    //response.send({brands: found});
    response.json(found);
  }
  catch{
    response.send({error : "Couldn't fetch brands"}); 
  }
});

app.get('/sex', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    const found = await collection.distinct('for_who');
    response.json(found);
  }
  catch{
    response.send({error : "Couldn't fetch brands"}); 
  }
});

app.get('/products', async (request, response) => {
  const client = getClient();
  const collection = client.db("ClusterClearFashion").collection("all_brands");

  const result = await collection.find({}).toArray();

  response.json(result);
});

/*
app.get('/products/search', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");

    var script ={};
    var page = request.query.page;
    var limit = request.query.limit;
    var price = request.query.price;
    var brand = request.query.brand;
    

    if(page == undefined){
      page = 1;
    }
    else{
      page = parseInt(page);
    }

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }
    const skip = (page - 1) * limit;

    if((brand!="")){
      script.brand = brand;
    }

    if(price!=""){
      script.price = {$lte: parseFloat(price)};
    }

    const count = await collection.countDocuments(script);
    const totalPages = Math.ceil(count / limit);

    const result = await collection.find(script).skip(skip).limit(limit).toArray();

    response.json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      data: result
    });
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});*/

app.get('/products/search', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    var script ={};
    var page = request.query.page;
    var limit = request.query.limit;
    var price = request.query.price;
    var brand = request.query.brand;

    if(page == undefined){
      page = 1;
    }
    else{
      page = parseInt(page);
    }

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }

    const skip = (page - 1) * limit;

    // affiche tout si aucun prix max rentré
    if(price!=""){
      script.price = {$lte: parseFloat(price)};
    }
    // affiche toutes les marques si aucune rentrée
    if((brand!="")){
      script.brand = brand;
    }
      
    //const result = await collection.find(script).toArray();
    const count = await collection.countDocuments(script);
    const totalPages = Math.ceil(count / limit);

    const result = await collection.find(script).skip(skip).limit(limit).toArray();

    response.json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      data: result
    });
    
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});

app.get('/products/price', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    var script ={};
    var page = request.query.page;
    var limit = request.query.limit;
    var price = request.query.price;
    var brand = request.query.brand;
    var for_who = request.query.for_who;

    if(page == undefined){
      page = 1;
    }
    else{
      page = parseInt(page);
    }

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }

    const skip = (page - 1) * limit;

    // affiche tout si aucun prix max rentré
    if(price!=""){
      script.price = {$lte: parseFloat(price)};
    }
    // affiche toutes les marques si aucune rentrée
    if((brand!="")){
      script.brand = brand;
    }

    if((for_who!="")){
      script.for_who = for_who;
    }
      
    
    const count = await collection.countDocuments(script);
    const totalPages = Math.ceil(count / limit);

    const result = await collection.find(script).skip(skip).limit(limit).toArray();

    response.json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
      data: result
    });
    
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});

/*
app.get('/products/search', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");

    var script ={};
    var page = request.query.page;
    var limit = request.query.limit;
    var price = request.query.price;
    var shopname = request.query.shopname;

    if(page == undefined){
      page = 1;
    }
    else{
      page = parseInt(page);
    }

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }
    const skip = (page - 1) * limit;

    // affiche tout si aucun prix max rentré
    if(price!=""){
      script.price = {$lte: parseFloat(price)};
    }
    // affiche toutes les marques si aucune rentrée
    if((shopname!="")){
      script.shopname = shopname;
    }

    const count = await collection.countDocuments(script);
    const totalPages = Math.ceil(count / limit);

    const result = await collection.find(script).skip(skip).limit(limit).toArray();

    response.json({
      result
    });
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});
*/


app.get('/products/id', async (request, response) => {
  try{
    const productId = request.params.id;
    const script = {_id: ObjectId(productId)};
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    const found = await collection.find(script).toArray();
    
    response.send({ids: found});

  } catch(err) {
	  response.send({error : "ID not found"});  
  }
});



app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);





/*
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');
const { Console } = require('console');

function getClient() {
  const uri = "mongodb+srv://clarissesacre:clarisse@clusterclearfashion.7kttiwq.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  return client;
}

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

// GET http://localhost:8092 sur Insomnia
// affiche {'ack': false}
app.get('/', (request, response) => {
  response.send({'ack': false});
});


// affiche les marques dispo
app.get('/brands', async (request, response) => {
  const client = getClient();
  const collection = client.db("ClusterClearFashion").collection("all_brands");
  const found = await collection.distinct('shopname');
  response.json(found);
});

// affiche tous les produits dispo
app.get('/products', async (request, response) => {
  const client = getClient();
  const collection = client.db("ClusterClearFashion").collection("all_brands");
  const result = await collection.find({}).toArray();
  response.json(result);
});

// selectionne des articles selon prix ou marque
app.get('/products/price', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("all_brands");
    var script ={};
    var price = request.query.price;
    var shopname = request.query.shopname;

    // affiche tout si aucun prix max rentré
    if(price!=""){
      script.price = {$lte: parseFloat(price)};
    }
    // affiche toutes les marques si aucune rentrée
    if((shopname!="")){
      script.shopname = shopname;
    }
      
    const result = await collection.find(script).toArray();

    response.json({
      result
    });
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
*/