import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="border-t-2 border-gray-200 mt-16 py-14 pb-32 text-sm text-gray-500 bg-gray-50/50">
      <div className="container grid md:grid-cols-4 gap-8">
        <div>
          <b className="text-gray-900">HANOI HERITAGE</b>
          <p className="mt-3 leading-relaxed">
            An open audio guide for curious travelers and local storytellers.
          </p>
        </div>
        <div>
          <b className="text-gray-900">Explore</b>
          <div className="mt-3 grid gap-2">
            <Link to="/">Explore sites</Link>
            <Link to="/map">Interactive map</Link>
            <Link to="/favorites">Saved guides</Link>
          </div>
        </div>
        <div>
          <b className="text-gray-900">Heritage</b>
          <p className="mt-3">
            Old Quarter · Hoan Kiem · Thang Long · West Lake
          </p>
        </div>
        <div>
          <b className="text-gray-900">Built for Hanoi</b>
          <p className="mt-3">Web now, React Native ready. © 2026</p>
        </div>
      </div>
    </footer>
  );
}
