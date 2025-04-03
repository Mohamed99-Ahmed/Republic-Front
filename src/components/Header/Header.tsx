"use client";

const videoUrl = "/vidios/burgerVid.mp4";

// Import Swiper React components


export default function Header() {
  return (
    <>
          <header className="home ">
          <div className="vidioBurger ">
        <video src={videoUrl} autoPlay loop muted></video>
        </div>
    </header>
    </>
  )
}
