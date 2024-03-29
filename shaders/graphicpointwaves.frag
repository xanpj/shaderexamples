#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(0.0);

    //remove (-coord.y) for swirl
    float angle = atan(-coord.y*(-coord.y) + 0.25, coord.x - 0.5) * 0.1;
    float len = length(coord - vec2(0.5, 0.25));

    color.r += sin(len * 40.0 + angle*50.0+u_time*2.0);
    color.g += cos(len * 60.0 + angle*50.0-u_time*2.0);
    color.b += sin(len * 50.0 + angle*50.0+3.);

    gl_FragColor = vec4(color,1.);
}
