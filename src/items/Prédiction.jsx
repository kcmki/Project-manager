
import * as React from "react";
import "./css/Content.css";
import "./css/Content/Task.css"
import {Oval} from 'react-loader-spinner'
import { useState , useEffect , useRef } from "react";
import PrjctTasks from "./PrjctTasks";
import MyPrjct from "./MyPrjct";
import "./css/Content/Prédiction.css"
import arrow from './assets/4705847.png'
function Prédiction({Terrain}){
    let ListeFruit = ["Pomme","Banane","Orange","Mandarine","Pamplemousse","Kiwi","Mangue","Ananas","Papaye","Raisin","Fraise","Framboise","Myrtille","Cerise","Abricot","Pêche","Nectarine","Poire","Prune","Raisin sec","Dattes","Figues","Grenade","Melon","Pastèque","Ramboutan","Litchi","Carambole","Kumquat","Figue de barbarie","Durian","Maracuja","Physalis","Noix de coco","Noix de cajou","Amandes","Pistaches","Noisettes","Châtaignes","Baies de Goji","Açaï","Mangoustan","Jacquier","Pomelo","Tamarin","Anone","Cerise de terre","Feijoa","Pitahaya","Nectar de coco","Tomate","Carotte","Pomme de terre","Concombre","Courgette","Poivron","Aubergine","Oignon","Ail","Brocoli","Chou-fleur","Chou","Laitue","Épinard","Bette à carde","Artichaut","Asperge","Haricot vert","Pois","Fève","Courge","Potiron","Patate douce","Navet","Radis","Betterave","Panais","Topinambour","Fenouil","Endive","Champignons","Céleri","Gingembre","Citrouille","Scorsonère","Salsifis","Cresson","Roquette","Bettes à cardes","Rutabaga","Chayote","Feuille de moutarde","Feuille de chou vert","Courge spaghetti","Chou-rave","Pissenlit","Raifort","Arroche","Cynorhodon","Sauge.",]
    const [liste,setListe] = useState(null)
    useEffect(() => {
        let temp = []
        
        for (let index = 0; index < 10; index++) {
            temp.push(parseInt(Math.random()*100))
        }
        setListe(temp)
    }, [Terrain])

    if(liste){
         return (
         <div className="predi">
            {liste.map((item)=>(<div className="aggri" key={item}><span>{ListeFruit[item]}</span> <img src={arrow} style={{transform: "rotate("+Math.random()*-45+"deg)"}} alt="" /> </div>))}
        </div>)}
    else return <div className="predi">Veuillez choisir un terrain</div>

}

export default Prédiction