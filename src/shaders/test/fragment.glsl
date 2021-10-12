uniform float uTime;
varying vec4 vP;
void main() {
    vec3 color = vec3(sin(vP.z), tan(vP.x), cos(vP.x));    // color = color1;
    gl_FragColor = vec4(color,1.0);
}