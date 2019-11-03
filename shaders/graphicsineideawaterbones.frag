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
    vec2 coord = 20.0 * (gl_FragCoord.xy - u_resolution / 2.0 ) / min(u_resolution.y, u_resolution.x) ;
    float len;

    for(int i = 0; i < AMOUNT; i++){
        len = length(vec2(coord.x, coord.y));
        coord.x = coord.x - cos(coord.y ) + cos(u_time / 9.0);
        coord.y = coord.y - sin(coord.x ) + sin(u_time / 12.0);

    }
   
   gl_FragColor = vec4(cos(len * 2.0), cos(len*2.0), cos(len*1.0), 1.0);

}
