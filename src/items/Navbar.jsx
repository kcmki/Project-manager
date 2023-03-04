import * as React from "react";
import "./css/Navbar.css";
import Projects from "./Projects";
import mcsoft from './assets/mcsoft.png'

function Navbar({setProject,deleteProj,setTerrain}){

    return(
        <> 
            <input type="checkbox" name="Burger" id="burger" />
            <nav>

            <div className="top">
                <div className="logo">
                    <img src={mcsoft} alt="logo" />
                    <div className="title">Agro Better</div>
                </div>

                <label className="burger" htmlFor="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <span className="separator"></span>
            <Projects setProject={setProject} deleteProj={deleteProj} setTerrain={setTerrain}/>

            </nav>
        </>
        
    )
}

export default Navbar