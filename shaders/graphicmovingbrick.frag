// Author @xanpj

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    //    _st.x += step(1., _st.y) * 0.5;

    //_st.x *= step(1., _st.y) * (mod(_st.y,4.0) < 1.0 ? 0.0 : 1.0);
   // _st.x *= step(1., _st.y) * ((max(mod(_st.x,floor(abs(0.1)*4.0)), mod(_st.y,4.0))) < 1.0 ? 0.0 : 1.0);
   _st.x *= step(1., _st.y) * (max(mod(_st.y,floor(abs(sin(u_time*2.0)*_zoom*3.0))+_zoom*4.0), mod(_st.x,floor(abs(sin(u_time*2.0)*_zoom-1.0))+_zoom*3.0)) < 1.0 ? 0.0 : 1.0);
   //_st.y *= step(1., _st.x) * ((mod(_st.x,floor(abs(sin(u_time)*4.0))+15.0)) < 1.0 ? 0.0 : 1.0);

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    st /= vec2(2.15,0.65)/1.5;
    vec2 translate = vec2(3.0, 4.0);
    st += translate;
    // Apply the brick tiling
    st = brickTile(st,40.0);
    //st *= rotate2d(3.14);
    color = vec3(box(st,vec2(0.9)));

    // Uncomment to see the space coordinates
    color *= vec3(st,0.0);

    gl_FragColor = vec4(vec3(1.0) - color,1.0);
}


