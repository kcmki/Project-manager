
import * as React from "react";
import "./css/Content.css";
import {Audio, Radio, Oval} from 'react-loader-spinner'
import { useState , useEffect } from "react";


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

            <LoaderCircle loaded = {loaded} />

        </div>
    )
}

function LoaderCircle({loaded}){
    if(loaded === 0){
        return( <div> Please select a project to display data</div>)
    }else if(loaded === false){
    return (
        <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={4}
            strokeWidthSecondary={4}
            />
    )                 
    }else{
        return (<div>
            {loaded.map((item)=>(<div className="popupitems" key={item.id}> {item.id} </div>))}
        </div>)
    }

}

export default Content