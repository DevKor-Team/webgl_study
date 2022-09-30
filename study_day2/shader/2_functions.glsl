#ifdef GL_ES
precision lowp float;
precision lowp int;
#endif

uniform vec2 uresolution;

vec2 rand(vec2 co){
    return fract(sin(vec2(dot(co.xy ,vec2(12.9898,78.233)),dot(co.yx ,vec2(12.9898,78.233))))*43758.5453);
}

void main(){
    vec2 coord = gl_FragCoord.xy / uresolution.xy;
    coord = (1.0 + sin(coord * 10.0)) / 2.0;

    coord = coord + rand(coord) * 0.1;

    gl_FragColor = vec4(coord, 0.0, 1.0);
}