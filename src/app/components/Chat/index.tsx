import style from "@/app/components/Chat/chat.module.css"
import { useEffect, useState } from "react"
import { Button } from "../Button";
import { getChats, getImage, postData } from "@/app/Hooks";
import { Chat as ChatT, User } from "@/app/Types";

export const Chat = ({
	user, community_id
}:{
	user: User, community_id: number
}) => {
	const [post, setPost] = useState<string>("");
	const [chats, setChats] = useState<Array<ChatT>>([])
	const [chatUpdate, setCU] = useState<boolean>(true);

	const handleKeyDown = (e: React.KeyboardEvent)=>{
		if(e.nativeEvent.isComposing) return;

		if(e.key==="Enter"){
			handlePost();
		}
	}
	const handlePost = async ()=>{
		const data = {
			user_id: user.id,
			content: post,
			community_id: community_id
		}
		await postData(data, "chat");
		setPost("");
		setCU(true);
	}

	useEffect(()=>{
		if(!chatUpdate)return;
		(async ()=>{
			await getChats(community_id, setChats)
			setCU(false)
		})()
	},[chatUpdate])
	return(
		<div className={style.content}>
			<h1>community</h1>
			<div className={style.chats}>
				{chats.map((e,i)=>(
					<div className={style.chat} key={i}>
						<img src={getImage("users", e.user_id)}/>
						<div>{e.content}</div>
					</div>
				))}
			</div>

			<input type="text" value={post} onChange={e=>setPost(e.target.value)} onKeyDown={handleKeyDown}/>
		</div>
	)
}