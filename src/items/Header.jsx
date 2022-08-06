import * as React from "react";
import "./css/Header.css"

function Header(){
    const taches = [{
        key:1,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },{
        key:2,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },{
        key:3,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },{
        key:4,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },{
        key:5,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },{
        key:6,
        projet:"projet",
        titre:"titre",
        date:"12-12-2012",
        desc:"desc",
    },]
    return(
        <div className="taches">
            <div className="title">Taches prochaines</div>
            <Taches tasks={taches}/>
        </div>
    )
}

function Taches({tasks}){
    return(
            <div className="scroll">
                <div className="tasksContainer">
                {tasks.map((task)=>(
                    <div className="tache" key={task.key}>

                            <div className="taskinfo">
                                <div className="projet">{task.projet}</div>
                                <div className="titre">{task.titre}</div>
                                <div className="date">{task.date}</div>
                            </div>
                        <div className="desc">{task.desc}</div>

                    </div>
                ))}
                </div>
            </div>
    )
}

export default Header