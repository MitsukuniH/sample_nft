import style from "@/app/components/Products/Products.module.css"
import { Dispatch, SetStateAction, useState } from "react";

export const Products = (
	{products, removeProduct, balance, setBalance}:{products:Product[], removeProduct:(index:number)=>void, balance:number, setBalance:Dispatch<SetStateAction<number>>}
)=>{
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showRes, setShowRes] = useState<boolean>(false);
	const [selected, setSelected] = useState<number>(0);
	const pro_data = products;
  console.log(products);

	const handleClick = (index:number) =>{
		setShowModal(true);
		setSelected(index);
	}
	const handleBuy = ()=>{
		if(balance < products[selected].price){
			alert("have'nt enough coin");
			return;
		}

		setBalance(v=>(v-products[selected].price));
		setShowRes(true);
	}
	const handleCont = ()=>{
		removeProduct(selected)
		setShowModal(false);
		setShowRes(false)
	}
  return(
    <div className={style.products}>
      {pro_data.map((e,i)=>{
				return(
					<div key={i} className={style.product} style={{backgroundImage:`url(/${e.category}.png)`}} onClick={()=>handleClick(i)}>
						<div className={style.title}>{e.name}</div>
						<div className={style.pricetag}>価格</div>
						<div className={style.price}>{e.price}ETH</div>
					</div>
				)
			})}
			<div style={showModal?{opacity:1, zIndex:10, transition:"all 0.2s"}:{opacity:0, zIndex:-10, transition:"all 1s"}}>
				<div className={style.overray} onClick={()=>setShowModal(false)}/>
				<div className={showModal?style.modal:style.hide_modal}>
					<div style={{display:"flex"}}>
						<img className={style.icon} src={`/${products[selected].category}.png`}/>
						<div className={style.info}>
							<h1>{products[selected].name}</h1>
							<div className={style.text}>
								Category<strong>{products[selected].category}</strong>
							</div>
							<div className={style.text}>
								<strong>{products[selected].price}</strong>ETH
							</div>
						</div>
					</div>
					<div className={style.describe}>
					{products[selected].describe}
					</div>
					<button onClick={handleBuy}>Buy</button>
				</div>
			</div>
			<div style={showRes?{opacity:1, zIndex:10, transition:"all 0.2s"}:{opacity:0, zIndex:-10, transition:"all 1s"}}>
				<div className={style.overray} onClick={handleCont}/>
				<div className={showRes?style.result:style.close_res}>
					<h1>Thank YOU!!</h1>
					<div><strong>{balance+products[selected].price}</strong>ETH</div>
					<div style={{fontSize:"large", fontWeight:"bolder"}}>⇩</div>
					<div className={style.after_balance}><strong>{balance}</strong>ETH</div>
					<button onClick={handleCont}>Continue</button>
				</div>
			</div>
			
    </div>
  )
}