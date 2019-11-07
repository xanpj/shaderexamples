#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(1.0);

    float size = 6.0;
    float c = sin(floor(coord.x*size) + u_time * 8.0) + 1.0/5.0;
    color = vec3(c*random(sin(u_time+0.1)), c*random(sin(u_time+0.2)), c*random(sin(u_time+0.3)));
    gl_FragColor = vec4(color,1.0);
}
