import { DateTime } from "luxon";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion-3d";

type CelestialProps = {
    timezone: string;
};

const Celestial: FC<CelestialProps> = ({ timezone }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getLighting = () => {
        const now = DateTime.now().setZone(timezone);
        const hour = now.hour + now.minute / 60;
        const month = now.month;

        const summerOffset = 2;
        const winterOffset = -2;
        const seasonOffset =
            month >= 4 && month <= 9 ? summerOffset : winterOffset;

        const sunriseHour = 6 - seasonOffset;
        const sunsetHour = 18 + seasonOffset;
        const isDaytime = hour >= sunriseHour && hour < sunsetHour;

        const celestialColor = isDaytime ? "#FFD700" : "#FFFACD";

        const lightIntensity = isDaytime
            ? Math.max(0.5, 1.5 - Math.abs(hour - 12) * 0.05)
            : 0.3;

        const horizonDistance = 1100; // Horizontal distance from sunrise to sunset

        const dayProgress = (hour - sunriseHour) / (sunsetHour - sunriseHour);

        // Scale the sun's position based on screen width
        const sunPositionX = (screenWidth / horizonDistance) * dayProgress;

        return {
            celestialColor,
            lightIntensity,
            sunPositionX,
        };
    };

    const { celestialColor, lightIntensity, sunPositionX } = getLighting();

    console.log(sunPositionX);

    return (
        <motion.pointLight
            color={celestialColor}
            position={[sunPositionX, 2, -3.5]}
            castShadow
            animate={{
                x: sunPositionX,
                intensity: lightIntensity,
            }}
            transition={{
                intensity: {
                    type: "spring",
                    duration: 1.5,
                },
                position: {
                    type: "spring",
                    duration: 1.5,
                },
            }}
        />
    );
};

export default Celestial;
