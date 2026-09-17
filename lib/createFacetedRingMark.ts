import * as THREE from "three";

const R = 0.68;
const TUBE = 0.33;
const TUBULAR = 10;
const RADIAL = 5;
const TWIST = (Math.PI * 2) / RADIAL;

function torusPoint(u: number, v: number, target: THREE.Vector3): THREE.Vector3 {
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const cv = Math.cos(v);
  const sv = Math.sin(v);
  return target.set((R + TUBE * cv) * cu, (R + TUBE * cv) * su, TUBE * sv);
}

export function createPentagonTorusGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const d = new THREE.Vector3();
  const n = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ad = new THREE.Vector3();
  const light = new THREE.Vector3(0.35, 0.55, 0.75).normalize();
  const dark = new THREE.Color(0x0c1014);
  const lit = new THREE.Color(0x1a2a2e);
  const faceColor = new THREE.Color();

  function pushFace(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
    ab.subVectors(p1, p0);
    ad.subVectors(p3, p0);
    n.crossVectors(ab, ad).normalize();
    const facing = Math.max(0, n.dot(light));
    faceColor.copy(dark).lerp(lit, 0.15 + facing * 0.85);
    const verts = [p0, p1, p2, p0, p2, p3];
    for (const p of verts) {
      positions.push(p.x, p.y, p.z);
      normals.push(n.x, n.y, n.z);
      colors.push(faceColor.r, faceColor.g, faceColor.b);
    }
  }

  for (let i = 0; i < TUBULAR; i += 1) {
    const u0 = (i / TUBULAR) * Math.PI * 2;
    const u1 = ((i + 1) / TUBULAR) * Math.PI * 2;
    const tw0 = (i / TUBULAR) * TWIST;
    const tw1 = ((i + 1) / TUBULAR) * TWIST;
    for (let j = 0; j < RADIAL; j += 1) {
      const v0 = (j / RADIAL) * Math.PI * 2;
      const v1 = ((j + 1) / RADIAL) * Math.PI * 2;
      torusPoint(u0, v0 + tw0, a);
      torusPoint(u1, v0 + tw1, b);
      torusPoint(u1, v1 + tw1, c);
      torusPoint(u0, v1 + tw0, d);
      pushFace(a.clone(), b.clone(), c.clone(), d.clone());
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

function crystalGeometry(): THREE.BufferGeometry {
  const pts = [
    new THREE.Vector2(0.0008, -0.5),
    new THREE.Vector2(0.19, -0.12),
    new THREE.Vector2(0.265, 0),
    new THREE.Vector2(0.17, 0.18),
    new THREE.Vector2(0.0008, 0.48),
  ];
  const geo = new THREE.LatheGeometry(pts, 4);
  geo.computeVertexNormals();
  return geo;
}

function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }
  const gradient = ctx.createRadialGradient(128, 128, 2, 128, 128, 128);
  gradient.addColorStop(0, "rgba(247,255,255,0.95)");
  gradient.addColorStop(0.14, "rgba(62,224,232,0.7)");
  gradient.addColorStop(0.38, "rgba(43,212,217,0.22)");
  gradient.addColorStop(1, "rgba(10,40,42,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createFacetedRing(): THREE.Group {
  const root = new THREE.Group();
  root.name = "faceted-ring";
  const geo = createPentagonTorusGeometry();
  const ring = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      metalness: 0.92,
      roughness: 0.32,
      flatShading: true,
      envMapIntensity: 0,
      clearcoat: 0.18,
      clearcoatRoughness: 0.4,
      transparent: true,
      opacity: 1,
    }),
  );
  ring.name = "ring-mesh";
  ring.castShadow = true;
  ring.receiveShadow = true;
  root.add(ring);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 12),
    new THREE.LineBasicMaterial({
      color: 0x2bd4d9,
      transparent: true,
      opacity: 0.72,
      toneMapped: false,
    }),
  );
  edges.name = "ring-edges";
  root.add(edges);
  return root;
}

export function createEyeCrystal(): THREE.Group {
  const group = new THREE.Group();
  group.name = "eye-crystal";
  const geo = crystalGeometry();

  const socket = new THREE.Mesh(
    new THREE.CircleGeometry(0.22, 48),
    new THREE.MeshBasicMaterial({
      color: 0x03080a,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    }),
  );
  socket.name = "eye-socket";
  group.add(socket);

  const iris = new THREE.Mesh(
    new THREE.TorusGeometry(0.155, 0.01, 12, 64),
    new THREE.MeshBasicMaterial({
      color: 0x2bd4d9,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    }),
  );
  iris.name = "iris-ring";
  group.add(iris);

  const irisInner = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.005, 8, 48),
    new THREE.MeshBasicMaterial({
      color: 0x8ff7fb,
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
    }),
  );
  irisInner.name = "iris-inner";
  group.add(irisInner);

  const crystal = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({
      color: 0x3ee0e8,
      emissive: new THREE.Color(0x2bd4d9),
      emissiveIntensity: 5.2,
      metalness: 0.06,
      roughness: 0.05,
      transmission: 0.22,
      thickness: 0.7,
      ior: 2.417,
      transparent: true,
      envMapIntensity: 0,
    }),
  );
  crystal.name = "pupil";
  crystal.rotation.y = Math.PI / 4;
  crystal.scale.set(0.52, 0.5, 0.36);
  group.add(crystal);

  const core = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: 0xc8ffff, toneMapped: false }),
  );
  core.name = "pupil-core";
  core.scale.set(0.2, 0.34, 0.14);
  core.rotation.y = Math.PI / 4;
  group.add(core);

  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 12),
    new THREE.LineBasicMaterial({ color: 0xe8ffff, toneMapped: false }),
  );
  cage.rotation.y = Math.PI / 4;
  cage.scale.copy(crystal.scale);
  group.add(cage);

  const glowTex = createGlowTexture();
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    color: 0x3ee0e8,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.name = "eye-glow";
  glow.userData.role = "glow";
  glow.userData.maxOpacity = 0.75;
  glow.scale.set(1.45, 1.45, 1);
  group.add(glow);

  const glowSoft = new THREE.Sprite(glowMat.clone());
  glowSoft.name = "eye-glow-soft";
  glowSoft.userData.role = "glow";
  glowSoft.userData.maxOpacity = 0.28;
  glowSoft.scale.set(2.4, 2.4, 1);
  group.add(glowSoft);

  return group;
}

export function createFacetedRingMark(): THREE.Group {
  const root = new THREE.Group();
  root.name = "aetherline-faceted-ring";
  root.add(createFacetedRing());
  root.add(createEyeCrystal());
  return root;
}

export function createMobiusHoneycombMark(): THREE.Group {
  return createFacetedRingMark();
}

export function createHoneycombTorusMark(): THREE.Group {
  return createFacetedRingMark();
}
