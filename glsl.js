export const PI = /*glsl*/`
#define PI 3.14159265
`

export const rnd = /*glsl*/`
#define rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
`

export const rnd2D = /*glsl*/`
#define rnd2D(X) fract(1e5*sin(dot(mod(X,PI),vec2(9.,PI))+.1))
`

export const rot = /*glsl*/`
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
`

export const colorGradient = /*glsl*/`
vec3 colorGradient(float x, vec3 colorOffset, vec3 colorMultiply, vec3 colorAdd){
    return x-cos((x + colorOffset) * 2. * 3.1415) * colorMultiply + colorAdd;
}
vec3 colorGradient(float x, vec3 colorOffset){
    vec3 colorMultiply = vec3(.5, .5, .5);
    vec3 colorAdd = vec3(.5, .5, .5);
    return colorGradient(x, colorOffset, colorMultiply, colorAdd);
}
vec3 colorGradient(float x){
    vec3 colorOffset = vec3(.0, .2, .35);
    return colorGradient(x, colorOffset);
}
`

export const d2p = /*glsl*/`
vec2 d2p(vec2 decart) {
    float alpha = atan(decart.x, decart.y);
    float R = length(decart);
    return vec2(alpha, R);
}
`

export const p2d = /*glsl*/`
vec2 p2d(vec2 polar) {
    float alpha = polar.x;
    float R = polar.y;
    float x = sin(alpha) * R;
    float y = cos(alpha) * R;
    return vec2(x, y);
}
`

export const normFast = /*glsl*/`
vec3 normFast(vec3 p) {
    float d = sdf(p);
    vec2 e = vec2(.0001, 0);
    return normalize(vec3(d - sdf(p - e.xyy), d - sdf(p - e.yxy), d - sdf(p - e.yyx)));
}
`

export const norm = /*glsl*/`
vec3 norm(vec3 p) {
    vec2 e = vec2(.0001, 0);
    return normalize(vec3(sdf(p + e.xyy) - sdf(p - e.xyy),
                          sdf(p + e.yxy) - sdf(p - e.yxy),
                          sdf(p + e.yyx) - sdf(p - e.yyx)));
}
`


export const snoise2D = /*glsl*/`
//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+10.0)*x);
  }
  
  float snoise2D(vec2 v)
    {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
  // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
  
  // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
  
  // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
  
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
  
  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
  
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
  
  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  
  // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  `