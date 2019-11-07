#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

vec2 hash( vec2 x )  // replace this by something better
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float grad_noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float displacement(vec2 st){
    return sin(20.0*st.x)*sin(20.0*st.y); 
}

float randzicks(float x){
    return random(vec2(sin(x),sin(x)));
}

float rect(vec2 st) {
    float rect1 = smoothstep(0.1, randzicks(st.y), st.x);
    rect1 *= smoothstep(0.1,  randzicks(st.y), 1.0-st.x);
    rect1 *= smoothstep(0.1, randzicks(st.x) ,st.y);
    rect1 *= smoothstep(0.1, randzicks(st.x), 1.0-st.y);

    return rect1;
}

vec3 coloredrect(vec3 color, vec2 st, vec3 newcolor){
    color += vec3(rect(st));
    color *= newcolor;
    float zoomed_noise = grad_noise(st*4.);
    color *= mix(newcolor, 0.3*vec3(zoomed_noise), 0.5);
    return color;
}
  

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 redcolor = vec3(0.702, 0.0, 0.0824);
    vec3 bluecolor = vec3(0.1137, 0.0, 0.6196);
    vec3 greencolor = vec3(0.0, 0.5412, 0.2431);

    st -= vec2(0.5);
    st *= vec2(1.3);
    st += vec2(0.5);

    st -= vec2(0.5);
    st *= vec2(2.5, 1.0);
    st += vec2(0.5);

    st += vec2(1.0, 0.0);

    color += coloredrect(color, st, redcolor);
    //color *= smoothstep(.15,.2,noise(st*10.)); // Black splatter

    st += vec2(-1.0, 0.0);
    color += coloredrect(color, st, bluecolor);
    st += vec2(-1.0, 0.0);
    color += coloredrect(color, st, greencolor);

    gl_FragColor = vec4(vec3(color), 1.0);
}


