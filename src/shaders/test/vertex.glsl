uniform float uTime;
varying vec4 vP;
float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() {    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 p = modelPosition;
    p.y = cos(p.x * noise(p.z/10.) + uTime*140.);

    vec4 viewPosition = viewMatrix * p;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 3.0;
    vP = p;
}