
import axios from 'axios';

let accessToken = "f57e9430f7872871a4ebcd13da87b1f4"
// let userId = localStorage.getItem('uuid') 


// export const serverCalls = {

//     getShop: async () => {
       
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/shop`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data'), response.status 
//         }

//         return await response.json()

//     },
//     getOrder: async () => {
        
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data'), response.status 
//         }

//         return await response.json()

//     },
//     createOrder: async (data: any) => { 

//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/create/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data) 
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create data'), response.status 
//         }

//         return await response.json()

//     },
//     updateData: async (orderId: string, data: any) => { 
       
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/update/${orderId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data) 
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update data'), response.status 
//         }

//         return await response.json()

//     },
//     deleteOrder: async (orderId: string, data: any) => {
       
//         const response = await fetch(`https://rangers134-shopas.onrender.com/api/order/delete/${orderId}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete data'), response.status 
//         }

//         return await response.json()

//     }
// }

// curl -X POST \
//   https://{mindOfMass}.myshopify.com/admin/api/2023-10/graphql.json \
//   -H 'Content-Type: application/json' \
//   -H 'X-Shopify-Access-Token: {f57e9430f7872871a4ebcd13da87b1f4}' \
//   -d '{
//     "query": "query {
//       products(first: 5) {
//         edges {
//           node {
//             id
//             handle
//           }
//         }
//         pageInfo {
//           hasNextPage
//         }
//       }
//     }"
//   }

async function getShop() {

const apiKey = "bb1a42766a89e0156c1bb7c5df64e14b" 
const password = "a075de90da03791839767ca5a212f581" 

const URL = `https://${apiKey}:${password}@mind-of-mass.myshopify.com/admin/api/2023-01/products.json`


    try {
        const response = await axios.get(URL);
        console.log(response.data)
    } catch (error) {console.error("error fetching products", error)}

}   

// getShop: async () => {
       
    //         const response = await fetch(`https://rangers134-shopas.onrender.com/api/shop`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type' : 'application/json',
    //                 'Authorization' : `Bearer ${accessToken}`
    //             }
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data'), response.status 
    //         }
    
    //         return await response.json()
    export {
        getShop
    }