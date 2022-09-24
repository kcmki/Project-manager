
import * as React from "react";
import "./css/Content.css";
import "./css/Content/MyPrjct.css"
import { Oval,TailSpin} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import { URL_projects } from "./URLS";
import iconX from './assets/iconX.png'
import './css/Content/Task.css'
import trash from './assets/trash-can.png'

function MyPrjct({project,setProject,setdeleteProj}){

    const [toDelete,settoDelete] = useState(null)
    const [Data,setData] = useState(null)
    useEffect(async () => {
        
        if(toDelete != null){
            var form = new FormData()
                form.append("id",project)
            let response = await fetch(URL_projects,{"method":"POST","body":form})
            if(response.ok){
                setdeleteProj(project)
                setProject(null)
            }
        }
        settoDelete(null)
    }, [toDelete])
    
    useEffect(async () => {
        if(project != null){
            let response = await fetch(URL_projects+"/"+project,{"method":"GET"})
            
            if(response.ok){
                let temp = await response.json()
                setData(temp)
            }
        }
    }, [project])
    


    const bt1 = useRef(null)
    const brdrbox = useRef(null)
    const ctrl2 = useRef(null)
    
    function toggleHide(){
        if(bt1!= null){
            bt1.current.classList.toggle("hideAnimate")
            brdrbox.current.classList.toggle("grow")
            ctrl2.current.classList.toggle("goUp")
        }
    }
    return(
            <div className="prjct">
            <div className="title">
                Prjct
            </div>
            <div className="container">
                <div className="title">{Data.title}</div>
                <div className="date">{Data.id}</div>
                <div className="desc">{Data.title}</div>
    
                <div className="control">
                    <div className="loaderCentrer">
                        <div className="borderBox" ref={brdrbox} >
                            <div className="control">
                                    <div ref={bt1} className="bt1" onClick={()=>toggleHide()}><img src={trash}></img></div>
                                    <div className="control2" ref={ctrl2}>
                                    <LoadingDoneTaskButton id={project} toDelete={toDelete} settoDelete={settoDelete}/>
                                    <div className="bt2" onClick={()=>toggleHide()}></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
        )

}
function LoadingDoneTaskButton({id,toDelete,settoDelete}){
    
    if(toDelete != null){
        return (<div className="confirmButton">
                    <Oval
                        height={15}
                        width={15}
                        color="#000000"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#555555"
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                    />
                </div>
        )
    }else{
        return (<div className="confirmButton" onClick={()=>settoDelete(id)}>
            <img src={trash} alt="" srcSet=""/>
        </div>)
    }
}

export default MyPrjct