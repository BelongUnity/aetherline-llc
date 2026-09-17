import * as THREE from "three";

const R = 0.9;
const STRIP_W = 0.31;
const STRIP_T = 0.11;
const HEX = 0.026;
const WALL = 0.004;
const SHELL = 0.02;
const U_STEP = Math.sqrt(3) * HEX * 0.94;
const V_STEP = 1.5 * HEX * 0.94;
const NU = Math.round((Math.PI * 2 * R) / U_STEP);
const ELLIPSE_C =
  Math.PI *
  (3 * (STRIP_W + STRIP_T) -
    Math.sqrt((3 * STRIP_W + STRIP_T) * (STRIP_W + 3 * STRIP_T)));
const NV = Math.max(12, Math.round(ELLIPSE_C / V_STEP));
const COUNT = NU * NV;

const HIDDEN_CLAY = new Set([
  "root",
  "honeycomb-ribbon",
  "outer-ribbon-lip",
  "inner-aperture-lip",
  "diamond-reflection",
  "center-diamond",
]);

function hexPoints(radius: number): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i < 6; i += 1) {
    const a = Math.PI / 6 + (i / 6) * Math.PI * 2;
    pts.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));
  }
  return pts;
}

function hexRingGeometry(outer: number, inner: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape(hexPoints(outer));
  shape.holes.push(new THREE.Path(hexPoints(inner)));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    steps: 1,
    curveSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

/** Thick Möbius: circular centerline, elliptical section, half-twist. */
function mobiusPoint(u: number, v: number, target = new THREE.Vector3()): THREE.Vector3 {
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const twist = u / 2;
  const ct = Math.cos(twist);
  const st = Math.sin(twist);
  const cv = Math.cos(v);
  const sv = Math.sin(v);
  const nx = ct * cu;
  const ny = ct * su;
  const nz = st;
  const bx = -st * cu;
  const by = -st * su;
  const bz = ct;
  return target.set(
    R * cu + STRIP_W * cv * nx + STRIP_T * sv * bx,
    R * su + STRIP_W * cv * ny + STRIP_T * sv * by,
    STRIP_W * cv * nz + STRIP_T * sv * bz,
  );
}

function hideClay(root: THREE.Object3D): void {
  root.traverse((object) => {
    const id = object.userData?.sculptComponent?.id as string | undefined;
    if (id && HIDDEN_CLAY.has(id)) {
      object.visible = false;
    }
  });
}

function placeLattice(wells: THREE.InstancedMesh, rims: THREE.InstancedMesh): void {
  const dummy = new THREE.Object3D();
  const p = new THREE.Vector3();
  const pu = new THREE.Vector3();
  const pv = new THREE.Vector3();
  const nn = new THREE.Vector3();
  const m4 = new THREE.Matrix4();
  const light = new THREE.Vector3(0.35, 0.7, 0.62).normalize();
  const wellColor = new THREE.Color();
  const rimColor = new THREE.Color();
  const metal = new THREE.Color(0x0a0c0e);
  const cyan = new THREE.Color(0x2bd4d9);
  const rimHot = new THREE.Color(0xb8ffff);

  let i = 0;
  for (let iv = 0; iv < NV; iv += 1) {
    const v = ((iv + 0.5) / NV) * Math.PI * 2;
    for (let iu = 0; iu < NU; iu += 1) {
      const u = ((iu + (iv % 2) * 0.5) / NU) * Math.PI * 2;
      mobiusPoint(u, v, p);
      mobiusPoint(u + 0.012, v, pu).sub(p);
      if (pu.lengthSq() < 1e-10) mobiusPoint(u - 0.012, v, pu).sub(p).multiplyScalar(-1);
      pu.normalize();
      mobiusPoint(u, v + 0.04, pv).sub(p);
      if (pv.lengthSq() < 1e-10) mobiusPoint(u, v - 0.04, pv).sub(p).multiplyScalar(-1);
      pv.normalize();
      nn.crossVectors(pu, pv).normalize();
      pv.crossVectors(nn, pu).normalize();
      m4.makeBasis(pu, pv, nn);
      dummy.position.copy(p);
      dummy.quaternion.setFromRotationMatrix(m4);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wells.setMatrixAt(i, dummy.matrix);
      dummy.scale.set(1.05, 1.05, 0.26);
      dummy.updateMatrix();
      rims.setMatrixAt(i, dummy.matrix);

      const facing = Math.max(0, nn.dot(light));
      wellColor.copy(metal).lerp(cyan, 0.06 + facing * 0.2);
      rimColor.copy(cyan).lerp(rimHot, facing);
      wells.setColorAt(i, wellColor);
      rims.setColorAt(i, rimColor);
      i += 1;
    }
  }
  wells.instanceMatrix.needsUpdate = true;
  rims.instanceMatrix.needsUpdate = true;
  if (wells.instanceColor) wells.instanceColor.needsUpdate = true;
  if (rims.instanceColor) rims.instanceColor.needsUpdate = true;
  wells.count = i;
  rims.count = i;
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

function buildCrystal(): THREE.Group {
  const group = new THREE.Group();
  group.name = "center-crystal";

  const geo = crystalGeometry();
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x3ee0e8,
    emissive: new THREE.Color(0x2bd4d9),
    emissiveIntensity: 4.2,
    metalness: 0.08,
    roughness: 0.06,
    transmission: 0.18,
    thickness: 0.7,
    ior: 2.417,
    transparent: true,
    opacity: 1,
    envMapIntensity: 0,
  });
  const crystal = new THREE.Mesh(geo, glass);
  crystal.rotation.y = Math.PI / 4;
  group.add(crystal);

  const core = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: 0xf7ffff, toneMapped: false }),
  );
  core.scale.set(0.42, 0.7, 0.42);
  core.rotation.y = Math.PI / 4;
  group.add(core);

  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 12),
    new THREE.LineBasicMaterial({ color: 0xe8ffff, toneMapped: false }),
  );
  cage.rotation.copy(crystal.rotation);
  group.add(cage);

  const girdle = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.008, 8, 4),
    new THREE.MeshBasicMaterial({ color: 0xb8ffff, toneMapped: false }),
  );
  girdle.rotation.set(Math.PI / 2, Math.PI / 4, 0);
  group.add(girdle);

  const bounce = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({
      color: 0x2bd4d9,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  bounce.rotation.y = Math.PI / 4;
  bounce.position.set(0, -0.44, 0);
  bounce.scale.set(0.78, -0.38, 0.78);
  group.add(bounce);

  group.scale.set(1.02, 0.96, 0.7);
  return group;
}

export function createMobiusHoneycombMark(): THREE.Group {
  const root = new THREE.Group();
  root.name = "aetherline-mobius-honeycomb";

  const wellGeo = hexRingGeometry(HEX, HEX - WALL, SHELL);
  const rimGeo = hexRingGeometry(HEX * 1.03, HEX - WALL * 0.4, SHELL * 0.11);

  const armorMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.22,
    emissive: new THREE.Color(0x06181a),
    emissiveIntensity: 0.5,
    clearcoat: 0.42,
    clearcoatRoughness: 0.22,
    envMapIntensity: 0,
  });
  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.15,
    roughness: 0.1,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 2.6,
    envMapIntensity: 0,
  });

  const wells = new THREE.InstancedMesh(wellGeo, armorMat, COUNT);
  const rims = new THREE.InstancedMesh(rimGeo, rimMat, COUNT);
  wells.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(COUNT * 3), 3);
  rims.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(COUNT * 3), 3);
  wells.castShadow = true;
  wells.receiveShadow = true;
  placeLattice(wells, rims);

  root.add(wells);
  root.add(rims);
  root.add(buildCrystal());
  return root;
}

export function createHoneycombTorusMark(): THREE.Group {
  return createMobiusHoneycombMark();
}

export function attachHoneycombLattice(root: THREE.Group): THREE.Group {
  hideClay(root);
  root.add(createMobiusHoneycombMark());
  return root;
}
