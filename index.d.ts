/**
  Vec2 represents 2D vector, point or size.

  ```js
  const a = new Vec2(1, 2)
  const b = new Vec2(3, 4)
  a.add(b) //=> Vec2(4, 6)
  a.sub(b) //=> Vec2(-2, -2)
  b.length() //=> 5
  ...
  ```
*/
export declare class Vec2 {
    x: number;
    y: number;
    /**
      @param x The x component of this vector.
      @param y The y component of this vector.
    */
    constructor(x?: number, y?: number);
    readonly width: number;
    readonly height: number;
    /**
      Checks if the vectors has same values.
    */
    equals(v: Vec2): boolean;
    /**
      Adds v to this vector.
    */
    add(v: Vec2): Vec2;
    /**
      Subtracts v from this vector.
    */
    sub(v: Vec2): Vec2;
    /**
      Multiplies components of this vector by v.
    */
    mul(v: Vec2): Vec2;
    /**
      Divides components of this vector by v.
    */
    div(v: Vec2): Vec2;
    /**
      Multiplies this vector by scalar s.
    */
    mulScalar(s: number): Vec2;
    /**
      Divides this vector by scalar s.
    */
    divScalar(s: number): Vec2;
    /**
      Inverts this vector.
    */
    neg(): Vec2;
    /**
      Calculates the length of this vector.
    */
    length(): number;
    /**
      Calculates the squared length of this vector.
    */
    squaredLength(): number;
    /**
      Calculates the angle of this vector from positive x-axis in [-PI, PI].
    */
    angle(): number;
    dot(other: Vec2): number;
    cross(other: Vec2): number;
    mix(other: Vec2, ratio: number): Vec2;
    /**
      Rounds down the components of this vector.
    */
    floor(): Vec2;
    /**
      Rounds up the components of this vector.
    */
    ceil(): Vec2;
    /**
      Rounds the components of this vector to nearest integer.
    */
    round(): Vec2;
    /**
     * Returns absolute values of this vector.
     */
    abs(): Vec2;
    /**
      Transforms this vector with transform.
    */
    transform(transform: Transform): Vec2;
    /**
      Gets an array of [x, y].
    */
    members(): number[];
    toString(): string;
}
/**
  Rect represents rectangle in 2D space.

  ```js
  // 100*200 rectangle at (0, 0)
  const r1 = new Rect(new Vec2(0), new Vec2(100, 200))
  // 100*200 rectangle at (50, 50)
  const r2 = new Rect(new Vec2(50, 50), new Vec2(150, 250))

  const intersect = Rect.intersection(r1, r2) //=> Rect(Vec2(50, 50), Vec2(100, 200))
  const union = Rect.union(r1, r2) //=> Rect(Vec2(0, 0), Vec2(150, 250))

  ...
  ```
*/
export declare class Rect {
    topLeft: Vec2;
    bottomRight: Vec2;
    /**
      Creates a rectangle. It returns empty rectangle when no arguments given.
      @param topLeft The top-left position (in top-left origin coordinates) of this rectangle.
      @param bottomRight The bottom-right position (in top-left origin coordinates) of this rectangle.
    */
    constructor(topLeft?: Vec2, bottomRight?: Vec2);
    /**
      Checks if the rectangles has same values.
    */
    equals(other: Rect): boolean;
    /**
      The size of this rectangle.
    */
    readonly size: Vec2;
    /**
      The top-right position (in top-left origin coordinates) of this rectangle.
    */
    readonly topRight: Vec2;
    /**
      The bottom-lect position (in top-left origin coordinates) of this rectangle.
    */
    readonly bottomLeft: Vec2;
    /**
      The left coordinate (in top-left origin coordinates) of this rectangle.
    */
    readonly left: number;
    /**
      The top coordinate (in top-left origin coordinates) of this rectangle.
    */
    readonly top: number;
    /**
      The right coordinate (in top-left origin coordinates) of this rectangle.
    */
    readonly right: number;
    /**
      The bottom coordinate (in top-left origin coordinates) of this rectangle.
    */
    readonly bottom: number;
    /**
      The width of this rectangle.
    */
    readonly width: number;
    /**
      The width of this rectangle.
    */
    readonly height: number;
    readonly center: Vec2;
    /**
      Calculates the smallest integer rectangle which includes this rectangle.
    */
    intBounding(): Rect;
    translate(offset: Vec2): Rect;
    inflate(offset: number): Rect;
    includes(pos: Vec2): boolean;
    /**
      Transforms each corners by transform and returns the bounding rectangle.
    */
    transform(transform: Transform): Rect;
    union(other: Rect): Rect;
    intersection(other: Rect): Rect | undefined;
    toString(): string;
    /**
     * Returns array of `[topLeft, topRight, bottomRight, bottomLeft]`.
     */
    vertices(): [Vec2, Vec2, Vec2, Vec2];
    /**
      Calculates the bounding rectangle of given rectangles.
    */
    static union(...rects: Rect[]): Rect | undefined;
    /**
      Calculates the rectangle that represents the shared region of given rectangles.
    */
    static intersection(...rects: Rect[]): Rect | undefined;
    static fromWidthHeight(x: number, y: number, width: number, height: number): Rect;
    static fromSize(topLeft: Vec2, size: Vec2): Rect;
    static fromTwoPoints(p0: Vec2, p1: Vec2): Rect;
    static fromQuad(quad: [Vec2, Vec2, Vec2, Vec2]): Rect;
}
/**
  Transform represents 2D affine and perspective transform with 3x3 matrix.

  ```js
  // translate by (100, 200)
  const translate = Transform.translate(new Vec2(100, 200))

  // 2x scale
  const scale = Transform.scale(new Vec2(2))

  // rotate 45 degrees
  const rotate = Transform.rotate(Math.PI / 4)

  // translate then scale then rotate
  const transform = translate.merge(scale).merge(rotate)
  ```
*/
export declare class Transform {
    m00: number;
    m01: number;
    m02: number;
    m10: number;
    m11: number;
    m12: number;
    m20: number;
    m21: number;
    m22: number;
    /**
      Creates a transform. It returns no-op transform when no arguments given.
      @param m00 Column 0 and row 0 component of this transform.
      @param m01 Column 0 and row 1 component of this transform.
      @param m02 Column 0 and row 2 component of this transform.
      @param m10 Column 1 and row 0 component of this transform.
      @param m11 Column 1 and row 1 component of this transform.
      @param m12 Column 1 and row 2 component of this transform.
      @param m20 Column 2 and row 0 component of this transform.
      @param m21 Column 2 and row 1 component of this transform.
      @param m22 Column 2 and row 2 component of this transform.
    */
    constructor(m00?: number, m01?: number, m02?: number, m10?: number, m11?: number, m12?: number, m20?: number, m21?: number, m22?: number);
    /**
      Checks if the transforms has same values.
    */
    equals(other: Transform): boolean;
    /**
      Merges 2 transforms. The returned transform represents "transform by this transform, then other transform".
    */
    merge(other: Transform): Transform;
    /**
      Inverts the transform. Returns undefined if this transform is not invertible.
    */
    invert(): Transform | undefined;
    isAffine(): boolean;
    isTranslation(): boolean;
    /**
      Returns the members (m00, m01, 002, ... m22) in an array.
    */
    members(): number[];
    toString(): string;
    scale(scale: Vec2): Transform;
    translate(offset: Vec2): Transform;
    rotate(angle: number): Transform;
    /**
      Returns the transform that represents scaling.
    */
    static scale(scale: Vec2): Transform;
    /**
      Returns the transform that represents rotating by angle (in radians).
    */
    static rotate(angle: number): Transform;
    /**
      Returns the transform that represents translating.
    */
    static translate(translation: Vec2): Transform;
    /**
     * Returns the perspective transform that transforms the unit square ([(0, 0), (1, 0), (0, 1), (1, 1)]) to the specified quadrangle.
     * Reference: Projective Mappings for Image Warping
     */
    static unitToQuad(quad: [Vec2, Vec2, Vec2, Vec2]): Transform | undefined;
    static quadToQuad(from: [Vec2, Vec2, Vec2, Vec2], to: [Vec2, Vec2, Vec2, Vec2]): Transform | undefined;
    static rectToRect(from: Rect, to: Rect): Transform;
    /**
      Merges all transforms.
    */
    static merge(...transforms: Transform[]): Transform;
}
