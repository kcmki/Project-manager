import * as React from "react";

import Navbar from "./Navbar";
import Content from "./Content";
import { useState } from "react";

function MyApp(){
    const [project,setProject] = useState(null)
    const [deleteProj,setdeleteProj] = useState(null)
    const [Terrain,setTerrain] = useState(null)

    

    return(
        <> 
            <Navbar setProject={setProject} deleteProj={deleteProj} setTerrain={setTerrain}/>

            <div id="container">
            <Content project={project} setProject={setProject} setdeleteProj={setdeleteProj} Terrain={Terrain} setTerrain={setTerrain}/>
            </div>
        </>
        
    )
}

export default MyApp