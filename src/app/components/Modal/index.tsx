import { Set } from "@/app/Types"
import style from "@/app/components/Modal/Modal.module.css"

export const Modal = ({
	showModal, setShowModal, children
}:{
	showModal: boolean, 
	setShowModal: Set<boolean>, 
	children: React.ReactNode
}) => {
	if(showModal){
		return(
			<div>
				{children}

				<div className={style.overray} onClick={()=>setShowModal(false)}></div>
			</div>
		)
	} else {
		return <></>
	}
}