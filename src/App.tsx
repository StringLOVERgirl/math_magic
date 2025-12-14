import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import img from './bardiel.18.video-poster.jpeg'

function Canvas() {

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  
  const bardiel = useRef(new Image())

  function resize(){

  }

  useLayoutEffect(()=>{

    if (canvas.current){
       context.current=canvas.current.getContext('2d')
       console.log(context.current)
    }

    let vawe = 5
    let time = 0.05
    let amp: number
    window.innerWidth < 1250 ? amp = 1280 / window.innerWidth : 1
    let bardiel2:HTMLImageElement, context2:CanvasRenderingContext2D, canvas2:HTMLCanvasElement
    let scale:number
    let setSize:any

    if(context.current && bardiel.current && canvas.current){
       bardiel.current.src = img
       bardiel2 = bardiel.current
       context2 = context.current
       canvas2 = canvas.current
       bardiel2.onload = () => {
         math_magic()
       }

        setSize=()=>{
          window.innerWidth < 1250 ? amp = 1280 / window.innerWidth * 0.4 : amp = 1
          window.innerWidth < 1250 ? time =  window.innerWidth / 1280 * 0.4 : time = 0.05
        let width = window.innerWidth
        let height = window.innerHeight
  
        let imgwidth = bardiel.current.naturalWidth
        let imgheight = bardiel.current.naturalHeight
  
        scale = height/imgheight
        scale = Number(scale.toFixed(2))
        console.log(scale)
        if (canvas.current){
          canvas.current.height = height
          canvas.current.width = bardiel.current.naturalWidth*scale
        }
       }
       window.addEventListener('resize', setSize)

    function math_magic(){
    

     setSize()
      animate()
    }

    function animate(){
      context2.clearRect(0,0,canvas2.width, canvas2.height)
      context2.drawImage(bardiel2,0,0, canvas2.width, canvas2.height)
      for(let y=canvas2.height/2; y < canvas2.height; y+=vawe ){
        let offset = Math.sin(3.14+y/20+time)*amp
        context2.drawImage(bardiel2, 0, y/scale, canvas2.width/scale, vawe/scale,
         offset, y, canvas2.width, vawe )
         console.log(offset)
      }
      time+=0.05
      requestAnimationFrame(animate)
    }
    
    }

    return()=>
    window.removeEventListener('resize', setSize)
  },[])

  return(
    <div className="canvas_cont">
    <canvas ref={canvas}></canvas>
    <div className="blur_sides"></div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="outter">
        <Canvas></Canvas>
      </div>
          </div>
  )
}

export default App
