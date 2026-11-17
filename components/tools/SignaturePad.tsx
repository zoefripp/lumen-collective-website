"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number }; // 0..1 of the pad's width and height
type Props = {
  label: string;
  invalid?: boolean;
  onChange: (dataUrl: string | undefined) => void;
};

// Sign with a finger, Apple Pencil or mouse. Strokes are kept as proportions
// of the pad so the signature survives the iPad being rotated.
export default function SignaturePad({ label, invalid, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Point[][]>([]);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.lineWidth = 2.4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#111827";
    context.fillStyle = "#111827";
    for (const stroke of strokes.current) {
      if (stroke.length === 1) {
        context.beginPath();
        context.arc(stroke[0].x * width, stroke[0].y * height, 1.4, 0, Math.PI * 2);
        context.fill();
        continue;
      }
      context.beginPath();
      stroke.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x * width, point.y * height);
        else context.lineTo(point.x * width, point.y * height);
      });
      context.stroke();
    }
  }, []);

  useEffect(() => {
    redraw();
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => redraw());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [redraw]);

  const pointFrom = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    strokes.current.push([pointFrom(event)]);
    redraw();
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    event.preventDefault();
    strokes.current[strokes.current.length - 1].push(pointFrom(event));
    redraw();
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    setHasInk(true);
    onChange(canvasRef.current?.toDataURL("image/png"));
  };

  const clear = () => {
    strokes.current = [];
    drawing.current = false;
    setHasInk(false);
    redraw();
    onChange(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-charcoal">{label}</span>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="text-sm font-medium text-teal disabled:text-gray-300 px-3 py-2 -mr-3"
        >
          Clear
        </button>
      </div>
      <div
        className={`relative rounded-xl border-2 bg-white ${
          invalid ? "border-red-500" : "border-gray-300"
        }`}
      >
        <canvas
          ref={canvasRef}
          aria-label={`${label} signature`}
          className="block w-full h-44 rounded-xl cursor-crosshair"
          style={{ touchAction: "none" }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
        {!hasInk && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Sign here with a finger or Apple Pencil
          </span>
        )}
        <span className="pointer-events-none absolute left-6 right-6 bottom-8 border-b border-gray-200" />
      </div>
    </div>
  );
}
