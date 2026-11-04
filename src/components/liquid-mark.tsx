"use client";

import { useEffect, useRef, useState } from "react";
import { liquidFragSource } from "@/lib/shaders/clear-ice";

// Paper Design's liquid-logo shader, with a lightweight text bevel and an
// interruptible renderer. See public/licenses/liquid-logo.txt for its license.
export function LiquidMark({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
    if (!gl) return;
    let disposed = false,
      frame = 0,
      visible = false,
      elapsed = 1600,
      previous = 0;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const shaders: WebGLShader[] = [];
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!program || !buffer || !texture) return;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader unavailable");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error("Shader compilation failed");
      gl.attachShader(program, shader);
    };
    let resize: ResizeObserver | undefined;
    let observer: IntersectionObserver | undefined;
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    const render = (now: number) => {
      if (disposed) return;
      if (previous) elapsed += Math.min(now - previous, 60) * 0.16;
      previous = now;
      gl.uniform1f(uniforms.u_time, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible && !document.hidden && !motion.matches && elapsed < 2240)
        frame = requestAnimationFrame(render);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const lost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    async function init() {
      await document.fonts.load("600 160px Switzer");
      if (disposed || !canvas || !gl || !program) return;
      compile(
        gl.VERTEX_SHADER,
        `#version 300 es
        in vec2 a_position; out vec2 vUv;
        void main(){ vUv=.5*(a_position+1.); gl_Position=vec4(a_position,0.,1.); }`,
      );
      compile(gl.FRAGMENT_SHADER, liquidFragSource);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error("Shader linking failed");
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      for (const name of [
        "time",
        "ratio",
        "img_ratio",
        "patternScale",
        "refraction",
        "edge",
        "patternBlur",
        "liquid",
        "image_texture",
      ])
        uniforms[`u_${name}`] = gl.getUniformLocation(program, `u_${name}`);
      const mask = document.createElement("canvas"),
        ctx = mask.getContext("2d");
      if (!ctx) return;
      ctx.font = "600 160px Switzer";
      const metrics = ctx.measureText(text);
      mask.width = Math.ceil(metrics.width) + 24;
      mask.height =
        Math.ceil(
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
        ) + 16;
      ctx.font = "600 160px Switzer";
      ctx.fillStyle = "#000";
      ctx.fillText(text, 12, metrics.actualBoundingBoxAscent + 8);
      const data = ctx.getImageData(0, 0, mask.width, mask.height);
      const w = mask.width,
        h = mask.height,
        d = new Float32Array(w * h);
      // Two-pass distance field gives the mask a bevel without runtime image processing dependencies.
      for (let i = 0; i < d.length; i++)
        d[i] = data.data[i * 4 + 3] > 100 ? 1000 : 0;
      for (let y = 1; y < h; y++)
        for (let x = 1; x < w; x++) {
          const i = y * w + x;
          d[i] = Math.min(d[i], d[i - 1] + 1, d[i - w] + 1);
        }
      for (let y = h - 2; y >= 0; y--)
        for (let x = w - 2; x >= 0; x--) {
          const i = y * w + x;
          d[i] = Math.min(d[i], d[i + 1] + 1, d[i + w] + 1);
        }
      for (let i = 0; i < d.length; i++) {
        const value = 255 * (1 - Math.min(d[i] / 9, 1));
        data.data[i * 4] = value;
        data.data[i * 4 + 1] = value;
        data.data[i * 4 + 2] = value;
        data.data[i * 4 + 3] = 255;
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data.data,
      );
      gl.uniform1i(uniforms.u_image_texture, 0);
      for (const [key, value] of Object.entries({
        img_ratio: w / h,
        patternScale: 2.5,
        refraction: 0.018,
        edge: 0.16,
        patternBlur: 0.015,
        liquid: 0.045,
      }))
        gl.uniform1f(uniforms[`u_${key}`], value);
      resize = new ResizeObserver(() => {
        const box = canvas.getBoundingClientRect(),
          dpr = Math.min(devicePixelRatio, 1.5);
        canvas.width = Math.max(1, Math.round(box.width * dpr));
        canvas.height = Math.max(1, Math.round(box.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
        render(performance.now());
        cancelAnimationFrame(frame);
        sync();
      });
      resize.observe(canvas);
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(canvas);
      setReady(true);
    }
    init().catch(() => {
      if (!disposed) setReady(false);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize?.disconnect();
      observer?.disconnect();
      canvas.removeEventListener("webglcontextlost", lost);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((s) => gl.deleteShader(s));
    };
  }, [text]);
  return (
    <span className="liquid-mark" data-ready={ready}>
      <span>{text}</span>
      <canvas ref={ref} aria-hidden="true" />
    </span>
  );
}
