import { getImage } from "@/app/Hooks"
import { ConvCategory, Product as ProType } from "@/app/Types"
import style from "@/app/components/Product/Product.module.css"

export const Product = ({
    product, showModal, handleBuy
}:{
    product: ProType, showModal: boolean, handleBuy:()=>void
})=>{
    return(
        <div className={showModal?style.modal:style.hide_modal}>
            <div style={{display:"flex"}}>
                <img className={style.icon} src={getImage("goods",product.id)}/>
                <div className={style.info}>
                    <h1>{product.name}</h1>
                    <div className={style.text}>
                        Category<strong>{ConvCategory[product.category]}</strong>
                    </div>
                    <div className={style.text}>
                        <strong>{product.price}</strong>ETH
                    </div>
                </div>
            </div>
            <div className={style.describe}>
            {product.describe}
            </div>
            <button onClick={handleBuy}>Buy</button>
        </div>
    )
}