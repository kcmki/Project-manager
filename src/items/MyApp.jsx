import * as React from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import Content from "./Content";
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