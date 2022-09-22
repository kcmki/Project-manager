import * as React from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import Content from "./Content";
import { useState } from "react";

function MyApp(){
    const [project,setProject] = useState(null)
    const [deleteProj,setdeleteProj] = useState(null)


    

    return(
        <> 
            <Navbar setProject={setProject} deleteProj={deleteProj}/>

            <div id="container">
            <Header />
            <Content project={project} setProject={setProject} setdeleteProj={setdeleteProj} />
            </div>
        </>
        
    )
}

export default MyApp