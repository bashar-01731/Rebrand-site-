"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion";

/**
 * Ambient 3D hero: a slowly drifting browser window, fine particles and a soft
 * volumetric wash.
 *
 * Treated as art direction, not a toy. Deliberate constraints:
 * - Primitives + canvas textures only. No model or texture downloads, so the
 *   scene costs a few KB of geometry rather than megabytes over the wire.
 * - Four meshes total. The whole browser UI is painted into one canvas texture
 *   instead of being assembled from dozens of little meshes.
 * - The loop stops when the tab is hidden or the canvas scrolls out of view.
 * - Reduced motion renders exactly one frame and never starts a loop.
 * - Everything is disposed on unmount, including the WebGL context.
 */
export default function HeroScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* --- guard: some environments have no WebGL at all ------------------ */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // Silent: the hero reads perfectly well without the canvas.
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    /* --- lights --------------------------------------------------------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xf4f2ee, 2.1);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb9b8b2, 1.5);
    rim.position.set(-5, -1, 2);
    scene.add(rim);

    /* --- disposables ---------------------------------------------------- */
    const disposables: { dispose(): void }[] = [];
    const track = <T extends { dispose(): void }>(x: T) => {
      disposables.push(x);
      return x;
    };

    /* --- the browser window --------------------------------------------- */
    const device = new THREE.Group();
    scene.add(device);

    const screenTex = track(new THREE.CanvasTexture(makeScreenCanvas()));
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const W = 3.5;
    const H = 2.2;

    const screen = new THREE.Mesh(
      track(new THREE.PlaneGeometry(W, H)),
      track(new THREE.MeshBasicMaterial({ map: screenTex, transparent: true })),
    );
    screen.position.z = 0.061;
    device.add(screen);

    // Metallic shell behind the screen — this is what catches the light and
    // sells the object as a physical thing rather than a floating image.
    const shell = new THREE.Mesh(
      track(new THREE.BoxGeometry(W + 0.11, H + 0.11, 0.12)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x1b1b19,
          metalness: 0.92,
          roughness: 0.34,
        }),
      ),
    );
    device.add(shell);

    /* --- ambient wash ---------------------------------------------------- */
    const glowTex = track(new THREE.CanvasTexture(makeGlowCanvas()));
    const glow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(13, 9)),
      track(
        new THREE.MeshBasicMaterial({
          map: glowTex,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
    glow.position.z = -2.4;
    scene.add(glow);

    /* --- particles ------------------------------------------------------- */
    const COUNT = 620;
    const positions = new Float32Array(COUNT * 3);
    const drift = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
      drift[i] = 0.1 + Math.random() * 0.35;
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      dustGeo,
      track(
        new THREE.PointsMaterial({
          color: 0xd8d6d0,
          size: 0.018,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        }),
      ),
    );
    scene.add(dust);

    /* --- sizing ---------------------------------------------------------- */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull the camera back on narrow viewports so the device never crops.
      camera.position.z = w < 700 ? 8.4 : 6.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* --- reduced motion: one frame, no loop ------------------------------ */
    if (reduced) {
      device.rotation.set(-0.06, -0.32, 0.015);
      renderer.render(scene, camera);
      return () => {
        ro.disconnect();
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    /* --- interaction ----------------------------------------------------- */
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let scrollT = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollT = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* --- render loop ----------------------------------------------------- */
    const clock = new THREE.Clock();
    let raf = 0;
    let onScreen = true;
    let running = false;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();

      // Damped follow — the device leans toward the cursor and settles back.
      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;

      device.rotation.y = -0.3 + Math.sin(t * 0.22) * 0.11 + eased.x * 0.26;
      device.rotation.x = -0.05 + Math.cos(t * 0.28) * 0.045 + eased.y * 0.15;
      device.rotation.z = Math.sin(t * 0.17) * 0.016;
      device.position.y = Math.sin(t * 0.5) * 0.07 - scrollT * 1.5;
      device.position.z = -scrollT * 2.2;

      glow.position.y = device.position.y * 0.4;
      dust.rotation.y = t * 0.012 + eased.x * 0.05;

      const pos = dustGeo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3 + 1;
        arr[idx] += drift[i] * 0.0016;
        if (arr[idx] > 4.5) arr[idx] = -4.5;
      }
      pos.needsUpdate = true;

      camera.position.x += (eased.x * 0.22 - camera.position.x) * 0.04;
      camera.position.y += (-eased.y * 0.16 - camera.position.y) * 0.04;
      camera.lookAt(0, device.position.y * 0.3, 0);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta(); // drop the time accumulated while paused
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    // Off-screen or backgrounded scenes cost nothing.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(host);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss?.();
      renderer.domElement.remove();
    };
  }, [reduced]);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Canvas textures                                                     */
/* ------------------------------------------------------------------ */

/** The abstract RE:BRAND preview shown on the floating screen. */
function makeScreenCanvas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 1400;
  c.height = 880;
  const g = c.getContext("2d");
  if (!g) return c;

  const { width: w, height: h } = c;

  g.fillStyle = "#0d0d0c";
  g.fillRect(0, 0, w, h);

  // Soft top-left light spill.
  const spill = g.createRadialGradient(w * 0.26, h * 0.1, 0, w * 0.26, h * 0.1, w * 0.85);
  spill.addColorStop(0, "rgba(185,184,178,0.20)");
  spill.addColorStop(1, "rgba(185,184,178,0)");
  g.fillStyle = spill;
  g.fillRect(0, 0, w, h);

  // Browser chrome.
  const bar = 62;
  g.fillStyle = "#151513";
  g.fillRect(0, 0, w, bar);
  g.strokeStyle = "rgba(244,242,238,0.10)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, bar);
  g.lineTo(w, bar);
  g.stroke();

  ["#3d3d3a", "#4a4a46", "#57574f"].forEach((col, i) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(40 + i * 30, bar / 2, 8, 0, Math.PI * 2);
    g.fill();
  });

  g.fillStyle = "#0d0d0c";
  roundRect(g, 150, 15, 420, 32, 16);
  g.fill();
  g.fillStyle = "#6e6a61";
  g.font = "400 17px Inter, system-ui, sans-serif";
  g.fillText("rebrand.design", 172, 37);

  // Wordmark.
  g.fillStyle = "#f4f2ee";
  g.font = "400 128px Fraunces, Georgia, 'Iowan Old Style', serif";
  g.fillText("RE:BRAND", 70, bar + 220);

  g.fillStyle = "#9a968d";
  g.font = "500 22px Inter, system-ui, sans-serif";
  g.letterSpacing = "4px";
  g.fillText("CREATIVE DIGITAL STUDIO", 74, bar + 268);
  g.letterSpacing = "0px";

  // Hairline rules.
  g.strokeStyle = "rgba(244,242,238,0.13)";
  g.lineWidth = 2;
  [bar + 320, h - 150].forEach((y) => {
    g.beginPath();
    g.moveTo(70, y);
    g.lineTo(w - 70, y);
    g.stroke();
  });

  // An abstract "work" row — muted tiles, not a fake screenshot.
  const tiles = 4;
  const gap = 26;
  const tw = (w - 140 - gap * (tiles - 1)) / tiles;
  const th = 250;
  const shades = [0.1, 0.16, 0.07, 0.13];
  for (let i = 0; i < tiles; i++) {
    const x = 70 + i * (tw + gap);
    const y = bar + 360;
    const grad = g.createLinearGradient(x, y, x + tw, y + th);
    grad.addColorStop(0, `rgba(244,242,238,${shades[i] + 0.05})`);
    grad.addColorStop(1, `rgba(244,242,238,${shades[i] * 0.3})`);
    g.fillStyle = grad;
    g.fillRect(x, y, tw, th);
    g.strokeStyle = "rgba(244,242,238,0.12)";
    g.lineWidth = 2;
    g.strokeRect(x, y, tw, th);
  }

  g.fillStyle = "#6e6a61";
  g.font = "500 20px Inter, system-ui, sans-serif";
  g.letterSpacing = "3px";
  g.fillText("SELECTED WORK  /  006", 70, h - 105);
  g.letterSpacing = "0px";

  return c;
}

/** Radial wash sitting behind the device. */
function makeGlowCanvas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, "rgba(185,184,178,0.55)");
  grad.addColorStop(0.45, "rgba(122,116,105,0.16)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 512);
  return c;
}

function roundRect(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
