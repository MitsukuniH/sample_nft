import { Dispatch, SetStateAction, useState } from "react"
import style from "./Header.module.css"
import { PopupMenu } from "../PutupMenu";

export const Header = (
	{setProducts, setFiltereds, products, balance, setBalance}:
	{
		setProducts:Dispatch<SetStateAction<Product[]>>,
		setFiltereds:Dispatch<SetStateAction<Product[]>>,
		products:Product[],
		balance:number, 
		setBalance:Dispatch<SetStateAction<number>>
	}
	)=>{
  const [showPutupMenu, setShowPutupMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
	const [category, setCategory] =useState<string>("all");

  const categorys = ["all", "image", "music", "script", "data"];

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value);
  }
	const handleSubmit = ()=>{
		var f = [...products];
		if(search != "") f=f.filter(v=>v.name.includes(search));
		if(category != "" && category != "all") f=f.filter(v=>v.category==category);
		

		console.log(f)
		setFiltereds(f)
	}

  return(
    <header className={style.header}>
      <h1>degicali</h1>
      <form>
        <div className={style.form}>
					<select className={style.categorys} onChange={e=>setCategory(e.target.value)}>
						<option value="all">Category</option>
						{categorys.map((v,i)=>(<option value={v} key={i}>{v}</option>))}
					</select>
						
          <input type="text" value={search} onChange={handleChange}/>
          <button className={style.submit} type="button" onClick={handleSubmit}>Search</button>
        </div>
      </form>
			<div className={style.sale} onClick={()=>setShowPutupMenu(true)}>PUT UP</div>
			<div className={style.account}>
				<div className={style.detail}>
					<h2>User01</h2>
					<h3><strong>{balance}</strong>ETH</h3>
				</div>
			</div>

			{showPutupMenu?
			<div >
				<PopupMenu setProducts={setProducts}/>

				<div className={style.overray} onClick={()=>setShowPutupMenu(false)}></div>
			</div>
			:<></>}
	  </header>
  )
}