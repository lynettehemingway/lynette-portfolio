import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSwimmers, stepSwimmers } from './pondSimulation';

const TAU = Math.PI * 2;

function makeFish(palette, index) {
  const group = new THREE.Group();
  const positions = [];
  const colors = [];
  const indices = [];
  const base = new THREE.Color(palette[0]);
  const patch = new THREE.Color(palette[1]);
  const ink = new THREE.Color(palette[2]);
  const rings = 38;
  const sides = 22;
  for (let ring = 0; ring <= rings; ring += 1) {
    const u = ring / rings;
    const z = -1.24 + u * 2.25;
    const radius = Math.max(.025, Math.pow(Math.sin(Math.PI * u), .65) * (.24 + u * .18));
    for (let side = 0; side <= sides; side += 1) {
      const angle = side / sides * TAU;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * .77;
      positions.push(x, y, z);
      const noise = Math.sin(z * 8 + Math.cos(angle * 3) + index * 2) + Math.cos(z * 14 - angle * 4 + index);
      const color = base.clone();
      if (y > -.1 && noise > .4) color.lerp(patch, .92);
      if (y > -.02 && noise < -1.25 && index !== 2) color.lerp(ink, .88);
      color.multiplyScalar(.86 + .14 * Math.max(0, Math.sin(angle)));
      colors.push(color.r, color.g, color.b);
      if (ring < rings && side < sides) {
        const a = ring * (sides + 1) + side;
        const b = a + sides + 1;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const body = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .3, metalness: .12, side: THREE.DoubleSide }));
  body.castShadow = true;
  group.add(body);
  const fins = [];
  const finMaterial = new THREE.MeshStandardMaterial({ color: palette[0], transparent: true, opacity: .74, roughness: .45, side: THREE.DoubleSide, depthWrite: false });
  function fin(points, x, z) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([px, pz]) => shape.lineTo(px, pz));
    shape.closePath();
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape, 8), finMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, .02, z);
    group.add(mesh);
    fins.push(mesh);
    return mesh;
  }
  const tail = fin([[0, 0], [-.5, .65], [-.35, .82], [0, .5], [.35, .82], [.5, .65]], 0, -1.1);
  fin([[0, 0], [-.5, -.02], [-.69, .27], [-.3, .43], [0, .26]], -.21, .35);
  fin([[0, 0], [.5, -.02], [.69, .27], [.3, .43], [0, .26]], .21, .35);
  const dorsal = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), finMaterial);
  dorsal.scale.set(.035, .2, .46);
  dorsal.position.set(0, .2, -.1);
  group.add(dorsal);
  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(.044, 10, 8), new THREE.MeshStandardMaterial({ color: '#111912', roughness: .1 }));
    eye.position.set(side * .22, .11, .8);
    group.add(eye);
    const glint = new THREE.Mesh(new THREE.SphereGeometry(.013, 6, 6), new THREE.MeshBasicMaterial({ color: '#fff5d6' }));
    glint.position.set(side * .235, .14, .82);
    group.add(glint);
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(side * .08, -.015, .94), new THREE.Vector3(side * .24, -.01, 1.1), new THREE.Vector3(side * .29, -.03, .98));
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 8, .009, 4, false), finMaterial));
  });
  group.scale.setScalar(.85 + (index % 3) * .1);
  group.traverse((object) => { object.userData.fishIndex = index; });
  return { group, body, original: new Float32Array(positions), fins, tail };
}

function makeLily(x, z, radius, rotation, flower) {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  for (let i = 0; i <= 60; i += 1) {
    const a = .22 + i / 60 * (TAU - .44);
    const r = radius * (1 + .025 * Math.sin(a * 7));
    shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.lineTo(0, 0);
  const pad = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshStandardMaterial({ color: '#506b3d', roughness: .45, metalness: .08, side: THREE.DoubleSide }));
  pad.rotation.x = -Math.PI / 2;
  pad.receiveShadow = true;
  pad.castShadow = true;
  group.add(pad);
  for (let i = 0; i < 13; i += 1) {
    const angle = .3 + i / 13 * (TAU - .6);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, .012, 0), new THREE.Vector3(Math.cos(angle) * radius * .92, .012, -Math.sin(angle) * radius * .92)]), new THREE.LineBasicMaterial({ color: '#8b9c63', transparent: true, opacity: .5 }));
    group.add(line);
  }
  if (flower) {
    const petalGeometry = new THREE.SphereGeometry(1, 10, 10);
    for (let i = 0; i < 18; i += 1) {
      const angle = i / 9 * TAU;
      const inner = i >= 9;
      const petal = new THREE.Mesh(petalGeometry, new THREE.MeshStandardMaterial({ color: inner ? '#f6e7d5' : '#d9c6c0', roughness: .5 }));
      petal.scale.set(.13, .08, inner ? .29 : .39);
      petal.position.set(Math.sin(angle) * (inner ? .14 : .23), inner ? .2 : .12, Math.cos(angle) * (inner ? .14 : .23));
      petal.rotation.set(inner ? -.5 : -.18, angle, 0);
      petal.castShadow = true;
      group.add(petal);
    }
    const center = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), new THREE.MeshStandardMaterial({ color: '#d7ae50', roughness: .6 }));
    center.position.y = .24;
    group.add(center);
  }
  group.position.set(x, .045, z);
  group.rotation.y = rotation;
  return group;
}

export function createPondScene(canvas, { onSelect, onFeed, onError, reducedMotion = false }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
  } catch (error) { throw new Error('This browser could not open the 3D pond.'); }
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c1913');
  scene.fog = new THREE.FogExp2('#13261c', .035);
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 80);
  camera.position.set(0, 16, 9);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, -.3, 0);
  controls.enableDamping = !reducedMotion;
  controls.enablePan = false;
  controls.minDistance = 11;
  controls.maxDistance = 28;
  controls.minPolarAngle = .12;
  controls.maxPolarAngle = .85;
  controls.rotateSpeed = .35;
  controls.zoomSpeed = .6;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  scene.add(new THREE.HemisphereLight('#fff1cc', '#233a29', 2.1));
  const sun = new THREE.DirectionalLight('#ffe1a6', 3.2);
  sun.position.set(-7, 13, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: .5, far: 35 });
  sun.shadow.bias = -.001;
  scene.add(sun);
  const uniforms = { uTime: { value: 0 }, uMoon: { value: 0 }, uRipples: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -100, 0)) } };
  const bed = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShaderMaterial({
    uniforms,
    vertexShader: 'varying vec3 vWorld; void main(){vec4 p=modelMatrix*vec4(position,1.);vWorld=p.xyz;gl_Position=projectionMatrix*viewMatrix*p;}',
    fragmentShader: `varying vec3 vWorld; uniform float uTime; uniform float uMoon;
      void main(){vec2 p=vWorld.xz; float g=sin(p.x*2.1+sin(p.y*2.7+uTime*.23))+sin(p.y*3.2+cos(p.x*2.-uTime*.2));
      float caustic=pow(1.-abs(sin(g*2.4)),12.); float grain=fract(sin(dot(floor(p*25.),vec2(12.98,78.23)))*43758.54);
      vec3 color=mix(vec3(.045,.09,.065),vec3(.13,.19,.105),grain*.45)+vec3(.13,.14,.065)*caustic;
      color*=mix(1.,.52,uMoon); gl_FragColor=vec4(color,1.);}`,
  }));
  bed.rotation.x = -Math.PI / 2;
  bed.position.y = -1.75;
  scene.add(bed);
  const rockGeometry = new THREE.IcosahedronGeometry(1, 1);
  const rockMaterial = new THREE.MeshStandardMaterial({ color: '#414739', roughness: .94 });
  for (let i = 0; i < 86; i += 1) {
    const angle = i / 86 * TAU;
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.position.set(Math.cos(angle) * (9.8 + .3 * Math.sin(i * 3)), -.4, Math.sin(angle) * (7.3 + .3 * Math.cos(i * 7)));
    rock.scale.set(.6 + .24 * Math.sin(i * 2), .4 + .14 * Math.cos(i), .58 + .2 * Math.sin(i * 5));
    rock.rotation.set(i, i * 2, i * .4);
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
  }
  const swimmers = createSwimmers();
  const models = swimmers.map((fish, index) => makeFish(fish.colors, index));
  models.forEach(({ group }) => scene.add(group));
  const lilies = [[-6.6,-3.2,1.05,.2,true],[-7,-1.5,.74,1,false],[-5.7,-4.6,.7,2,false],[6.3,2.7,.95,2,true],[7.2,1.5,.74,1,false],[5.6,4.2,.6,.4,false],[-4.2,5.5,.65,3,false]].map((args) => makeLily(...args));
  lilies.forEach((lily) => scene.add(lily));
  const water = new THREE.Mesh(new THREE.PlaneGeometry(52, 52, 70, 70), new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `uniform float uTime; varying vec3 vWorld; void main(){vec3 p=position;p.z+=sin(p.x*.9+uTime*.5)*.018+cos(p.y*1.1+uTime*.4)*.012;vec4 w=modelMatrix*vec4(p,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader: `uniform float uTime; uniform float uMoon; uniform vec4 uRipples[8]; varying vec3 vWorld;
      void main(){vec2 p=vWorld.xz;float r=0.; for(int i=0;i<8;i++){float age=uTime-uRipples[i].z;if(age>0.&&age<4.){float d=length(p-uRipples[i].xy);r+=exp(-pow((d-age*1.7)*5.,2.))*(1.-age/4.)*.3;}}
      float wave=sin(p.x*4.+sin(p.y*2.+uTime*.6))+cos(p.y*3.7-uTime*.5);float glimmer=pow(max(0.,wave*.5),18.);
      float light=exp(-length(p-vec2(-4.,-2.))*.13);vec3 c=mix(vec3(.35,.43,.25),vec3(.16,.28,.34),uMoon);
      gl_FragColor=vec4(c+glimmer*.55+r,.055+glimmer*light*.22+r);}`,
  }));
  water.rotation.x = -Math.PI / 2;
  water.renderOrder = 2;
  scene.add(water);
  const food = [];
  const pelletGeometry = new THREE.SphereGeometry(.055, 6, 5);
  const pelletMaterial = new THREE.MeshStandardMaterial({ color: '#dfbe79', roughness: .8 });
  const pellets = Array.from({ length: 24 }, () => { const mesh = new THREE.Mesh(pelletGeometry, pelletMaterial); mesh.visible = false; scene.add(mesh); return mesh; });
  const raycaster = new THREE.Raycaster();
  const pointerVector = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let pointer = null;
  let down = null;
  const activePointers = new Set();
  let multiTouch = false;
  let rippleIndex = 0;
  let time = .01;
  let paused = reducedMotion;
  let disposed = false;
  let last = 0;
  let frame;
  function locate(event) {
    const bounds = canvas.getBoundingClientRect();
    pointerVector.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointerVector, camera);
    const hit = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    return hit && Math.hypot(hit.x / 7.8, hit.z / 5.6) < 1 ? hit : null;
  }
  function feed(x, z) {
    if (disposed || paused) return;
    uniforms.uRipples.value[rippleIndex++ % 8].set(x, z, time, 1);
    for (let i = 0; i < 4; i += 1) {
      if (food.length >= 24) food.shift();
      food.push({ x: x + Math.cos(i * 2.3) * .2, z: z + Math.sin(i * 2.3) * .2, born: time });
    }
    onFeed?.();
  }
  function pointerMove(event) {
    if (event.pointerType === 'touch' || down) return;
    const hit = locate(event);
    pointer = hit ? { x: hit.x, z: hit.z } : null;
  }
  function pointerDown(event) {
    activePointers.add(event.pointerId);
    multiTouch = multiTouch || activePointers.size > 1;
    down = multiTouch ? null : { x: event.clientX, y: event.clientY };
    pointer = null;
  }
  function pointerUp(event) {
    activePointers.delete(event.pointerId);
    if (multiTouch) { if (!activePointers.size) multiTouch = false; down = null; return; }
    if (!down || Math.hypot(down.x - event.clientX, down.y - event.clientY) > 7) { down = null; return; }
    down = null;
    const hit = locate(event);
    const intersections = raycaster.intersectObjects(models.map(({ group }) => group), true);
    if (intersections.length) onSelect?.(intersections[0].object.userData.fishIndex);
    else if (hit) feed(hit.x, hit.z);
  }
  function pointerLeave(event) {
    activePointers.delete(event.pointerId);
    if (!activePointers.size) multiTouch = false;
    pointer = null;
    down = null;
  }
  function contextLost(event) { event.preventDefault(); onError?.(); }
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointerleave', pointerLeave);
  canvas.addEventListener('pointercancel', pointerLeave);
  canvas.addEventListener('webglcontextlost', contextLost);
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.set(0, width < height ? 23 : 16, width < height ? 12 : 9);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    controls.update();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  function draw(now) {
    if (disposed) return;
    const delta = last ? Math.min((now - last) / 1000, .05) : .016;
    last = now;
    if (!document.hidden) {
      if (!paused) { time += delta; stepSwimmers(swimmers, food, pointer, time, delta); }
      uniforms.uTime.value = time;
      models.forEach((model, index) => {
        const fish = swimmers[index];
        model.group.position.set(fish.x, -.55 + Math.sin(time * .65 + index) * .1, fish.z);
        model.group.rotation.y = fish.heading;
        const positions = model.body.geometry.attributes.position;
        for (let i = 0; i < positions.count; i += 1) {
          const z = model.original[i * 3 + 2];
          const amount = Math.max(0, .6 - z) * .09;
          positions.setX(i, model.original[i * 3] + Math.sin(time * 4 + z * 3 + fish.phase) * amount);
        }
        positions.needsUpdate = true;
        model.tail.rotation.z = Math.sin(time * 4 - 3 + fish.phase) * .24;
        model.fins.slice(1).forEach((fin, side) => { fin.rotation.z = Math.sin(time * 3 + side + fish.phase) * .12; });
      });
      lilies.forEach((lily, index) => { lily.position.y = .055 + Math.sin(time * .7 + index) * .016; });
      pellets.forEach((pellet, index) => { pellet.visible = Boolean(food[index]); if (food[index]) pellet.position.set(food[index].x, -.03, food[index].z); });
      controls.update();
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(draw);
  }
  frame = requestAnimationFrame(draw);
  return {
    feed: () => feed(0, 0),
    setPaused: (value) => { paused = value; pointer = null; },
    setMoonlight: (value) => { uniforms.uMoon.value = value ? 1 : 0; sun.color.set(value ? '#bdd6f1' : '#ffe1a6'); sun.intensity = value ? 1.5 : 3.2; renderer.toneMappingExposure = value ? .9 : 1.2; },
    resetView: resize,
    dispose: () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointerleave', pointerLeave);
      canvas.removeEventListener('pointercancel', pointerLeave);
      canvas.removeEventListener('webglcontextlost', contextLost);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse((object) => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
