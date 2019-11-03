// Author @xanpj

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const int AMOUNT = 12;

mat2 scale(vec2 scale){
    return mat2(scale.x, 0.0, 0.0, scale.y);
}

float rectshape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(u_time+angle), sin(angle), cos(angle));
}

void main(){
    vec2 coord = (gl_FragColor.xy / u_resolution.xy);
    float color = 0.0;

    color += sin(coord.x * 50.0 + cos(u_time + coord.y)) * 2.0;

    gl_FragColor = vec4(vec3(color, color, color), 1.0);
}
