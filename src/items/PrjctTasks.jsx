import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import { Oval,TailSpin} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import { URL_tasks } from "./URLS";
import {minDate} from "./Projects";
import done from './assets/done.png'

function PrjctTasks({project}){
    const [newTask, setnewTask] = useState(null)

    return (
        <div className="tasks">
            <div className="title">
                My Tasks
            </div>
            <div className="container">
                <input type="checkbox" name="newtaskOpener" id="newtaskOpener" />
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
                <TaskList project={project} newTask={newTask}/>
            </div>
        </div>
    )
}
function TaskForm({setnewTask}){
    const [errBox,setErrBox] = useState(null)
    const [loadingTask,setloadingTask] = useState(false)
    const refTitre = useRef(null)
    const refDate = useRef(null)
    const refDesc = useRef(null)

    function verifyData(refTitre,refDate,refDesc){
        if(refTitre.current.value === ""){
            return "Le titre ne peut etre vide"
        }else{
            if(refDesc.current.value ===""){
                return " veuillez entrez une description pour la tache"
            }else{
                if(refDate.current.value ===""){
                    return "La date est obligatoire"
                }else if(refDate.current.value < new Date()){
                    return "la date est invalide"
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
        if(verifyData(refTitre,refDate,refDesc) ===true){
            let data = new FormData()
                data.append("titre",refTitre.current.value)
                data.append("date",refDate.current.value)
                data.append("desc",refDesc.current.value)

            let response = await fetch(URL_tasks,{"method":"POST","body":{data}}).catch(error => setErrBox("No network"))
            if(response.ok){
                let resp = await response.json()
                let Task = {
                    "id":resp.id,
                    "titre":refTitre.current.value,
                    "date":refDate.current.value,
                    "desc":refDesc.current.value,
                }
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
            <input ref={refTitre} className="formInput" type="text" name="titre" id="taskTitle" placeholder="Titre" />
            <input ref={refDate} className="formInput" type="date" name="date" id="taskDate" min={minDate()}/>
            <textarea ref={refDesc} className="formInput" id="taskDesc" name="taskDesc" rows="2" cols="15" placeholder="Description"></textarea>
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

function TaskList({newTask,project}){
    const [Done,setDone] = useState(null)
    const [prjTasks, setprjTasks] = useState(null)
     
    useEffect(async () => {
        let temp = []

        if(Done != null){
            let response = await fetch(URL_tasks,/* {"method":"POST",} */)
            if(response.ok){
                prjTasks.map((task)=>{
                    if(task.id != Done){
                      temp.push(task)  
                    }
                }
                )
                setprjTasks(temp) 
                
            }
        }
        setDone(null)
    }, [Done])
    


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
        fetchTasks(setprjTasks).catch(error => {console.log(error.message)})

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
                <Task task={task} key={task.id} id={task.id} setDone={setDone} Done={Done}/>
            ))
            }
            </div>
        )
    }
}
function Task({task,id,setDone,Done}){
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
        <div className="Task" >
            <div className="content">
                <div className="title">{task.body}</div>
                <div className="date">{task.id}</div>
                <div className="desc">{task.body}</div>
            </div>  
            <div className="loaderCentrer">
                <div className="borderBox" ref={brdrbox} >
                    <div className="control">
                            <div ref={bt1} className="bt1" onClick={()=>toggleHide()}><img src={done}></img></div>
                            <div className="control2" ref={ctrl2}>
                            <LoadingDoneTaskButton id={id} setDone={setDone} Done={Done}/>
                            <div className="bt2" onClick={()=>toggleHide()}></div>
                            </div>
                    </div>
                </div>
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