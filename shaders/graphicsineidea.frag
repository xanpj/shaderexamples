// Author @xanpj


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

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
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    color += sin(coord.x * cos(u_time / 60.0) * 60.0) + sin(coord.y * cos(u_time / 60.0) * 10.0);
    color += cos(coord.x * cos(u_time / 60.0) * 60.0) + cos(coord.y * sin(u_time / 10.0) * 10.0);


    gl_FragColor = vec4(color, 1.0);

}
