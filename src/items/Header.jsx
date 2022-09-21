import * as React from "react";
import { Bars } from "react-loader-spinner";
import { useEffect,useState } from "react";
import "./css/Header.css"
import {URL_tasks} from './URLS'
import "./css/Utils.css"

async function fetchToDos(setData){
    const response = await fetch(URL_tasks)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        setData(404)
        throw new Error(message);
    }

    const todos = await response.json()
    setData(todos)
}

function Header(){
    
    const [Data, setData] = useState(null)


    useEffect(async () => {
        
        if ( Data === null){
            await fetchToDos(setData).catch(error => {setData(404)})
        } 

    }, [Data])
    
    return(
        <div className="taches">
            <div className="title">Taches prochaines</div>
            <Taches tasks={Data}/>
        </div>
    )       
}

function Taches({tasks}){
    if(tasks === null){
        return(
            <div className="loaderCentrer">
                <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>

        )
    }else if(tasks === 404){
        return(
            <div className="loadingError">
                Recharger la page
            </div>
        )
    }else{
        return (
                <div className="scroll">
                    <div className="tasksContainer">
                            { tasks.map((task)=>(
                                <div className="tache" key={task.id}>

                                        <div className="taskinfo">
                                            <div className="projet">{task.prjId}</div>
                                            <div className="titre">{task.body}</div>
                                            <div className="date">{task.id}</div>
                                        </div>
                                    <div className="desc">{task.body}</div>

                                </div>
                            )) }
                    </div>
                </div>)
    }
}

export default Header