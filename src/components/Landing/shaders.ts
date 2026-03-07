export const vertexShader = `
    uniform float uScrollVelocity;
    uniform float uTime;
      
    varying vec2 vUv;  
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        
        float wave = sin(pos.x * 1.2 + uTime * 1.5) * uScrollVelocity * 0.12;
        pos.y += wave;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`;