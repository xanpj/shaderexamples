// Author @xanpj

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

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
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	float m = 1.-smoothstep(_radius+(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
    return step(0.5, m);
}



void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;


    // Make more interesting combinations

    float xtrans = 0.8;
    float ytrans = 0.8;
    vec2 trans = vec2(0.5);
    st -= trans;
    st *= vec2(5.0);
    vec2 scale = vec2(noise(u_time), cos(u_time));
    st *= scale;
    st += trans;
    vec3 color = vec3(circle(st, 0.2));
    // st = rotateTilePattern(st*2.);
    // st = rotate2D(st,PI*u_time*0.25);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(color,1.0);
}


