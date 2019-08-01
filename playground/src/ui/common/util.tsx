export function printMs(ms: number) {
  return (ms / 1000) + ''.padEnd(4, ' ') + ' seconds';
}

export function memoryReport() {
  var m = (performance as any).memory;
  if (!m) {
    return {
      usedMb: 'N/A', totalMb: 'N/A', percent: 'N/A'
    };
  }
  return {
    usedMb: (m.usedJSHeapSize / 1048576).toFixed(2) + 'Mb',
    // totalMb: (m.totalJSHeapSize / 1048576).toFixed(2) + 'Mb',
    percent: (100*m.usedJSHeapSize / m.totalJSHeapSize).toFixed(1) + '%',
  };
}
