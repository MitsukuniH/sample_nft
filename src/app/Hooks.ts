import { Dispatch, SetStateAction } from "react";
import { Category, Product, ResponceProduct } from "./Types";

export const getGoodsList = async (
    filter:{name:string|null, category:string|null},
    setProducts: Dispatch<SetStateAction<Array<Product>>>
)=>{
    const requestOptions = {
      method: "GET"
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"goods", requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    
    if(!jsonData[0]) return;
    console.log(jsonData)
    const procedData = jsonData.map((d: ResponceProduct):Product=>{
      const category:Category = d.category
      
      console.log(d)
      return {
        owner_id: 1,
        name: d.name,
        category: category,
        price: d.price,
        content: "pass",
        describe: d.describe,
        posted_at: d.posted_at
      }
    })
    setProducts(procedData);
    console.log("afterFetch")
    console.log(jsonData)
}