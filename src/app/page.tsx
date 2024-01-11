"use client"
import styles from './page.module.css'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { useEffect, useState } from 'react'
import { getGoodsList } from './Hooks'
import { Product } from './Types'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  // const [products, setProducts] = useState<Product[]>([
  //   {user_id:1, name:"illust00", category:"image", price:0.15, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"illust01", category:"image", price:0.20, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song00", category:"music", price:0.25, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"code00", category:"script", price:0.30, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"stack00", category:"data", price:0.10, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"stack01", category:"data", price:0.35, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"illust02", category:"image", price:0.20, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"code01", category:"script", price:0.10, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song01", category:"music", price:0.40, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song02", category:"music", price:0.25, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"illust03", category:"image", price:0.15, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"illust04", category:"image", price:0.20, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song03", category:"music", price:0.25, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"code02", category:"script", price:0.30, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"stack02", category:"data", price:0.10, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"stack03", category:"data", price:0.35, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"illust05", category:"image", price:0.20, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"code03", category:"script", price:0.10, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song04", category:"music", price:0.40, describe:"this is image work.this is image work.", content:""},
  //   {user_id:1, name:"song05", category:"music", price:0.25, describe:"this is image work.this is image work.", content:""},
  // ])
  const [products, setProducts] = useState<Product[]>([
    {owner_id:1, name:"illust00", category:0, price:0.15, describe:"this is image work.this is image work.", content:"", posted_at:""}
  ])
  const [balance, setBalance] = useState<number>(1000);
  const query_param = useSearchParams();
  
  useEffect(()=>{
    getGoodsList({name:query_param.get("name"), category:query_param.get("category")}, setProducts)
  }, [])

  return (
    <main className={styles.main}>
      <Header setProducts={setProducts} setFiltereds={setProducts} products={products} setBalance={setBalance} balance={balance}/>
      <div>
        <Products products={products} setBalance={setBalance} balance={balance}/>
      </div>
    </main>
  )
}
