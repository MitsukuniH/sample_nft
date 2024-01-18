import { Category, Chat, Product, ResponceProduct, Set } from "./Types";

export const getGoodsList = async (
    setProducts: Set<Product[]>,
    name?:string|null, community_id?:string|null
)=>{
    const url = community_id?`goods/?community_id=${community_id}`:"goods";
    const requestOptions = {
      method: "GET"
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+url, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    
    if(!jsonData[0]) return;
    var procedData:Product[] = jsonData.map((d: ResponceProduct):Product=>{
      const category:Category = d.category
      
      console.log(d)
      return {
        id: d.id,
        owner_id: 1,
        name: d.name,
        category: category,
        price: d.price,
        content: "pass",
        describe: d.describe,
        posted_at: d.posted_at
      }
    })

    if(name) procedData = procedData.filter(v=>v.name.includes(name))
    // if(community_id) procedData = procedData.filter(v=>v.)
    setProducts(procedData);
    console.log("afterFetch")
}

export const getChats = async (
    community_id: number,
    setChats: Set<Array<Chat>>
) => {
    const requestOptions = {
        method: "GET"
      };
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"chats/community/"+community_id, requestOptions);
      if(response.status != 200){
        console.log("Error");
        return;
      }
      const jsonData = await response.json();
      
      if(!jsonData[0]) return;
      const procedData:Chat[] = jsonData.map((d: Chat):Chat=>(
        {
            id: d.id,
            user_id: d.user_id,
            content: d.content
        }
      ))
      setChats(procedData.reverse());
}

export const postData = async (data:{[key:string]:string|number}, url:string) => {
    const requestOptions = {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+url, requestOptions);
    if(response.status != 200){
        console.log("----error----")
        console.log(response)
        return;
    }
    const jsonData = await response.json();

    console.log("----------response----------")
    console.log(jsonData)
    return jsonData
}
export const postImage = async(data:Blob|undefined, url:string) => {
    const formdata = new FormData()
    if(!data) return;
    formdata.append('image', data)
    const requestOptions={
        method:"POST",
        body:formdata,
    }
    return await fetch(process.env.NEXT_PUBLIC_API_URL+url,requestOptions)
}
export const putData = async (data:{[key:string]:string|number}, url:string) => {
    const requestOptions = {
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+url, requestOptions);
    if(response.status != 200){
        console.log("----error----")
        console.log(response)
        return response.status
    }
    const jsonData = await response.json();

    console.log("----------response----------")
    console.log(jsonData)
    return jsonData
}

export const getUser = async (id: number) => {
    const requestOptions = {
        method: "GET"
      };
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"user/"+id, requestOptions);
      if(response.status != 200){
        console.log("Error");
        return;
      }
      const jsonData = await response.json();
      
      if(!jsonData[0]) return;
      console.log(jsonData[0])

      return jsonData[0];
}

export const getMe = async () => {
    const id = localStorage.getItem("UserId");
    const token = localStorage.getItem("token");
    if(!id || !token) return;

    const data = {id: id, token: token}

    console.log("----data----")
    console.log(data)

    return await postData(data, "user/me")
}

export const getImage = (type:string, goods_id:number):string=>{
    console.log(process.env.NEXT_PUBLIC_API_URL+`${type}/${goods_id}/image`)
    return process.env.NEXT_PUBLIC_API_URL+`${type}/${goods_id}/image`
}

export const getCommunity = async (id: number) => {
    const requestOptions = {
        method: "GET"
      };
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"community/"+id, requestOptions);
      if(response.status != 200){
        console.log("Error:"+response.status);
        return;
      }
      return await response.json();
}