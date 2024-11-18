import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { timezoneCities } from "../utils/timezoneCities";

type TimezoneSelectorProps = {
    onSelectCountry: (timezone: string) => void;
};

const TimezoneSelector: FC<TimezoneSelectorProps> = ({ onSelectCountry }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState("New York");
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const toggleOverlay = () => setIsOpen(!isOpen);

    const handleTimezoneClick = (timezone: string, city: string) => {
        setSelectedTimezone(city);
        onSelectCountry(timezone);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                isOpen &&
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <div
                onClick={toggleOverlay}
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#222",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    color: "#FFF",
                    fontSize: "26px",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                }}
            >
                {selectedTimezone}
            </div>
            {isOpen && (
                <motion.div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: "center",
                        justifyContent: isMobile ? "flex-start" : "center",
                        padding: "20px",
                        zIndex: 1000,
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        ref={overlayRef}
                        style={{
                            width: isMobile ? "100%" : "80%",
                            maxWidth: "800px",
                            borderRadius: "10px",
                            padding: "15px",
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "1fr"
                                : "repeat(4, 1fr)",
                            gap: "15px",
                        }}
                    >
                        {timezoneCities.map((country) => (
                            <div
                                key={country.timezone}
                                style={{
                                    backgroundColor: "#444",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    color: "#FFF",
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                }}
                                onClick={() =>
                                    handleTimezoneClick(
                                        country.timezone,
                                        country.city
                                    )
                                }
                                onMouseDown={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(0.95)")
                                }
                                onMouseUp={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(1)")
                                }
                            >
                                {country.city}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default TimezoneSelector;
