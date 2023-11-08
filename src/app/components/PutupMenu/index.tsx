import styles from "@/app/components/PutupMenu/PutupMenu.module.css"
import { Dispatch, SetStateAction, useState } from "react";

export const PopupMenu = ({setProducts}:{setProducts:Dispatch<SetStateAction<Product[]>>})=>{
	const [data, setData] = useState<string>();
	const [title, setTitle] = useState<string>();
	const [price, setPrice] = useState<number>();
	const [describe, setDescribe] = useState<string>();
	const [category, setCategory] = useState<string>();
	const [error, setError] = useState<string>();

  const Translate = (file:File)=>{
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
      setData(typeof reader.result === "string"?
        reader.result:
        undefined
      )
			setTitle(file.name);
			console.log("pass"+ typeof reader.result)
    })
    reader.readAsText(file, "UTF-8");
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

	const handleSubmit = ()=>{
		var isSuccess = true;
		[title, price, category, describe, data].forEach((v,i)=>{
			console.log(v);
			if(v==undefined||!isSuccess){
				setError(`Please fill information ${i}`);
				isSuccess = false;
			}
		})
		if(!isSuccess) return;

		setError(undefined);
		setProducts(e=>[...e, 
		{
			user_id: 1,
			name: title?title:"",
			price: price?price:0,
			category: category?category:"",
			describe: describe?describe:"",
			content: data?data:""
		}])
	}
  return(
		<div className={styles.putup}>
			<div>
				<h1>SALE</h1>
				<div className={styles.setting}>
					<div className={styles.inputZone}>
						<div className={styles.dropSpace} onDrop={handleDrop} onDragOver={(e)=>{e.preventDefault()}}>drag & drop file to sale</div>
						<input type='file' accept='*' onChange={handleFileUpload}></input>
					</div>
					<div className={styles.inputs}>
						<div className={styles.form_with_label}>
							<label htmlFor="title">Title</label>
							<input id="title" type="text" onChange={e=>setTitle(e.currentTarget.value)} value={title}/>
						</div>
						<div className={styles.form_with_label}>
							<label htmlFor="title">Category</label>
							<select value={category} onChange={e=>{setCategory(e.currentTarget.value);console.log("change")}}>
								<option value="image">image</option>
								<option value="music">music</option>
								<option value="script">script</option>
								<option value="data">data</option>
							</select>
						</div>
						<div className={styles.form_with_label}>
							<label htmlFor="price">Price</label>
							<input id="price" type="number" onChange={e=>setPrice(Number(e.currentTarget.value))} value={price}/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.describe}>
				<label htmlFor="describe">Describe</label>
				<textarea id="describe" onChange={e=>setDescribe(e.currentTarget.value)} value={describe} rows={7}/>
			</div>
			<button onClick={handleSubmit}>PUT UP</button>

			{error!=undefined?<div className={styles.error}>{error}</div>:<></>}
		</div>
  )
}