#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 coord = (gl_FragCoord.xy*1.0 -u_resolution.xy);
    vec3 color = vec3(0.0);

    color += abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - tan(u_time*4.0));
    

    gl_FragColor = vec4(vec3(color),1.0);
}
