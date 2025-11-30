import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  Marker,
  Polygon,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WMS_URL = "https://www.wms.nrw.de/geobasis/wms_nw_dop";

type LatLng = [number, number];

function ClickHandler({
  drawing,
  addPoint
}: {
  drawing: boolean;
  addPoint: (p: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      if (drawing) {
        addPoint([e.latlng.lat, e.latlng.lng]);
      }
    }
  });

  return null;
}

export default function MapView() {
  const [drawing, setDrawing] = useState(false);
  const [current, setCurrent] = useState<LatLng[]>([]);
  const [polygons, setPolygons] = useState<LatLng[][]>([]);
  const [showWms, setShowWms] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);

  // needed for Playwright test
  useEffect(() => {
    const el = document.getElementById("wmsToggle") as HTMLInputElement | null;
    if (el) setShowWms(el.checked);

    const sync = () => setShowWms(el?.checked ?? true);
    el?.addEventListener("change", sync);

    return () => el?.removeEventListener("change", sync);
  }, []);

  // sync sidebar draw toggle
  useEffect(() => {
    const el = document.getElementById("drawToggle") as HTMLInputElement | null;
    if (el) setShowPolygons(el.checked);

    const sync = () => setShowPolygons(el?.checked ?? true);
    el?.addEventListener("change", sync);

    return () => el?.removeEventListener("change", sync);
  }, []);

  function addPoint(p: LatLng) {
    setCurrent((prev) => [...prev, p]);
  }

  function finish() {
    if (current.length < 3) return;
    setPolygons((prev) => [...prev, current]);
    setCurrent([]);
    setDrawing(false);
  }

  function cancel() {
    setCurrent([]);
    setDrawing(false);
  }

  function clearAll() {
    setCurrent([]);
    setPolygons([]);
  }

  // Wire sidebar buttons to map state (draw, finish, cancel)
  useEffect(() => {
    const drawBtnEl = document.getElementById('drawModeBtn') as HTMLButtonElement | null;
    const finishEl = document.getElementById('finishBtn') as HTMLButtonElement | null;
    const cancelEl = document.getElementById('cancelBtn') as HTMLButtonElement | null;

    const updateUI = () => {
      if (drawBtnEl) drawBtnEl.textContent = drawing ? 'Drawing…' : 'Draw AOI';
      if (finishEl) finishEl.disabled = current.length < 3;
    };

    updateUI();

    const onDrawClick = () => setDrawing((d) => !d);
    const onFinishClick = () => finish();
    const onCancelClick = () => cancel();

    drawBtnEl?.addEventListener('click', onDrawClick);
    finishEl?.addEventListener('click', onFinishClick);
    cancelEl?.addEventListener('click', onCancelClick);

    return () => {
      drawBtnEl?.removeEventListener('click', onDrawClick);
      finishEl?.removeEventListener('click', onFinishClick);
      cancelEl?.removeEventListener('click', onCancelClick);
    };
  }, [drawing, current]);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[51.45, 7.0]}
        zoom={11}
        className="w-full h-full"
        id="leaflet-map"
      >
        <ClickHandler drawing={drawing} addPoint={addPoint} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
        />

        {showWms && (
          <WMSTileLayer
            url={WMS_URL}
            layers="wms_nw_dop"
            format="image/png"
            transparent
          />
        )}

        {showPolygons &&
          polygons.map((poly, idx) => (
            <Polygon
              key={idx}
              positions={poly}
              pathOptions={{ color: "#f59e0b" }}
            />
          ))}

        {current.length > 0 && (
          <>
            <Polygon
              positions={current}
              pathOptions={{ color: "#ef4444", dashArray: "6" }}
            />
            {current.map((p, i) => (
              <Marker key={i} position={p} />
            ))}
          </>
        )}
      </MapContainer>

      {/* Controls removed from map overlay - sidebar provides controls now */}
    </div>
  );
}
