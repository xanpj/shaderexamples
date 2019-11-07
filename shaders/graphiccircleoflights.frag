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
    //(sin(u_time)*10.0)
    vec2 coord = (gl_FragCoord.xy/u_resolution.xy);
    vec3 color = vec3(0.0);
    vec2 translate = vec2(-0.5);
    coord += translate;
    coord *= rotate2d(tan(u_time));
    coord *= 2.0;

    for(int i=0;i<40;i++){
        float radius = sin(u_time);
        float rad = radians(360.0 / 40.0) * float(i);
        color += 0.1 * 0.1/length(coord + vec2(radius * cos(rad), radius*sin(rad))); 
    }


    gl_FragColor = vec4(vec3(color),1.0);
}
