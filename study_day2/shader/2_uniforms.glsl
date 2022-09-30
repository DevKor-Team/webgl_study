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
    vec2 val = (1.0 + sin(coord * 10.0 + u_time * 0.1)) / 2.0;

    val = val + rand(val) * 0.1;

    vec2 mousepos = u_mouse;
    mousepos.y = uresolution.y - u_mouse.y;

    float dist = distance( gl_FragCoord.xy, mousepos );

    if(dist < 300.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(val, 0.0, 1.0);
    }
}