import { useRef, useEffect, useState } from "react"

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}) {
  const canvasRef = useRef(null)
  const requestRef = useRef()
  const gridOffset = useRef({ x: 0, y: 0 })
  const [hoveredSquare, setHoveredSquare] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set proper positioning for canvas
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.zIndex = "-1" // Puts it behind everything

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 🌟 Background first (so it stays behind the grid)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      )
      gradient.addColorStop(0, "rgba(6, 6, 6, 1)") // Solid Black at center
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)") // Dark Black outer

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 🎨 Draw Grid
      ctx.lineWidth = 0.5
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize)
          const squareY = y - (gridOffset.current.y % squareSize)

          if (hoveredSquare?.x === Math.floor((x - startX) / squareSize) &&
              hoveredSquare?.y === Math.floor((y - startY) / squareSize)) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(squareX, squareY, squareSize, squareSize)
          }

          ctx.strokeStyle = borderColor
          ctx.strokeRect(squareX, squareY, squareSize, squareSize)
        }
      }
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1)
      if (direction === "right") gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
      if (direction === "left") gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize
      if (direction === "up") gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize
      if (direction === "down") gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
      if (direction === "diagonal") {
        gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
        gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
      }

      drawGrid()
      requestRef.current = requestAnimationFrame(updateAnimation)
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      setHoveredSquare({
        x: Math.floor(mouseX / squareSize),
        y: Math.floor(mouseY / squareSize),
      })
    }

    const handleMouseLeave = () => setHoveredSquare(null)

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    resizeCanvas()
    requestRef.current = requestAnimationFrame(updateAnimation)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(requestRef.current)
    }
  }, [direction, speed, borderColor, hoverFillColor, squareSize])

  return <canvas ref={canvasRef} className={className} />
}
