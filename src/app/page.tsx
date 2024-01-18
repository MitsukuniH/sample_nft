"use client"
import styles from './page.module.css'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { useEffect, useState } from 'react'
import { getCommunity, getGoodsList, getMe } from './Hooks'
import { Community, Product, User } from './Types'
import { useSearchParams } from 'next/navigation'
import { Chat } from './components/Chat'

export default function Home() {
  const [community, setCommunity] = useState<Community>()
	const [user, setUser] = useState<User>()
  const [products, setProducts] = useState<Product[]>([
    {id: 1,owner_id:1, name:"illust00", category:0, price:0.15, describe:"this is image work.this is image work.", content:"", posted_at:""}
  ])

  const [update, setUpdate] = useState<boolean>(true);
  const query_param = useSearchParams();
  
  useEffect(()=>{
    if(!update)return;

    ( async ()=>{
      const me:User | undefined = await getMe();
      if(!me) return;
  
      setUser({id: me.id, username:me.username, balance:me.balance})
    })()
    getGoodsList(setProducts, query_param.get("search"), query_param.get("community"))

    setUpdate(false);
    console.log("----updated-----")
  }, [update])

  useEffect(()=>{
    (async ()=>{
      const  q_com = Number(query_param.get("community"));
      console.log("--------reload-------")
      if(q_com) {
        const data = await getCommunity(q_com);
        if(!data) console.log("----data is none-----")
        console.log(data);
        setCommunity(data);
      }
    })()
  },[])

  return (
    <main className={styles.main}>
      <Header setFiltereds={setProducts} products={products} user={user} setUpdate={setUpdate}/>
      <div>
        {community&&user?
        <Chat user={user} community_id={community.id}/>
        :<></>}
        <Products products={products} user={user} setUpdate={setUpdate}/>
      </div>
    </main>
  )
}
