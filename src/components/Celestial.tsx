import { DateTime } from "luxon";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion-3d";

type CelestialProps = {
    timezone: string;
};

const Celestial: FC<CelestialProps> = ({ timezone }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [lightIntensity, setLightIntensity] = useState(1);

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

        const computedLightIntensity = isDaytime
            ? Math.max(0.5, 1.5 - Math.abs(hour - 12) * 0.05)
            : 0.3;

        const dayProgress = (hour - sunriseHour) / (sunsetHour - sunriseHour);

        const horizonDistance = screenWidth / 1000;
        const sunPositionX = horizonDistance * dayProgress;

        const maxArcHeight = 2;
        const sunPositionY = Math.sin(dayProgress * Math.PI) * maxArcHeight;

        return {
            celestialColor,
            lightIntensity: computedLightIntensity,
            sunPositionX,
            sunPositionY,
        };
    };

    const {
        celestialColor,
        lightIntensity: targetIntensity,
        sunPositionX,
        sunPositionY,
    } = getLighting();

    useEffect(() => {
        const intensityInterval = setInterval(() => {
            setLightIntensity((current) =>
                Math.abs(current - targetIntensity) < 0.01
                    ? targetIntensity
                    : current + (targetIntensity - current) * 0.1
            );
        }, 100);
        return () => clearInterval(intensityInterval);
    }, [targetIntensity]);

    return (
        <motion.group>
            <motion.pointLight
                color={celestialColor}
                position={[sunPositionX, sunPositionY, -5.5]}
                animate={{
                    x: sunPositionX,
                    y: sunPositionY,
                }}
                transition={{
                    position: {
                        type: "spring",
                        duration: 1.5,
                    },
                }}
                intensity={lightIntensity}
            />
        </motion.group>
    );
};

export default Celestial;