# API Documentation - Placeholder

This demo is client-only. Example API routes for a production system:

GET /api/aoi -> returns list of AOIs
POST /api/aoi -> create new AOI (body: GeoJSON)
GET /api/aoi/:id -> fetch AOI
PUT /api/aoi/:id -> update AOI
DELETE /api/aoi/:id -> delete AOI

Responses (example):
GET /api/aoi
200 OK
[
  { "id": "uuid", "name": "AOI 1", "createdAt": "...", "geojson": { ... }, "meta": { } }
]
