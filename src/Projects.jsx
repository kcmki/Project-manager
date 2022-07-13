import * as React from "react";
import ReactDOM from "react-dom";
import "./Projects.css";

function Projects(){
    const task={
        title: 'titre',
        date: 'XX XX XXXX',
        Description: 'desc',}
    
    

    return(
        <div className="projects">
            <div className="title">
                <div className="text">Projects</div>
                <label className="add">
                    <svg width="18px" height="18px" fill="ffffff">
                        <path d="M16.507 7.423H10.733V1.654C10.733.74 9.996 0 9.083 0c-.913 0-1.65.74-1.65 1.654v5.773H1.656c-.913 0-1.656.74-1.655 1.654 0 .456.184 .875.483 1.174.299 .3.712 .489 1.168.489h5.781V16.508c0 .457.181 .87.48 1.169.299 .299.711 .484 1.168.484 .913 0 1.652-.74 1.652-1.653V10.743h5.774c.913 0 1.654-.747 1.653-1.66C18.16 8.17 17.419 7.423 16.507 7.423z"></path>
                    </svg>
                </label>
            </div>
            <div className="list">
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
                <Project Title={task.title} deadline={task.date} Description={task.Description}/>
            </div>
        </div>
    )
}

function Project({Title,deadline,Description}){
    const colors = ["#4700D8","#9900F0","#F900BF","#FF85B3","#5E11D4","#D164BD","#A343C6","#8C33CB","#7522CF"]
    let color = colors[Math.floor(Math.random()*colors.length)]

    //return componement
    return (
        <div className="Project">
            {console.log(colors)}
            <div className="box" style={{backgroundColor: color}} ></div>
            <div className="title">{Title}</div>
            <div className="deadline">{deadline}</div>
        </div>
    )
}
export default Projects

