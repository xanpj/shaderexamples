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

float rand (float x) {
    return fract(sin(x)*43758.5453123);
}

float noise (in float x) {
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));

    //return _st.x;
}

vec3 bbox(vec2 _st, float x){

    vec2 bl = step(vec2(0.5),_st);
    float pct = bl.x * bl.y;

    // top-right
     vec2 tr = step(vec2(0.1),1.0-_st);
     pct *= tr.x * tr.y;

    vec3 color = vec3(pct);
    return vec3(color);
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

vec2 translate(float x, float y) {
    return vec2(x, y);
} 

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}


void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st *= 5.0;
    st += translate(-2.0, -3.0);
    st += translate(-0.1, noise(u_time));
    color = vec3(bbox(st,0.1));
    st += translate(0.1, noise(u_time));
    color += circle(st, 0.1);
    st *= scale(vec2(noise(u_time)));
    st *= rotate2d(noise(u_time*2.0));
    st += translate(0.3, noise(u_time));
    color += cross(st, 0.4);

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}


