export const vertexShader = `
  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    float wave = sin(worldPos.x * 0.9) * uVelocity * 0.006;

    worldPos.y += wave * 0.5;          
    worldPos.z += wave * 0.5;   

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;