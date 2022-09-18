import * as React from "react";
import { Bars } from "react-loader-spinner";
import { useEffect,useState } from "react";
import "./css/Header.css"
import {URL_tasks} from './URLS'


async function fetchToDos(setData){
    const response = await fetch(URL_tasks)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const todos = await response.json()
    setData(todos)
}

function Header(){
    
    const [Data, setData] = useState(false)


    useEffect(async () => {
        
        if ( Data === false){
            await fetchToDos(setData).catch(error => {error.message})
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

    if(tasks){
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
    }else{ 
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
    } 

}

export default Header