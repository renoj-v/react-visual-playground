import { motion } from "motion/react";
import { useState } from "react";


function MotionDiv() {
    const [bgColor, setBGColor] = useState("#ff0088");

    const box = {
        width: 100,
        height: 100,
        backgroundColor: bgColor,
        borderRadius: 5
    }

    const timer = setTimeout(() => setTimeout(() => {setBGColor("#00ff88")}), 3000)
    return <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />;
}



export default MotionDiv;