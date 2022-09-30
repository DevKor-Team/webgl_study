#ifdef GL_ES
precision lowp float;
precision lowp int;
#endif

varying vec2 vTextureCoord;


uniform vec2 uresolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform sampler2D uSampler;

vec2 rand(vec2 co) {
    return fract(sin(vec2(dot(co.xy, vec2(12.9898, 78.233)), dot(co.yx, vec2(12.9898, 78.233)))) * 43758.5453);
}

vec3 random_rainbow_color(vec2 co){
    // take random amount of rgb and normalize it
    vec3 _color = vec3(rand(co), rand(co + 1.0).x);
    return _color / (_color.x + _color.y + _color.z);
}

void main() {
    vec2 coord = gl_FragCoord.xy / uresolution.xy;

    vec2 mousepos = u_mouse;
    mousepos.y = uresolution.y - u_mouse.y;
    float dist = distance(gl_FragCoord.xy, mousepos) / sqrt(uresolution.x * uresolution.y);

    // act as if the coord has been "moved" by the force of the mouse.

    vec2 mousepos_norm = mousepos / uresolution.xy;
    vec2 mouse_pos_vec = mousepos_norm - coord;

    coord = coord + 1.0 * (mouse_pos_vec) / (4.0 * dist * dist + 1.0);


    vec2 gridcoord = vec2(floor(coord.x * 10.0) / 10.0, floor(coord.y * 10.0) / 10.0);
    
    float strength = step(0.5, mod(coord.x * 10.0, 1.0));
    strength *= step(0.0, mod(coord.y * 10.0, 1.0));
  
    gl_FragColor = vec4(random_rainbow_color(gridcoord) * strength * texture2D(uSampler, vTextureCoord).xyz, 1.0);
    
}