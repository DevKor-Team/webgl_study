
//precision lowp float;
precision mediump float;
//precision highp float;
precision highp int;


#define N 15

uniform vec2 uresolution;


void main(){
    vec2 coord = gl_FragCoord.xy / (1.0 * uresolution.xy);
    // coord = 0.00000001 * coord;

    float r = sin(coord.x / 1000000.0) * 1000000.0;
    coord.x = r;

    gl_FragColor = vec4(coord, 0.0, 1.0);
}