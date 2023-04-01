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