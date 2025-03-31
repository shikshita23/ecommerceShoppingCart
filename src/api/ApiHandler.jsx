import axios from "axios"
export const getBrewerFn=async()=>{
     const res=await axios.get(' https://api.openbrewerydb.org/v1/breweries?page=1&per_page=10');
     return res.data;
}
export const postUserFn=async(userData)=>{
     const res=await axios.post(' http://localhost:3000/users',userData);
     return res.data;
}
export const getUserFn=async()=>{
     const res=await axios.get(' http://localhost:3000/users');
     return res.data;
}
export const postCartFn = async (userData) => {
     const res = await axios.post('http://localhost:3000/cart', userData);
     return res.data;
 };
 export const getCartFn=async()=>{
     const res=await axios.get(' http://localhost:3000/cart');
     return res.data;
}
export const updateCartFn = async (id, updatedItem) => {
     const res = await axios.put(`http://localhost:3000/cart/${id}`, updatedItem);
     return res.data;
 };
export const deleteCartFn = async (id) => {
     const res = await axios.delete(`http://localhost:3000/cart/${id}`);
     return res.data;
 };
 export const getProductFn=async()=>{
     const res=await axios.get(' http://localhost:3000/products');
     return res.data;
}
export const getBrewerSearchFn = async (queryParams) => {
     const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries`,{params:queryParams})
     const data = response.data
     console.log("object,res",data)
     return { items: data, total: data.length }; // Fix: Adjusting response structure
};
   