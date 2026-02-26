import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [beePosition, setBeePosition] = useState({ x: -100, y: 200 });
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlying(true);
      let x = -100;
      const interval = setInterval(() => {
        x += 3;
        setBeePosition({ x, y: 200 + Math.sin(x / 30) * 20 });
        if (x > window.innerWidth + 100) {
          clearInterval(interval);
          setIsFlying(false);
        }
      }, 16);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 dark:from-green-950 dark:to-green-900 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated bee */}
      {isFlying && (
        <div
          className="fixed pointer-events-none text-4xl z-50 transition-none"
          style={{ left: beePosition.x, top: beePosition.y }}
        >
          🐝
        </div>
      )}

      {/* Decorative flowers */}
      <div className="absolute bottom-0 left-0 text-6xl opacity-30 select-none">🌻🌿🌸🌱🌺</div>
      <div className="absolute bottom-0 right-0 text-6xl opacity-30 select-none">🌺🌱🌸🌿🌻</div>

      {/* Main content */}
      <div className="text-center max-w-lg z-10">
        <div className="text-8xl mb-4 animate-bounce">🐝</div>

        <h1 className="text-6xl font-bold text-green-800 dark:text-green-200 mb-2">
          Bee Right Back!
        </h1>

        <div className="text-2xl text-yellow-600 dark:text-yellow-400 font-semibold mb-6">
          404 — Page Not Found
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          Oops! This page seems to have <span className="font-semibold text-green-700 dark:text-green-300">buzzed off</span> somewhere. Our bees are working hard to find it!
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-base mb-8">
          🌱 We're still planting some pages — check back soon!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1">
              🏡 Take Me Home
            </button>
          </Link>
          <Link href="/#waitlist">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1">
              🌿 Join Waitlist
            </button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-400 dark:text-gray-500 italic">
          "Not all who wander are lost — but this page definitely is." 🍃
        </div>
      </div>
    </div>
  );
}
