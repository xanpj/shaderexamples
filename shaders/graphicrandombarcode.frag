// Author @xanpj

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
    //return _st.x;
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

float rect(vec2 _st, vec2 _size){
    float rn = random(vec2(_st.y, 1.0));
    _st = _st+vec2(0.5);
    _st.x *= 5.0;
    float index = _st.x;
    _st.x = fract(_st.x);

    //_st.x *= mod(_st.x*5.0,4.0) < 1.0 ? 1.0 : 0.0;
    //for(int i = 0;i<4;i++){
        float blackout_index = floor(3.0+sin(rn)*5.0);
        if(index < blackout_index && index > blackout_index-1.0){
            _st.x = 0.0;
        }
    //}
    vec2 uv = step(0.5, _st);
    //uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Apply the brick tiling
    //st = brickTile(st,2.0);

    color = vec3(rect(st,vec2(0.5)));

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}


