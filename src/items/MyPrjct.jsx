
import * as React from "react";
import "./css/Content.css";
import "./css/Content/MyPrjct.css"
import { Oval,TailSpin} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import { URL_projects } from "./URLS";
import iconX from './assets/iconX.png'
import './css/Content/Task.css'
import done from './assets/done.png'
function MyPrjct({project}){

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
            <div className="title">title</div>
            <div className="date">date</div>
            <div className="desc">desc</div>

            <div className="control">
                <div className="loaderCentrer">
                    <div className="borderBox" ref={brdrbox} >
                        <div className="control">
                                <div ref={bt1} className="bt1" onClick={()=>toggleHide()}><img src={done}></img></div>
                                <div className="control2" ref={ctrl2}>
                                <LoadingDoneTaskButton id={project} />
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
function LoadingDoneTaskButton({Done}){
    
    if(Done != null){
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
        return (<div className="confirmButton" /* onClick={()=>setDone(id)} */>
            <img src={done} alt="" srcSet=""/>
        </div>)
    }
}

export default MyPrjct