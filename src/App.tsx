import { useState } from "react";

import { Canvas } from "@react-three/fiber";

import CountrySelector from "./components/CountrySelector";
import DigitalClock from "./components/DigitalClock";
import Celestial from "./components/Celestial";

import { DoubleSide } from "three";

import "./index.css";

const App = () => {
    const [timezone, setTimezone] = useState("America/New_York");

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <CountrySelector onSelectCountry={setTimezone} />

            <Canvas>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[7, 32, 32]} />
                    <meshStandardMaterial side={DoubleSide} />
                </mesh>
                <Celestial timezone={timezone} />
                <DigitalClock timezone={timezone} />
            </Canvas>
        </div>
    );
};

export default App;
