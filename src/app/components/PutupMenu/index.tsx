import { postData, postImage } from "@/app/Hooks";
import { Category, Set } from "@/app/Types";
import styles from "@/app/components/PutupMenu/PutupMenu.module.css"
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const PopupMenu = ({
	setShowModal, setUpdate
}:{
	setShowModal:Set<boolean>, setUpdate:Set<boolean>
})=>{
	const [data, setData] = useState<Blob>();
	const [title, setTitle] = useState<string>("");
	const [price, setPrice] = useState<number>(0);
	const [describe, setDescribe] = useState<string>("");
	const [category, setCategory] = useState<Category>(Category.image);
	const [error, setError] = useState<string>();
	const [com_check, setComCheck] = useState<boolean>(false);

	const query = useSearchParams();

	const Translate = (file:File)=>{
        setData(file)
	}
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
		const files = e.currentTarget.files;
		if(files == null || files.length == 0) return;

		const file = files[0];

		console.log(file);
		Translate(file);
	}
	const handleDrop = (e:React.DragEvent<HTMLDivElement>)=>{
		console.log("file droped");
		e.preventDefault();

		if(e.dataTransfer.items){
		[...e.dataTransfer.items].forEach((item) => {
			if (item.kind === "file") {
			const file = item.getAsFile();
			if(file) Translate(file);
			}
		});
		}
	}

	const postProduct =async () => {
		const community = Number(query.get("community"))
		console.log("-------post-------")
		console.log(community)
		console.log(com_check)
		const form = {
			owner_id: 1,
			name: title,
			price: price,
			category: category,
			describe: describe,
			community_id: com_check?community:1
		};
		console.log(form);
		const jsonData = await postData(form, "goods")
		if(jsonData === undefined) return

		console.log(jsonData);

		const response = await postData({owner_id:1, goods_id:jsonData.id}, "goods_user")

        const res = await postImage(data, `goods/${response.id}/image`)

		console.log("-----response----")
		console.log(response)
		console.log(res)

		setUpdate(true);
	}

	const handleSubmit = ()=>{
		var isSuccess = true;
		[title, price, category, describe, data].forEach((v,i)=>{
			console.log(v);
			if(v==undefined||!isSuccess){
				setError(`${i}項目が未記入です`);
				isSuccess = false;
			}
		})
		if(!isSuccess) return;

		setError(undefined);

		postProduct();
		setShowModal(false);
		// setProducts(e=>[...e, 
		// {
		// 	user_id: 1,
		// 	name: title?title:"",
		// 	price: price?price:0,
		// 	category: category?category:"",
		// 	describe: describe?describe:"",
		// 	content: data?data:"",
		// 	posted_at: ""
		// }])
	}
  return(
		<div className={styles.putup}>
			<div className={styles.inside}> 
				{/* <h1>SALE</h1> */}
				<div className={styles.setting}>
					<div className={styles.inputZone}>
						<div className={styles.dropSpace} onDrop={handleDrop} onDragOver={(e)=>{e.preventDefault()}}>drag & drop file to sale</div>
						<input className={styles.file} type='file' accept='image/*,.png,.jpg,.jpeg,.gif' onChange={handleFileUpload}></input>
					</div>
					<div className={styles.inputs}>
						<div className={styles.form_with_label}>
							<label htmlFor="title">作品名</label>
							<input id="title" type="text" onChange={e=>setTitle(e.currentTarget.value)} value={title}/>
						</div>
						<div className={styles.form_with_label}>
							<label htmlFor="title">カテゴリー</label>
							<select value={category} onChange={e=>{setCategory(Number(e.currentTarget.value));console.log("change")}}>
								<option value={Category.image}>画像</option>
								<option value={Category.music}>音楽</option>
								<option value={Category.script}>script</option>
								<option value={Category.data}>データ</option>
							</select>
						</div>
						<div className={styles.form_with_label}>
							<label htmlFor="price">価格</label>
							<input id="price" type="number" onChange={e=>setPrice(Number(e.currentTarget.value))} value={price}/>
						</div>
						{Number(query.get("community"))?<div className={styles.form_with_label}>
							<label htmlFor="community">このコミュニティに投稿する</label>
							<input id="community" type="checkbox"  onChange={e=>{setComCheck(e.target.checked);console.log(e.target.checked)}} checked={com_check}/>
						</div>:<></>}
					</div>
				</div>
			</div>
			<div className={styles.describe}>
				<label htmlFor="describe">詳細説明</label>
				<textarea id="describe" onChange={e=>setDescribe(e.currentTarget.value)} value={describe} rows={7}/>
			</div>
			
			<button onClick={handleSubmit}>PUT UP</button>

			{error!=undefined?<div className={styles.error}>{error}</div>:<></>}
		</div>
  )
}