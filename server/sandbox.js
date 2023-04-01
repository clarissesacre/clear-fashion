/* eslint-disable no-console, no-process-exit */
// programme principal


const dedicatedbrand = require('./eshops/dedicated'); // /eshops/dedicatedbrand : chemin à gauche pour trouver la fonction à appeler
const montlimartbrand = require('./eshops/montlimart');
const circlebrand = require('./eshops/circle');
const category_dedicated = require('./eshops/category_dedicated');
const category_montlimart = require('./eshops/category_montlimart');
const category_circle = require('./eshops/category_circle');


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

const links_brands = ['https://www.circlesportswear.com/','https://www.montlimart.com/','https://www.dedicatedbrand.com/en/'];


async function sandbox_dedicated (eshop = 'https://www.dedicatedbrand.com/en/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
    // on va chercher toutes les catégories du site
    // et retourne la fin du lien pour chaque categories
    categories = await category_dedicated.scrape(eshop);
    //console.log(categories);

    // supp element qui ne sont pas pour women/men ou kids
    for(let i=0; i<categories.length;i++)
    {
      if(categories[i].search('men')==-1 & categories[i].search('kids')==-1)
      {
        categories = categories.splice(0,i);
      }
    }
    
    for(let i=0 ; i<categories.length;i++)
    {
      new_link = eshop + categories[i];
      console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
      products = await dedicatedbrand.scrape(new_link);
      console.log(products);      
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  add_to_mongoDB(products, 'Dedicated')
}

async function sandbox_circle (eshop = 'https://www.circlesportswear.com/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
    // on va chercher toutes les catégories du site
    // et retourne la fin du lien pour chaque categories
    categories = await category_circle.scrape(eshop);
    
    // supp element qui ne sont pas pour men
    categories.splice(-11);
    delete categories[14];

    for(let i=0 ; i<categories.length;i++)
    {
      if(categories[i] != null)
      {
        new_link = categories[i];
        console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
        products = await circlebrand.scrape(new_link);
        
        for(let j=0 ; j<products.length;j++)
        {
          // 'for_who' 
          if(i<=17)
          {
            products[j].for_who='women';
          }
          if(i>17)
          {
            products[j].for_who='men'; 
          }
          // 'category' 
          products[j].category= categories[i].split('/')[4];
        }
        
        console.log(products);
        
      }   
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  add_to_mongoDB(products, 'Circle')
}

async function sandbox_montlimart (eshop = 'https://www.montlimart.com/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
    // on va chercher toutes les catégories du site
    // et retourne la fin du lien pour chaque categories
    categories = await category_montlimart.scrape(eshop);

    // supp element qui ne sont pas pour men
    categories.splice(-4);
    //console.log(categories);
    
    for(let i=0 ; i<categories.length;i++)
    {
      new_link = categories[i];
      console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
      products = await montlimartbrand.scrape(new_link);
      console.log(products);      
    }
    
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  add_to_mongoDB(products, 'Circle')
}



async function sandbox_all_brand(eshop)
{
  for(let i=0; i<links_brands.length;i++)
  {
    eshop = links_brands[i];

    
    //circle 
    if(eshop == 'https://www.circlesportswear.com/') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        // on va chercher toutes les catégories du site
        // et retourne la fin du lien pour chaque categories
        categories = await category_circle.scrape(eshop);
        
        // supp element qui ne sont pas pour men
        categories.splice(-11);
        delete categories[14];

        for(let i=0 ; i<categories.length;i++)
        {
          if(categories[i] != null)
          {
            new_link = categories[i];
            console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
            products = await circlebrand.scrape(new_link);
            
            for(let j=0 ; j<products.length;j++)
            {
              // 'for_who' 
              if(i<=17)
              {
                products[j].for_who='women';
              }
              if(i>17)
              {
                products[j].for_who='men'; 
              }
              // 'category' 
              products[j].category= categories[i].split('/')[4];
            } 
            console.log(products);
          }   
        }
        
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      //await add_to_mongoDB(prod, 'Circle')
    }








    //dedicatedbrand


    if(eshop == 'https://www.dedicatedbrand.com/en/')
    {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
      // on va chercher toutes les catégories du site
      // et retourne la fin du lien pour chaque categories
      categories = await category_dedicated.scrape(eshop);
      //console.log(categories);
  
      // supp element qui ne sont pas pour women/men ou kids
      for(let i=0; i<categories.length;i++)
      {
        if(categories[i].search('men')==-1 & categories[i].search('kids')==-1)
        {
          categories = categories.splice(0,i);
        }
      }
      
      for(let i=0 ; i<categories.length;i++)
      {
        new_link = eshop + categories[i];
        console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
        products = await dedicatedbrand.scrape(new_link);
        console.log(products);      
      }
      prod = products;
      console.log(products);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      //add_to_mongoDB(prod, 'Dedicated')
    }

    




    //montlimart
    if(eshop == 'https://www.montlimart.com/') {
      prod = {};
      try {
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        // on va chercher toutes les catégories du site
        // et retourne la fin du lien pour chaque categories
        categories = await category_montlimart.scrape(eshop);

        // supp element qui ne sont pas pour men
        categories.splice(-4);
        //console.log(categories);
        
        for(let i=0 ; i<categories.length;i++)
        {
          new_link = categories[i];
          console.log(`🕵️‍♀️ Browsing ${categories[i]} category`);
          products = await montlimartbrand.scrape(new_link);
          console.log(products);      
        }
        prod = products;
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
      //await add_to_mongoDB(prod, 'Montlimart')
    }




    
  }
  process.exit(0);
}










const [,, eshop] = process.argv;


//all_sandbox(eshop);

//sandbox_dedicated(eshop);
//sandbox_montlimart(eshop);
//sandbox_circle(eshop);
//sandbox_dedicated_women(eshop);
//sandbox_circle_women(eshop);
sandbox_all_brand(links_brands);

//sandbox_dedicated(eshop);


