import style from "@/app/components/SignInMenu/SignInMenu.module.css"
import { useState } from "react"
import { Button } from "../Button";
import { postData, postImage } from "@/app/Hooks";
import { Set } from "@/app/Types";

export const SignInMenu = ({
	setShowModal
}:{
	setShowModal: Set<boolean>
})=>{
	const [isSignin, setIsSignin] = useState<boolean>(true);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [fullname, setFullname] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [icon, setIcon] = useState<Blob>();

	const handleSignIn = async () => {
		const data = {
			username: username,
			password: password
		}
		const response = await postData(data, "sign_in")

		if(response === undefined) return;

		localStorage.setItem("UserId", response.id)
		localStorage.setItem("token", response.token)

		setShowModal(false)
	}

	const handleSignUp = async () => {
		const data = {
			username: username,
			full_name: fullname,
			email: email,
			password: password,
		}
		const response = await postData(data, "sign_up")

		if(response === undefined) return;

		const res2 = await postImage(icon, `users/${response.id}/image`)

		localStorage.setItem("UserId", response.id)
		localStorage.setItem("token", response.token)

		setShowModal(false)
	}

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
		const files = e.currentTarget.files;
		if(files == null || files.length == 0) return;
		setIcon(files[0])
	}
  return(
		<div className={style.signin}>
			{isSignin?
				<h1>サインイン</h1>:
				<h1>サインアップ</h1>
			}
			{isSignin?<></>:
				<div className={style.input}>
					<label form="icon" >アイコン</label>
					<input id="icon" type='file' accept='image/*,.png,.jpg,.jpeg,.gif' onChange={handleFileUpload}/>
				</div>
			}
			<div className={style.input}>
				<label form="username_form" >ユーザーネーム</label>
				<input id="username_form" type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
			</div>
			{isSignin?<></>:
				<div className={style.input}>
					<label form="fullname_form" >フルネーム</label>
					<input id="fullname_form" type="text" value={fullname} onChange={e=>setFullname(e.target.value)}/>
				</div>
			}
			{isSignin?<></>:
				<div className={style.input}>
					<label form="email_form" >Eメール</label>
					<input id="email_form" type="mail" value={email} onChange={e=>setEmail(e.target.value)}/>
				</div>
			}
			<div className={style.input}>
				<label form="password_form" >パスワード</label>
				<input id="password_form" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
			</div>
			{isSignin?
				<Button onClick={handleSignIn} >サインイン</Button>:
				<Button onClick={handleSignUp} >サインアップ</Button>
			}
			{isSignin?
				<div>アカウントを持っていません。<span className={style.reg} onClick={()=>setIsSignin(false)}>サインアップ</span></div>:
				<div>すでにアカウントを持っています。<span className={style.reg} onClick={()=>setIsSignin(true)}>サインイン</span></div>
			}
		</div>
	)
}