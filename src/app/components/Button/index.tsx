import style from "@/app/components/Button/Button.module.css"

export const Button = ({
  onClick, width, height=2, fontSize,
	children
}:{
	onClick: ()=>void
	width?: number, height?: number, fontSize?:number,
	children: string
}) => {
	const style_param:{[key:string]:string} = {
		height:`${height}rem`, borderRadius:`${height/2}rem`, lineHeight:`${height}rem`
	};
	if(width){
		style_param.width = `${width}rem`;
	}
	if(fontSize){
		style_param.fontSize = `${fontSize}rem`;
	}
	
	return(
		<div 
			className={style.button} onClick={onClick} 
			style={style_param}
		>{children}</div>
	)
}