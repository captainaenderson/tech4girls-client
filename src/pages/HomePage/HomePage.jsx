import "./HomePage.css";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <>
<div className="relative">
  <h1 className=" font-sans font-bold text-white absolute z-10 text-6xl ml-16 top-16">
    Code like a Girl
  </h1>
  <Link 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute z-10 top-40 ml-16 shadow-md" 
    to="/signup"
  >
    Melde dich jetzt an!
  </Link>
  <Spline
    className="relative z-0"
    scene="https://prod.spline.design/SrNNLCx9npX1eTuZ/scene.splinecode"
  />
<div className="bg-purple-900 h-auto flex flex-col md:flex-row items-start p-8">
  <div className="flex-1">
    <h1 className="font-bold text-white text-4xl">So funktionierts</h1>
    <p className="text-white mt-8">Die Online Kurse finden über einen Zeitraum von 8 Wochen wöchentlich in einer Doppelstunde statt. Mitmachen können alle Mädchen, die bereits selbstständig tippen können und in einem Browser zu einer Webseite navigieren können. Auch die Teilnahme über ein Videokonferenz-Tool muss möglich sein inklusive Laptop/PC, ausreichender Internetverbindung, Kamera und Mikrofon.

Kursstart für den aktuellen Kurs wird festgelegt, sobald mindestens 6 Kinder angemeldet sind.</p>
  </div>
  <div className="flex-1">
    <Spline scene="https://prod.spline.design/b2QQ1tQXXxs4sKsm/scene.splinecode" />
  </div>
</div>

</div>



    </>
  );
}

export default HomePage;
