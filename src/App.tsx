import React from "react";
import MapView from "./components/MapView";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white">
            <span></span>
          </div>
          <h1 className="text-xl font-semibold text-gray-700">AOI Creation</h1>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 h-full">
        <aside className="col-span-4 bg-white border-r p-6 overflow-y-auto">
          <button className="flex items-center gap-2 text-orange-500 mb-4">
            <span className="text-lg">←</span>
            <span className="font-medium">Define Area of Interest</span>
          </button>

          <h2 className="text-2xl font-bold mb-1">Define the area</h2>
          <p className="text-gray-600 mb-6">where you will apply your object count and detection model</p>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Options:</label>

            <div className="border rounded-xl p-4 bg-amber-50">
              <input
                id="aoiSearch"
                placeholder="Search for a city, town... or draw area on map"
                className="bg-transparent outline-none w-full text-sm text-gray-700"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value;
                    window.dispatchEvent(new CustomEvent("aoi:search", { detail: { q } }));
                  }
                }}
              />
            </div>

            <button className="w-full text-left rounded-xl p-4 bg-amber-100 border border-amber-200">Uploading a shape file</button>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Layers</h3>
              <label className="flex items-center gap-2">
                <input id="wmsToggle" type="checkbox" defaultChecked />
                <span>WMS DOP Layer</span>
              </label>

              <label className="flex items-center gap-2 mt-2">
                <input id="drawToggle" type="checkbox" />
                <span>Show drawn AOIs</span>
              </label>

              {/* Draw controls in sidebar */}
              <div className="mt-3 flex flex-col gap-2">
                <button id="drawModeBtn" className="px-3 py-1 rounded bg-gray-100 text-left">Draw AOI</button>
                <div className="flex gap-2">
                  <button id="finishBtn" disabled className="px-3 py-1 bg-gray-100 rounded">Finish</button>
                  <button id="cancelBtn" className="px-3 py-1 bg-gray-100 rounded">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Map Area */}
        <section className="col-span-8 h-full">
          <MapView />
        </section>
      </main>
    </div>
  );
}
