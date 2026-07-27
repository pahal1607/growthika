'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
function Orb(){
  const ref=useRef<THREE.Mesh>(null)
  useFrame((state,delta)=>{ if(ref.current){ref.current.rotation.x+=delta*.14;ref.current.rotation.y+=delta*.22;ref.current.position.y=Math.sin(state.clock.elapsedTime*.7)*.12} })
  return <mesh ref={ref}><icosahedronGeometry args={[1.45,3]}/><meshStandardMaterial color="#ff7a18" roughness={.25} metalness={.75} wireframe/></mesh>
}
function Rings(){ const ref=useRef<THREE.Group>(null); useFrame((_,d)=>{if(ref.current) ref.current.rotation.z+=d*.08}); return <group ref={ref}>{[1.8,2.25,2.7].map((r,i)=><mesh key={r} rotation={[Math.PI/2+i*.35,i*.2,0]}><torusGeometry args={[r,.018,12,120]}/><meshBasicMaterial color={i===0?'#ff7a18':'#6d6d78'} transparent opacity={.55}/></mesh>)}</group> }
export default function Hero3D(){return <div className="hero3d" aria-hidden><Canvas dpr={[1,1.5]} camera={{position:[0,0,6],fov:45}}><ambientLight intensity={1.1}/><directionalLight position={[3,4,5]} intensity={4}/><Orb/><Rings/></Canvas></div>}
