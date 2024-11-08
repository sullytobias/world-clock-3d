import { useState } from "react";

import { DateTime } from "luxon";

import { Canvas } from "@react-three/fiber";

import CountrySelector from "./components/CountrySelector";
import DigitalClock from "./components/DigitalClock";

import './index.css';

const App = () => {
    const [timezone, setTimezone] = useState("America/New_York");

    const getBackgroundColor = () => {
        const hour = DateTime.now().setZone(timezone).hour;
        if (hour >= 6 && hour < 12) return "#FFD700"; 
        if (hour >= 12 && hour < 18) return "#87CEEB"; 
        if (hour >= 18 && hour < 20) return "#FF6347"; 
        return "#2C3E50"; 
    };

    return (
        <div
            style={{
                backgroundColor: getBackgroundColor(),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                color: "#fff",
                transition: "background-color 0.5s ease",
            }}
        >
            <CountrySelector onSelectCountry={setTimezone} />
            <Canvas >
                <DigitalClock timezone={timezone}/>
            </Canvas>
        </div>
    );
};

export default App;