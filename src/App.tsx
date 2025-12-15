import React, { ReactElement, Ref, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import img from './bardiel.18.video-poster.jpeg'

function Button ({staticcanvas}:Props){
  let [placeholder, setph] = useState({ph: 'on', status: false})
  const button = useRef(null)

  function changePh(){
    if(!staticcanvas.current)return
    if (!placeholder.status){
      setph({ph: 'off', status: true})
      staticcanvas.current.style.setProperty('--opacity', '0')
    } else {
      setph({ph: 'on', status: false})
      staticcanvas.current.style.setProperty('--opacity', '1')
    }
  }

  return(
    <>
    <div className="button_cont">
      <button className='init' onClick={changePh} ref={button}>{placeholder.ph}</button>
    </div></>
  )
}

interface Props {
  staticcanvas: React.RefObject<HTMLDivElement>;
}

function Canvas({staticcanvas}:Props) {

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  
  const bardiel = useRef(new Image())

  let amp: number
  let speed: number
  let scale:number

  const setSize = useCallback((canvas: HTMLCanvasElement|null):void=>{
    window.innerWidth < 1250 ? amp = 1280 / window.innerWidth * 0.4 : amp = 1.28
    // than bigger 0.4 than bigger amp (pervious value - 0.35)
    window.innerWidth < 1250 ? speed = window.innerWidth / 1280 * 4 * 0.05 : speed = 0.04//3 или 4 или 5  вмето 2 
    let width = window.innerWidth
    let height = window.innerHeight

    let imgwidth = bardiel.current.naturalWidth
    let imgheight = bardiel.current.naturalHeight

    scale = height/imgheight
    scale = Number(scale.toFixed(2))
    console.log(scale)

    if (canvas && staticcanvas.current){
      canvas.height = height
      let newwidth:number = Math.floor(bardiel.current.naturalWidth*scale)
      canvas.width = newwidth
      staticcanvas.current.style.setProperty('--height', height+'px')
      staticcanvas.current.style.setProperty('--width', newwidth+'px')
    }
  },[])

  useEffect(()=>{

    if (canvas.current
      ){
       context.current=canvas.current.getContext('2d')
       console.log(context.current)
    }

    let vawe = 5
    let time = 0.05
    
    let period: number = 5
    // than smaller - than more frequence
    
    let bardiel2:HTMLImageElement, context2:CanvasRenderingContext2D, canvas2:HTMLCanvasElement
    
    let raf: number

    if(context.current && bardiel.current && canvas.current){
        bardiel.current.src = img
        bardiel2 = bardiel.current
        context2 = context.current
        canvas2 = canvas.current
        bardiel2.onload = () => {
          math_magic()
        }
      
        window.addEventListener('resize',()=> {
          setSize(canvas.current)
        })

    function math_magic(){
      setSize(canvas.current)
      animate()
    }

    function animate(){
      context2.clearRect(0,0,canvas2.width, canvas2.height)
      context2.drawImage(bardiel2,0,0, canvas2.width, canvas2.height)
      for(let y=canvas2.height/2; y < canvas2.height; y+=vawe ){
        let offset = Math.sin(3.14+y/period+time)*amp
        context2.drawImage(bardiel2, 
         0, y/scale, canvas2.width/scale, vawe/scale,
         offset, y, canvas2.width, vawe )
      }
      time+=speed
      raf = requestAnimationFrame(animate)
    }
    
    }

    return()=> {
       window.removeEventListener('resize', ()=>{
        setSize(canvas.current)
      })
       cancelAnimationFrame(raf)
    }
  },[])

  return(
    <div className="canvas_cont">
    <canvas ref={canvas}>
    </canvas>
    <div className="static" ref={staticcanvas}></div>
    <div className="blur_sides"></div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const staticcanvas = useRef<HTMLDivElement | null>(null);

  return (
    <div className="App">
      <header>
        <Button staticcanvas={staticcanvas}></Button>
        <div className="description">I'm using a sine with params and canvas scaling to create this effect</div>
      </header>
      <div className="outter">
        <Canvas staticcanvas={staticcanvas}></Canvas>
      </div>
          </div>
  )
}

export default App
