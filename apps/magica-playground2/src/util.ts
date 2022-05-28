/** gets mouse events coords relative to element that has the listener installed */
export function relativeCoords ( event ) {
  var bounds = event.currentTarget.getBoundingClientRect();
  var x = Math.ceil(event.clientX - bounds.left);
  var y = Math.ceil(event.clientY - bounds.top);
  return {x, y};
}
