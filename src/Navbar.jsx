import * as React from "react";
import ReactDOM from "react-dom";
import "./Navbar.css";
import Projects from "./Projects";

function Navbar(){
    function addButton(){
        console.log("click")
    }
    return(
        <> 
            <input type="checkbox" name="Burger" id="burger" />
            <nav>

            <div className="top">
                <div className="logo">
                    <img src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png" alt="logo" />
                    <div className="title">ToDo</div>
                </div>

                <label className="burger" htmlFor="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <span className="separator"></span>
            <Projects />

            </nav>
        </>
        
    )
}

export default Navbar