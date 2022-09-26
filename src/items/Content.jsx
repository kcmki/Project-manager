
import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import {Oval} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import PrjctTasks from "./PrjctTasks";
import MyPrjct from "./MyPrjct";
import FinishedTasks from "./FinishedTasks";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchProject(setLoaded){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json()
    setLoaded(data)
}


function Content({project,setProject,setdeleteProj}){

    const [loaded, setLoaded] = useState(0)
    
    useEffect(async () => {
        if (project != 0 ){
            setLoaded(false)
            await fetchProject(setLoaded).catch(error => {error.message})
        }

    }, [project])
    if(project == null){
        return(<div id="content">
            <div className="title"> Please select a project </div>
        </div>)
    }else{
        return(
            <div id="content">
                <div className="title"> Project :</div>
                <div className="container">
                    <PrjctTasks project={project} />
                    <MyPrjct project={project} setProject={setProject} setdeleteProj={setdeleteProj}/>
                    <FinishedTasks project={project} />
                </div>
            </div>
        )
    }

}




export default Content