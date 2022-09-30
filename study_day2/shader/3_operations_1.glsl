#ifdef GL_ES
precision lowp float;
precision lowp int;
#endif

uniform vec2 uresolution;
uniform float u_time;
uniform vec2 u_mouse;

vec2 rand(vec2 co) {
    return fract(sin(vec2(dot(co.xy, vec2(12.9898, 78.233)), dot(co.yx, vec2(12.9898, 78.233)))) * 43758.5453);
}

void main() {
    vec2 coord = gl_FragCoord.xy / uresolution.xy;
    
    float strength = step(0.8, mod(coord.x * 10.0, 1.0));
    strength *= step(0.8, mod(coord.y * 10.0, 1.0));
  
    gl_FragColor = vec4(1.0 * strength, 1.0 * strength, 0.0, 1.0);
    
}