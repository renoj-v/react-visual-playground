import { motion } from "motion/react";


function MotionDiv() {

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#ff0088",
        borderRadius: 5
    };

    return <motion.div
            style={box}
            animate={{ 
                rotate: [-180, 0, 720], 
                x: [0, null, "50vw", null] }
            }
            transition={{ 
                rotate: {
                    duration: 5, 
                    times: [0, 2, 1], 
                    ease: ["easeIn", "linear", "easeOut"]
                },
                x: {
                    duration: 5, 
                    times: [0, .4, 1, 1], 
                    ease: ["easeOut", "easeIn", "easeInOut", "easeOut"]
                }
            }}
        />;
}



export { MotionDiv };
