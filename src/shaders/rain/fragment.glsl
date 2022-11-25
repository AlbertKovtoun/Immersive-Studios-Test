// uniform vec3 uColor;
varying float progress;

varying vec2 vUv;

void main()
{

    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    float circleAlpha = step(ll, 0.5);

    // float alpha = circleAlpha * 1. - progress;
    float alpha = step(0.8, gl_PointCoord.x);

    gl_FragColor = vec4(vec3(1.0), alpha - 0.5);
}