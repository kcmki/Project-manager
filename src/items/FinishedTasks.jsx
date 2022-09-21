
import * as React from "react";
import "./css/Content.css";
import "./css/Content/FinishedTasks.css"
import { Oval,TailSpin} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import { URL_projects } from "./URLS";
import iconX from './assets/iconX.png'

function FinishedTasks(){
    return(
        <div className="ftasks"></div>
    )
}

export default FinishedTasks