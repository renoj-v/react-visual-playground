// import { BackgroundScreen } from './components/BackgroundScreen';
import MotionDiv from './components/MotionLibrary';
import { ReactLenis, useLenis } from 'lenis/react';


function App() {
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis)
  })
  return (
  <div>
    <ReactLenis root/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
    <MotionDiv/>
  </div>
  )
}

export default App;
