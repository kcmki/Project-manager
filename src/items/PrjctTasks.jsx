import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import { Oval,TailSpin} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import { URL_tasks } from "./URLS";

import done from './assets/done.png'

function PrjctTasks({project,setTerrain}){
    const [newTask, setnewTask] = useState(null)

    return (
        <div className="tasks">
            <div className="title">
                Mes terrains
            </div>
            <div className="container">
                <input type="checkbox" name="newtaskOpener" id="newtaskOpener" defaultChecked/>
                <div className="new">
                    <div className="control">
                        <label htmlFor="newtaskOpener">     
                            <div>
                                <span></span>
                                <span></span>
                            </div>                   
                        </label>
                    </div>
                    <TaskForm setnewTask={setnewTask}/>
                </div>
                <TaskList project={project} newTask={newTask} setTerrain={setTerrain}/>
            </div>
        </div>
    )
}
function TaskForm({setnewTask}){
    const [errBox,setErrBox] = useState(null)
    const [loadingTask,setloadingTask] = useState(false)
    const refTitre = useRef(null)
    const refTerre = useRef(null)
    const refX = useRef(null)
    const refY = useRef(null)

    function verifyData(refTitre,refTerre,refX,refY){
        if(refTitre.current.value === ""){
            return "Le nom ne peut etre vide"
        }else{
            if(refTerre.current.value === ""){
                return "La terre doit etre spécifié"
            }else{
                if(refX.current.value === "" && refY.current.value === ""){
                    return "Les coordonnées gps sont nécessaire"
                }else{
                    return true
                }
            }
        }
    }
    useEffect(() => {
      if(loadingTask === true){
            setErrBox("")
            addTask(setnewTask,setErrBox)
            setloadingTask(false)
      }
    
    }, [loadingTask])
    

    async function addTask(setnewTask,setErrBox){
        if(verifyData(refTitre,refTerre,refX,refY) ===true){
            let data = new FormData()
                data.append("nom",refTitre.current.value)
                data.append("type",refTerre.current.value)
                data.append("X",refX.current.value)
                data.append("Y",refY.current.value)

            let response = await fetch(URL_tasks,{"method":"POST","body":{data}}).catch(error => setErrBox("No network"))
            if(response.ok){
                let resp = await response.json()
                let Task = {
                    "id":resp.id,
                    "nom":refTitre.current.value,
                    "terre":refTerre.current.value,
                    "x":refX.current.value,
                    "y":refY.current.value,
                }
                console.log(Task)
                setnewTask(Task)
            }else{
                setErrBox("Verifier votre connexion internet")
            }
        }else{
            setErrBox("verifier les données")
        }
    }

    return(
        <div className="form">
            <input ref={refTitre} className="formInput" type="text" name="titre" id="taskTitle" placeholder="Nom" />
            <select ref={refTerre} className="formInput" type="text" name="type" id="taskSoil" placeholder="Terre" >
                <option value="argileuse">argileuse</option>
                <option value="calcaire">calcaire</option>
                <option value="sableuse">sableuse</option>
                <option value="siliceuse">siliceuse</option>
                <option value="tourbeuse">tourbeuse</option>
                <option value="humifère">humifère</option>
            </select>
            <input ref={refX} className="formInput" type="number" name="x" id="taskX" placeholder="X" />
            <input ref={refY} className="formInput" type="number" name="y" id="taskY" placeholder="Y" />
            <LoaderButton loadingTask={loadingTask} setloadingTask={setloadingTask}/>
            <div className="errorBox" >{errBox}</div>
        </div>
    )
}
function LoaderButton({loadingTask,setloadingTask}){
    if(loadingTask){
        return(
            <button value="Add" > 
                <div className="loaderCentrer">
                    <Oval
                    height={20}
                    width={20}
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
            </button>
        )
    }else{
        return(
            <button value="Add" onClick={()=>setloadingTask(true)}> Add </button>
        )
    }
}

function TaskList({newTask,project,setTerrain}){

    const [prjTasks, setprjTasks] = useState(null)
     
    useEffect(async () => {
        if(prjTasks === null){
            let response = await fetch(URL_tasks,/* {"method":"POST",} */)
            if(response.ok){
                    setprjTasks(await response.json()) 
                }
            }
    }, [prjTasks])
    


    //add task
    useEffect(() => {
        if(newTask != null){
            let t = []
            prjTasks.map((prj)=>{
                t.push(prj)
            }
            )
            t.push(newTask)
            setprjTasks(t)
        }
  
      }, [newTask])
    
    //load tasks
    useEffect(() => {
        setprjTasks(null)
        fetchTasks(setprjTasks).catch(error => {console.log(error.message);setprjTasks(404)})

    }, [project])
    async function fetchTasks(setprjTasks){
        let response = await fetch(URL_tasks/*, {prj_id,access_token} */)
        if (response.ok){
            var data = await response.json()
            setprjTasks(data)
        }else{
            const message = `An error has occured: ${response.status}`;
            setprjTasks(404)
            throw new Error(message);
        }
    }

    if(prjTasks === null){
        return(
            <div className="loaderCentrer">
                <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
        )
    }else if(prjTasks === 404){
        return(
            <div className="loadingError">
                Recharger la page
            </div>
        )
    }
    else if(prjTasks.length === 0){
        return(
            <div>Aucune tache a afficher</div>
        )
    }else{
        return(
            <div className="taskListContainer">
            {prjTasks.map((task)=>(
                <Task task={task} key={task.id} setTerrain={setTerrain}/>
            ))
            }
            </div>
        )
    }
}
function Task({task,setTerrain}){

    return(
        <div className="Task" onClick={()=> {setTerrain(task.id);}}>
            <div className="content">
                <div className="nom">{task.nom}</div>
                <div className="xy">{task.x},{task.y}</div>
            </div>
        </div>
    )
}

function LoadingDoneTaskButton({Done,setDone,id}){
    
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
        return (<div className="confirmButton" onClick={()=>setDone(id)}>
            <img src={done} alt="" srcSet=""/>
        </div>)
    }
}


export default PrjctTasks