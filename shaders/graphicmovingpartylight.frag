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
    //(sin(u_time)*10.0)
    vec2 coord = (gl_FragCoord.xy*2.0-u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec3 color = vec3(0.0);
    coord.x += sin(u_time);
    coord.y += cos(u_time);
    color += 0.1 * (abs(sin(u_time))+0.1) /length(coord);
    color *= vec3(random(sin(u_time*0.001)+0.1), random(sin(u_time*0.01)+0.2), random(sin(u_time*0.011)+0.3));

    gl_FragColor = vec4(vec3(color),1.0);
}
