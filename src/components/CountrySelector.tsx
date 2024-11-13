import { FC, useState } from "react";
import { motion } from "framer-motion";
import { timezoneCities } from "../utils/timezoneCities";

type TimezoneSelectorProps = {
    onSelectCountry: (timezone: string) => void;
};

const TimezoneSelector: FC<TimezoneSelectorProps> = ({ onSelectCountry }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOverlay = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleOverlay}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#FFF",
                    fontSize: "30px",
                    cursor: "pointer",
                    zIndex: 1001,
                }}
            >
                {isOpen ? "✖" : "☰"}
            </button>

            {isOpen && (
                <motion.div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        overflow: "auto",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        style={{
                            background: "#333",
                            padding: "20px",
                            boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "20px",
                            width: "100%",
                            maxWidth: "800px",
                            overflow: "auto",
                        }}
                    >
                        {timezoneCities.map((country) => (
                            <div
                                key={country.timezone}
                                style={{
                                    backgroundColor: "#444",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    fontSize: "16px",
                                    color: "#FFF",
                                    transition: "transform 0.3s",
                                }}
                                onClick={() => {
                                    onSelectCountry(country.timezone);
                                    toggleOverlay();
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(1.1)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(1)")
                                }
                            >
                                {country.city}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default TimezoneSelector;
