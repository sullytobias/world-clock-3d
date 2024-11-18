import { FC, useState, useEffect } from "react";
import { DateTime } from "luxon";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

type DigitalClockProps = {
    timezone: string;
};

const DigitalClock: FC<DigitalClockProps> = ({ timezone }) => {
    const [time, setTime] = useState<string>("00:00:00");
    const [prevTime, setPrevTime] = useState<string>("00:00:00");

    const { size } = useThree();
    const isMobile = size.width <= 768;

    const fontSize = Math.min(size.width, size.height) / (isMobile ? 260 : 240);

    useEffect(() => {
        const updateTime = () => {
            const currentTime = DateTime.now()
                .setZone(timezone)
                .toFormat("HH:mm:ss");
            if (currentTime !== time) {
                setPrevTime(time);
                setTime(currentTime);
            }
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [timezone, time]);

    const timeChars = time.split("");
    const prevTimeChars = prevTime.split("");

    const charWidth = fontSize * 0.8;
    const totalWidth = timeChars.length * charWidth;
    const offset = -totalWidth / 5 + charWidth / 2;

    return (
        <group position={[offset, 0.5, 0]} scale={0.3}>
            {timeChars.map((char, index) => {
                const prevChar = prevTimeChars[index] || "";
                const hasChanged = prevChar !== char;

                const animateY =
                    hasChanged && index !== timeChars.length - 1 ? 0 : -2;

                return (
                    <motion.mesh
                        key={index}
                        initial={{ y: animateY }}
                        animate={{ y: animateY }}
                        transition={{
                            type: "spring",
                            stiffness: 800,
                            damping: 30,
                        }}
                        exit={{ opacity: 0, y: 2 }}
                        position={[index * charWidth, 0, 0]}
                    >
                        <Text
                            fontSize={fontSize > 3 ? 2.5 : fontSize}
                            anchorX="center"
                            anchorY="middle"
                            color="#FFD700"
                            outlineWidth={fontSize * 0.03}
                            outlineColor="#000"
                        >
                            {char}
                        </Text>
                        <meshStandardMaterial
                            attach="material"
                            emissive="#FF5733"
                            metalness={0.5}
                            roughness={0.2}
                        />
                    </motion.mesh>
                );
            })}
        </group>
    );
};

export default DigitalClock;