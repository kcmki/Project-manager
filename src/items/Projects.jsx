import * as React from "react";
import {useRef, useEffect} from 'react';
import { TailSpin } from "react-loader-spinner";
import "./css/Projects.css";

function Projects({setProject}){

    // get projects data
    const Tasks=[
        {
        key:1,
        title: 'titre',
        date: '22 22 1212',
        Description: 'desc',}
        ]

    //set up mindate for input
    function minDate(){
        let today = new Date()
        let month = (today.getMonth()+1 < 10)?"0"+(today.getMonth()+1) : today.getMonth()+1 
        let day = (today.getDate() < 10)?"0"+(today.getDate()) : today.getDate()
        return today.getFullYear()+'-'+month+'-'+day;
    }

    
    const refText = useRef(null);
    const refDate = useRef(null);
    const refDesc = useRef(null);
    const newPrjbox = useRef(null);

    function addP(){

        if (refDesc.current.value == "" || refDate.current.value == "" || refText.current.value == ""){
            newPrjbox.current.innerText = "Erreur l'un des champs n'as pas été spécifié"
        }else{
            let req = true
            if (req == true) {
                //validate date 
                newPrjbox.current.innerText = "valide"
                //refetch for projects

            }else{
                //print server response 
                newPrjbox.current.innerText = "Erreur serveur veuillez reessayer ultérieurement"
            }
        }
    }
    function viderErr(){
        newPrjbox.current.innerText = ""
    }


    return(
        <>

        <div className="projects">
            <div className="title">
                <div className="text">Projects</div>
                <input type="checkbox" name="add" id="add" onClick={viderErr}/>
                <label className="add" htmlFor="add" >
                    <svg className="addLogo" width="18px" height="18px" fill="ffffff">
                        <path d="M16.507 7.423H10.733V1.654C10.733.74 9.996 0 9.083 0c-.913 0-1.65.74-1.65 1.654v5.773H1.656c-.913 0-1.656.74-1.655 1.654 0 .456.184 .875.483 1.174.299 .3.712 .489 1.168.489h5.781V16.508c0 .457.181 .87.48 1.169.299 .299.711 .484 1.168.484 .913 0 1.652-.74 1.652-1.653V10.743h5.774c.913 0 1.654-.747 1.653-1.66C18.16 8.17 17.419 7.423 16.507 7.423z"></path>
                    </svg>
                </label>
                <div className="newProjContainer">
                    <div className="title">
                        New project
                    </div>
                    <div className="newProj">
                        <input ref={refText} className="newPinput" type="text" name="newProjTitle" id="newProjTitle" placeholder="Titre" />
                        <input ref={refDate} className="newPinput" type="date" name="newProjDate" id="newProjDate" min={minDate()} />
                        <textarea ref={refDesc} className="newPinput" id="newProjDesc" name="Description" rows="4" cols="30" placeholder="Description"></textarea>
                        <div ref={newPrjbox} id="newPrjErreur"></div>
                        
                        <div className="control">
                            <button value="Add" onClick={addP}> Add </button>
                            <label htmlFor="add" ><img src="https://cdn-icons.flaticon.com/png/512/2976/premium/2976286.png?token=exp=1660740919~hmac=2c8032645ea167cbb037c1946f320716" alt="" /></label>
                        </div>
                    </div>

                </div>
            </div>
            <div className="scroller">
                <div className="list">
                    <Project Tasks={Tasks} setProject={setProject}/>
                </div>
            </div>

        </div>
        </>
    )
}

async function fetchProjects(setProjects){
    const response = await fetch('https://my-json-server.typicode.com/kcmki/ReactTodos/Projects')
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const Projects = await response.json()
    setProjects(Projects)
}

function Project({setProject}){
    var colors = ["#4700D8","#9900F0","#F900BF","#FF85B3","#5E11D4","#D164BD","#A343C6","#8C33CB","#7522CF"]
    const [Projects,setProjects] = React.useState(null)
    
    useEffect(() => {
        if(Projects === null){
            fetchProjects(setProjects).catch(error => {error.message})
        }
    }, [Projects])
    
    //return componement
    if(Projects === null ){
        return (
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
    }else{
        return (
            <>
            {
            Projects.map((task)=>(
                <div className="Project" key={task.id} onClick={() => setProject(task.id)}>
                    <div className="box" style={{backgroundColor: colors[task.id % colors.length]}}> </div>
                    <div className="title">{task.title}</div>
                    <div className="deadline">{task.id}</div>
                </div>
            ))}
            </>
        )
    }

}
export default Projects

