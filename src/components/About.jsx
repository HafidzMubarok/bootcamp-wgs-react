import { useState } from "react";

export default function About() {
    const [person, setPerson] = useState({
        name: "Muhammad Fathul Hafidz Mubarok",
        batch: "BATCH 10",
        nickname: "Fathul",
        color: "black",
    });

    const updateColor = (color) => {
        setPerson(previousState => {
            return {...previousState, color: color}
        })
    }

    return (
        <div className="ui container">
            <div className="ui center aligned segment">
                <h2 style={{ color: person.color }}>Hi my name is {person.name}. You can call me {person.nickname}. I'm from wgs bootcamp {person.batch}</h2>
            </div>
            <div className="ui center aligned segment">
                <div className="content">
                    <h4>You can change the text color!</h4>
                    <button type="button" className="ui blue button" onClick={() => updateColor("blue")}>
                        Change Color To Blue
                    </button>
                    <button type="button" className="ui black button" onClick={() => updateColor("black")}>
                        Change Color To Black
                    </button>
                </div>
            </div>
        </div>
    );
}