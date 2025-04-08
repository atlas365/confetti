
/**
 * calc the coefficients for a parabolic funtion in the form
 * a(x^2) + b(x) + c that intercepts 3 given points
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} x3 
 * @param {*} y3 
 * @returns 
 */
export const getCoefficients = (x1, y1, x2, y2, x3, y3) => {
  const denom = (x1-x2) * (x1-x3) * (x2-x3)
  const a = (x3 * (y2-y1) + x2 * (y1-y3) + x1 * (y3-y2)) / denom
  const b = (x3*x3 * (y1-y2) + x2*x2 * (y3-y1) + x1*x1 * (y2-y3)) / denom
  const c = (x2 * x3 * (x2-x3) * y1+x3 * x1 * (x3-x1) * y2+x1 * x2 * (x1-x2) * y3) / denom
  return { a, b, c }
}