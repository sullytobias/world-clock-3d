import { FC, useState, useEffect } from "react";
import { DateTime } from "luxon";
import { motion } from "framer-motion-3d"; 
import { Text } from "@react-three/drei"; 

type DigitalClockProps = {
  timezone: string;
};

const DigitalClock: FC<DigitalClockProps> = ({ timezone }) => {
  const [time, setTime] = useState<string>("00:00:00");
  const [prevTime, setPrevTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = DateTime.now().setZone(timezone).toFormat("HH:mm:ss");
      if (currentTime !== prevTime) {
        setPrevTime(time); 
        setTime(currentTime); 
      }
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timezone, prevTime, time]);

  const timeChars = time.split(""); 
  const prevTimeChars = prevTime.split(""); 

  const totalWidth = timeChars.length * 1.5;
  const offset = -totalWidth / 8;

  return (
    <group position={[offset, 0, 0]} scale={0.3}>
      {timeChars.map((char, index) => {
        const prevChar = prevTimeChars[index] || ""; 
        const hasChanged = prevChar !== char && index !== prevTimeChars.length -1; 

        return (
            <motion.mesh
                key={index}
                initial={{ y: 0 }}
                animate={{
                    y: hasChanged ? 0 : -2,
                    transition: {
                        type: "spring",
                        stiffness: 1000,
                        damping: 30,
                    },
                }}
                exit={{ opacity: 0, y: 2 }}
                position={[index * 1.5, 0, 0]}
            >
                <Text fontSize={2} anchorX="center" anchorY="middle">
                    {char}
                </Text>
            </motion.mesh>
        );
      })}
    </group>
  );
};

export default DigitalClock;