import { ConvCategory, Product as ProType, Set, User } from "@/app/Types";
import style from "@/app/components/Products/Products.module.css"
import { useState } from "react";
import { Modal } from "../Modal";
import { Product } from "../Product";
import { getImage, putData } from "@/app/Hooks";
export const Products = ({
	products, user, setUpdate
}:{
	products:ProType[], user:User|undefined, 
	setUpdate:Set<boolean>
})=>{
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showRes, setShowRes] = useState<boolean>(false);
	const [selected, setSelected] = useState<number>(0);
	const pro_data = products;
	const product = products[selected]
	console.log(products);

	const handleClick = (index:number) =>{
		setShowModal(true);
		setSelected(index);
	}
	const handleBuy = async ()=>{
		const id = localStorage.getItem("UserId")
        const token = localStorage.getItem("token")

        if(!id || !token) return;

        const data = {
            id:id,
            token: token
        }
        const response = await putData(data, "buy/"+product.id)

        if(response===501){
            console.log("response:"+response)
            console.log(data)
            return
        }
        await putData(data, "toggle_sale/"+product.id)
        setShowModal(false);
		setUpdate(true);
		setShowRes(true);
	}
	const handleCont = ()=>{
		setShowModal(false);
		setShowRes(false)
	}
  return(
    <div className={style.products}>
      {pro_data.map((e,i)=>{
				return(
					<div key={i} className={style.product} style={{backgroundImage:`url(${getImage("goods",e.id)}`}} onClick={()=>handleClick(i)}>
						<div className={style.title}>{e.name}</div>
						<div className={style.pricetag}>価格</div>
						<div className={style.price}>{e.price}ETH</div>
					</div>
				)
			})}
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<Product product={products[selected]} showModal={showModal} handleBuy={handleBuy}/>
			</Modal>
			<div style={showRes?{opacity:1, zIndex:10, transition:"all 0.2s"}:{opacity:0, zIndex:-10, transition:"all 1s"}}>
				<div className={style.overray} onClick={handleCont}/>
				{user?
				<div className={showRes?style.result:style.close_res}>
					<h1>Thank YOU!!</h1>
					<div><strong>{user.balance+product.price}</strong>ETH</div>
					<div style={{fontSize:"large", fontWeight:"bolder"}}>⇩</div>
					<div className={style.after_balance}><strong>{user.balance}</strong>ETH</div>
					<button onClick={handleCont}>Continue</button>
				</div>
				:<></>}
			</div>
    </div>
  )
}