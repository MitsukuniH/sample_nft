import { Dispatch, SetStateAction, useEffect, useState } from "react"
import style from "./Header.module.css"
import { PopupMenu } from "../PutupMenu";
import { Category, Community, ConvCategory, Product, Set, User } from "@/app/Types";
import { Modal } from "../Modal";
import { SignInMenu } from "../SignInMenu";
import { Button } from "../Button";
import { getImage } from "@/app/Hooks";
import { CommunityList } from "../CommunityList";
import { useSearchParams } from "next/navigation";

export const Header = ({
	setFiltereds, products, user, setUpdate
}:{
		setFiltereds:Dispatch<SetStateAction<Product[]>>,
		products:Product[], user:User|undefined, setUpdate:Set<boolean>
	}
	)=>{
  	const [showPutupMenu, setShowPutupMenu] = useState<boolean>(false);
	const [showCommunityList, setShowCom] = useState<boolean>(false)
	const [showSignIn, setShowSignIn] = useState<boolean>(false);
  	const [search, setSearch] = useState<string>("");
	const [category, setCategory] =useState<Category>(4);

	const query = useSearchParams();

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
		setSearch(e.target.value);
	}
	const handleSubmit = ()=>{
		var url = "/?"
		if(search != "") url += `search=${search}&`
		const p_com = query.get("community");
		if(p_com) url += `community=${p_com}`
		window.location.href=url
	}

	useEffect(()=>{
		setUpdate(true);
	},[showSignIn])

  return(
    <header className={style.header}>
		<img className={style.degicaliicon} src={`/dimory.png`}/>
      	<form>
        <div className={style.form}>
			<select className={style.categorys} onChange={e=>setCategory(Number(e.target.value))}>
				<option value="all">カテゴリー</option>
				{ConvCategory.map((v,i)=>(<option value={v} key={i}>{v}</option>))}
			</select>
						
          	<input type="text" value={search} onChange={handleChange}/>
          	<button className={style.submit} type="button" onClick={handleSubmit}>検索</button>
        </div>
      	</form>
	  		<Button onClick={()=>setShowPutupMenu(true)} width={4}>出品</Button>
	  		<Button onClick={()=>setShowCom(true)} width={7}>コミュニティ</Button>
			{user?
			<div className={style.account} style={{backgroundImage:`url(${getImage("users", user.id)})`}}>
				<div className={style.detail}>
					<h2>{user.username}</h2>
					<h3><strong>{user.balance}</strong>ETH</h3>
				</div>
			</div>:
			<Button onClick={()=>setShowSignIn(true)} width={6}>サインイン</Button>
			}

			<Modal showModal={showPutupMenu} setShowModal={setShowPutupMenu}>
				<PopupMenu setUpdate={setUpdate} setShowModal={setShowPutupMenu}/>
			</Modal>
			<Modal showModal={showSignIn} setShowModal={setShowSignIn}>
				<SignInMenu setShowModal={setShowSignIn}/>
			</Modal>

			<Modal showModal={showCommunityList} setShowModal={setShowCom}>
				<CommunityList setShowModal={setShowCom}/>
        	</Modal>
	  </header>
  )
}