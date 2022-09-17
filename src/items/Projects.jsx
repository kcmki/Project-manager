import * as React from "react";
import {useRef, useEffect,useState} from 'react';
import { TailSpin,Oval } from "react-loader-spinner";
import "./css/Projects.css";

function Projects({setProject}){
    const [NewProj,setNewProj] = useState(null)
    const [ErrBox, setErrBox] = useState("")
    return(
        <>
        <div className="projects">
            <div className="title">
                <div className="text">Projects</div>
                <input type="checkbox" name="add" id="add" onClick={()=>setErrBox("")}/>
                <label className="add" htmlFor="add" >
                    <svg className="addLogo" width="18px" height="18px" fill="ffffff">
                        <path d="M16.507 7.423H10.733V1.654C10.733.74 9.996 0 9.083 0c-.913 0-1.65.74-1.65 1.654v5.773H1.656c-.913 0-1.656.74-1.655 1.654 0 .456.184 .875.483 1.174.299 .3.712 .489 1.168.489h5.781V16.508c0 .457.181 .87.48 1.169.299 .299.711 .484 1.168.484 .913 0 1.652-.74 1.652-1.653V10.743h5.774c.913 0 1.654-.747 1.653-1.66C18.16 8.17 17.419 7.423 16.507 7.423z"></path>
                    </svg>
                </label>
                <FormProject setNewProj={setNewProj} setErrBox={setErrBox} ErrBox={ErrBox}/>
            </div>
            <div className="scroller">
                <div className="list">
                    <ProjectList setProject={setProject} NewProj={NewProj}/>
                </div>
            </div>
        </div>
        </>
    )
}

function FormProject({setNewProj,ErrBox,setErrBox}){
        //set up mindate for input
        function minDate(){
            let today = new Date()
            let month = (today.getMonth()+1 < 10)?"0"+(today.getMonth()+1) : today.getMonth()+1 
            let day = (today.getDate() < 10)?"0"+(today.getDate()) : today.getDate()
            return today.getFullYear()+'-'+month+'-'+day;
        }
        function verifyData(){
            if(refText.current.value === ""){
                return "Le titre ne peut etre vide"
            }else{
                if(refDesc.current.value ===""){
                    return " veuillez entrez une description du projet"
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
        const refText = useRef(null);
        const refDate = useRef(null);
        const refDesc = useRef(null);
        
        const [LoadingNewprj, setLoadingNewprj] = useState(false)



        useEffect(async () => {
            if(LoadingNewprj===true){
                let dataTest = verifyData(refText,refDate,refDesc)
                if(dataTest === true){
                    setErrBox("")

                    var data = new FormData()
                        data.append("title",refText.current)
                        data.append("date",refDate.current.value)
                        data.append("desc",refDesc.current)
                        console.log(data)
                    let response = await fetch("https://my-json-server.typicode.com/kcmki/ReactTodos/Projects",{'method':"POST",'body':data})
                    if(response.ok){
                        data = await response.json()
                        let proj = {
                            "id":data.id,
                            "title":refText.current.value,
                        }
                        setNewProj(proj)
                    }else{
                        setErrBox("verifier les donnes et ressayer ultérieurement")
                    }
                }else{
                    console.log("erreur "+dataTest)
                    setErrBox(dataTest)
                }
                setLoadingNewprj(false)
            }
        }, [LoadingNewprj])
        

    return(
        <div className="newProjContainer">
        <div className="title">
            New project
        </div>
        <div className="newProj">
            <input ref={refText} className="newPinput" type="text" name="newProjTitle" id="newProjTitle" placeholder="Titre" />
            <input ref={refDate} className="newPinput" type="date" name="newProjDate" id="newProjDate" min={minDate()} />
            <textarea ref={refDesc} className="newPinput" id="newProjDesc" name="Description" rows="4" cols="30" placeholder="Description"></textarea>
            <div id="newPrjErreur">{ErrBox}</div>
            
            <div className="control">
                <LoaderButton LoadingNewprj={LoadingNewprj} setLoadingNewprj={setLoadingNewprj}/>
                <label htmlFor="add" onClick={()=>setErrBox("")} >X</label>
            </div>
        </div>

    </div>
    )
}

function LoaderButton({LoadingNewprj,setLoadingNewprj}){
    if(LoadingNewprj){
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
            <button value="Add" onClick={()=>setLoadingNewprj(true)}> Add </button>
        )
    }
}

function ProjectList({setProject,NewProj}){
    var colors = ["#4700D8","#9900F0","#F900BF","#FF85B3","#5E11D4","#D164BD","#A343C6","#8C33CB","#7522CF"]
    
    //fetching projects
    const [Projects,setProjects] = useState(null)

    useEffect(() => {
        if(Projects === null){
            fetchProjects(setProjects).catch(error => {error.message})
        }
    }, [Projects])



    async function fetchProjects(setProjects){
        const response = await fetch('https://my-json-server.typicode.com/kcmki/ReactTodos/Projects')
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
    
        const Projects = await response.json()
        setProjects(Projects)
    }

    //new project management
    useEffect(() => {
        if(NewProj != null){
            console.log(Projects)
            let t = []
            Projects.map((prj)=>{
                t.push(prj)
            }
            )
            t.push(NewProj)
            console.log(t)
            setProjects(t)
        }
  
      }, [NewProj])
      


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

