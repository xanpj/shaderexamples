// Author @xanpj

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(){
  vec2 coord = (gl_FragCoord.xy / u_resolution);
  float color = 0.0;

  color += cos(coord.x * 6.0 + sin(u_time + coord.y * 90.0 + sin(coord.x * 30.0 * cos(u_time) / 5.0))) * 0.5;
  
  gl_FragColor = vec4(vec3(color + coord.x, color+ coord.x, color), 1.0);
}
