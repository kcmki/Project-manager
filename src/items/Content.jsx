
import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import { useState , useEffect , useRef } from "react";
import PrjctTasks from "./PrjctTasks";
import MyPrjct from "./MyPrjct";
import Prédiction from "./Prédiction";

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


function Content({project,setProject,setdeleteProj,Terrain,setTerrain}){

    const [loaded, setLoaded] = useState(0)
    


    useEffect(async () => {
        if (project != 0 ){
            setLoaded(false)
            await fetchProject(setLoaded).catch(error => {error.message})
        }

    }, [project])
    if(project == null){
        return(<div id="content">
            <div className="title"> Please select a user </div>
        </div>)
    }else{
        return(
            <div id="content">
                <div className="title"> User :</div>
                <div className="container">
                    <PrjctTasks setTerrain={setTerrain} project={project} />
                    <MyPrjct project={project} setProject={setProject} setdeleteProj={setdeleteProj}/>
                    <Prédiction Terrain={Terrain}/>
                </div>
            </div>
        )
    }
}




export default Content