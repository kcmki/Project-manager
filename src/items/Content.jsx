
import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import {Oval} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import PrjctTasks from "./PrjctTasks";

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


function Content({project}){

    const [loaded, setLoaded] = useState(0)
    
    useEffect(async () => {
        if (project != 0 ){
            setLoaded(false)
            await fetchProject(setLoaded).catch(error => {error.message})
        }

    }, [project])

    return(
        <div id="content">
            <div className="title"> Project : {project}</div>
            <div className="container">
                <PrjctTasks project={project} />
                <MyPrjct />
                <FinishedTasks />
            </div>
        </div>
    )
}


function MyPrjct(){
    return(
        <div className="prjct"></div>
    )
}
function FinishedTasks(){
    return(
        <div className="ftasks"></div>
    )
}
export default Content