/* eslint-disable no-console, no-process-exit */
// programme principal


const dedicatedbrand = require('./eshops/dedicated'); // /eshops/dedicatedbrand : chemin à gauche pour trouver la fonction à appeler
const montlimartbrand = require('./eshops/montlimart');
const circlebrand = require('./eshops/circle');


async function add_to_mongoDB(products, shopName)
{
  const {MongoClient} = require('mongodb'); //import mongodb
  const MONGODB_URI = 'mongodb+srv://clarissesacre:clarisse@clusterclearfashion.7kttiwq.mongodb.net/test?retryWrites=true&w=majority';
  const MONGODB_DB_NAME = 'ClusterClearFashion';
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME); // connect à notre base de donnée
  const collection = db.collection(shopName); // crée une sous database dans clusterclearfashion
  const result = await collection.insertMany(products); // mets elements dans collection
  console.log(`${products.length} products added in the databse ${shopName}`);
}

const links_brands = ['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com/99-vetements','https://shop.circlesportswear.com/collections/collection-homme'];

async function sandbox_all_brand(eshop)
{
  for(let i=0; i<links_brands.length;i++)
  {
    eshop = links_brands[i];
    //dedicatedbrand men
    if(eshop == 'https://www.dedicatedbrand.com/en/men/news')
    {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const products = await dedicatedbrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits
        prod = products;
        //console.log(products);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      add_to_mongoDB(prod, 'Dedicated')
    }

    //dedicatedbrand women
    if(eshop == 'https://www.dedicatedbrand.com/en/women/all-women') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const products = await dedicatedbrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits
        //console.log(products);
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }

    //montlimart
    if(eshop == 'https://www.montlimart.com/99-vetements') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const products = await montlimartbrand.scrape(eshop);
        //console.log(products);
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      await add_to_mongoDB(prod, 'Montlimart')
    }

    //circle men
    if(eshop == 'https://shop.circlesportswear.com/collections/collection-homme') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits
        //console.log(products);
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      await add_to_mongoDB(prod, 'Circle')
    }

    //dedicatedbrand men
    if(eshop == 'https://shop.circlesportswear.com/collections/collection-femme') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits
        //console.log(products);
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  }
  process.exit(0);
}




async function sandbox_dedicated (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await dedicatedbrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandbox_dedicated_women (eshop = 'https://www.dedicatedbrand.com/en/women/all-women') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await dedicatedbrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandbox_montlimart (eshop = 'https://www.montlimart.com/99-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimartbrand.scrape(eshop);


    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandbox_circle (eshop = 'https://shop.circlesportswear.com/collections/collection-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandbox_circle_women (eshop = 'https://shop.circlesportswear.com/collections/collection-femme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}





const [,, eshop] = process.argv;

//sandbox_dedicated(eshop);
//sandbox_montlimart(eshop);
//sandbox_circle(eshop);
//sandbox_dedicated_women(eshop);
//sandbox_circle_women(eshop);

sandbox_all_brand(all_brands);
