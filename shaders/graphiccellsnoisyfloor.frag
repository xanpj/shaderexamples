
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;




vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 org_st = st;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);

    // Borders
    st -= vec2(0.5);
    float sty_inv = 1.0-org_st.y;
    st.xy *= vec2(0.0, 0.5) - vec2(10.*((1.0)/sty_inv));
    //st *= (org_st.y > 0.1) ? 10. * vec2(0.5, 0.5) : vec2(1.0);
    //st *= (org_st.y < 0.9) ? 10. * vec2(0.5, 0.5) : vec2(1.0);
    st -= vec2(0.0,u_time*10.0);
    st += vec2(0.5);

    st *= 1.; //MODIFY FOR KALEIDOSCOPE
    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 10.;  // minimun distance
    vec2 m_point;        // minimum point

    float dists[9];
    int counter = 0;
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 neighbor = vec2(float(i),float(j));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5*sin(u_time + 6.2831*point);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            dists[counter] = dist;
            if( dist < m_dist/*sin(u_time*0.01)*/ ) {
                m_dist = dist;
                m_point = point;
                //m_point += snoise(vec3(st*75.,u_time*0.1))*0.03;
            }
            counter++;
        }
    }
    counter = 0;
     for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            if((dists[counter] - m_dist) < 0.01){
                //m_point *= vec2(0.5, 0.1);
            }
            counter++;
        }
     }

    // Assign a color using the closest point position
    color += dot(m_point,vec2(.3,.6));

    vec3 greencolor = vec3((st.x*st.y*0.05)*0.5, (st.x*st.y*0.8549)*0.5, (st.x*st.y*0.8549)*0.5)*0.2;
    //color.rgb *= greencolor;
    //gl_FragColor = vec4(mix(vec3(0.0),vec3(1.),step(0.1,color)),1.0);



    // Add distance field to closest point center
    //color.g = m_dist;

    gl_FragColor = vec4(color,1.0);
}


