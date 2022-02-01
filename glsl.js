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