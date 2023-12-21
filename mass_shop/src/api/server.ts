
import axios from 'axios';
let accessToken = "307823aa124b9ebab1800914be080e71"
let userId = localStorage.getItem('uuid')

async function getShop() { 

let data = JSON.stringify({
  query: `{
  products(first: 250) {
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              priceV2 {  
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}`,
  variables: {}
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://mind-of-mass.myshopify.com/api/2023-10/graphql.json',
  headers: { 
    'Authorization': 'Bearer 307823aa124b9ebab1800914be080e71', 
    'Content-Type': 'application/json, application/json', 
    'X-Shopify-Storefront-Access-Token': '307823aa124b9ebab1800914be080e71'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));

  return JSON.stringify(response.data);
})
.catch((error) => {
  console.log(error);

});}

    export {
        getShop
    }

   // const apiKey = "bb1a42766a89e0156c1bb7c5df64e14b" 
// const password = "a075de90da03791839767ca5a212f581" 

// const URL = `https://mind-of-mass.myshopify.com/api/2023-10/graphql.json`


//     try {
//         const response = await axios.get(URL);
//         console.log(response.data)
//     } catch (error) {console.error("error fetching products", error)}

// }  