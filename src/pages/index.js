import { useEffect, useState } from "react"
import React from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/JavaScript-logo.png"

export default function Home() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [directionX, setDirectionX] = useState(1)
  const [directionY, setDirectionY] = useState(1)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const moveImage = () => {
      let newX = x + directionX * 5 // Change '5' to adjust logo speed
      let newY = y + directionY * 5

      if (newX < 0 || newX > viewportWidth - 100) {
        setDirectionX(-Math.sign(Math.random() - 0.5)) // Generate a random direction after bouncing
        newX = x + directionX * 5
      } else {
        setX(newX)
      }

      if (newY < 0 || newY > viewportHeight - 100) {
        setDirectionY(-Math.sign(Math.random() - 0.5)) // Generate a random direction after bouncing
        newY = y + directionY * 5
      } else {
        setY(newY)
      }
    }

    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setViewportHeight(window.innerHeight)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    const interval = setInterval(moveImage, 20) // Change '20' to adjust speed

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [x, y, directionX, directionY]) // Weep at the altar

  return (
    <>
      <Head>
        <title>Is Javascript Good Yet?</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg">
        <Image
          className="absolute"
          style={{ top: y, left: x }}
          src={Logo}
          width="100"
          height="100"
          alt="Js Logo"
        />
        <div className="relative w-full h-full text-center m-auto">
          <h1 className="text-9xl text-white">No.</h1>
          <p>
            made with hate by{" "}
            <Link href="https://github.com/Milksheyke" className="underline">
              Milksheyke
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
