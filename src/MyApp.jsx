import * as React from "react";

import Navbar from "./items/Navbar";
import Header from "./items/Header";
import Content from "./items/Content";
import { useState } from "react";

function MyApp(){
    const [project,setProject] = useState(0)
    
    return(
        <> 
            <Navbar setProject={setProject}/>

            <div id="container">
            <Header />
            <Content project={project} />
            </div>
        </>
        
    )
}

export default MyApp