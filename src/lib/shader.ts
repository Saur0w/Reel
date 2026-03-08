export const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    float wave = sin(worldPos.x * 0.25 - uScroll * 0.015);

    worldPos.y += wave * 1.5;   
    worldPos.z += wave * 0.8;   

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;
export const fragmentShader = `
  uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  uv.x += sin(uv.y * 3.1415) * 0.02;

  vec4 tex = texture2D(uTexture, uv);

  gl_FragColor = tex;
}
`;