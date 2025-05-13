import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";


function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-4 sm:p-6 md:p-8 flex justify-between items-center z-50">
            <div className="brand text-xl sm:text-2xl font-md">thirtysixstudios</div>
            <div className="links sm:flex flex-col sm:flex-row hidden gap-4 sm:gap-10 text-sm sm:text-md">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full mt-[180px] sm:mt-0 px-6 sm:px-12 md:px-[20%]">
            <div className="text w-full sm:w-[80%] md:w-[50%]">
              <h3 className="text-2xl sm:text-3xl md:text-4xl leading-snug">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-base sm:text-lg w-full sm:w-[90%] md:w-[80%] mt-6 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-sm sm:text-md mt-6">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <div className="ml-[300px]  flex items-center cursor-pointer">
                <span className="text-base mt-[170px] sm:text-lg">Click i</span>
                
              </div>
            <h1
              ref={headingref}
              className="text-6xl sm:text-[10rem] md:text-[15rem] cursor-pointer font-normal tracking-tight leading-none pl-2 sm:pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen mt-32 px-4 sm:px-6 md:px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <h1 className="text-4xl sm:text-6xl md:text-8xl tracking-tighter">
          about the brand
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed w-full sm:w-[90%] md:w-[80%] mt-6 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-full sm:w-[90%] md:w-[80%] mt-6"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
}

export default App;
