import { getImage } from "@/app/Hooks";
import { Community, Set } from "@/app/Types";
import style from "@/app/components/CommunityList/Community.module.css"
import { useEffect, useState } from "react";

export const CommunityList = ({
    setShowModal
}:{
    setShowModal: Set<boolean>
}) =>{
    const [communities, setCommunities] = useState<Community[]>([]);
    const getCommunityList = async ()=>{
        const requestOptions = {
            method: "GET"
        };
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"community", requestOptions);
        if(response.status != 200){
            console.log("Error");
            return;
        }
        const jsonData = await response.json();
        
        if(!jsonData[0]) return;
        const procedData:Community[] = jsonData.map((d: Community):Community=>(
        {
            id: d.id,
            name: d.name,
            describe: d.describe
        }
        ))
        console.log(procedData)
        setCommunities(procedData);
    }
    const handleClick = (com:Community)=>{
        window.location.href = "/?community="+com.id;
    }

    useEffect(()=>{
        (async ()=>(await getCommunityList()))()
    },[])
    return(
        <div className={style.content}>
            <h1>コミュニティ一覧</h1>
            <div className={style.communities}>
                {communities.map((e,i)=>(
                    <div className={style.community} key={i} onClick={()=>handleClick(e)}>
                        <img src={getImage("community", e.id)}/><div>{e.name}</div>
                    </div>
                ))}
            </div>
            <div className={style.close} onClick={()=>setShowModal(false)}>閉じる</div>
        </div>
    )
}