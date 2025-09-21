export default function (fn, duration = 100) {
  let Timer = null;
  // console.log("debouced", fn, this);
  return function (...args) {
    if (Timer) {
      clearTimeout(Timer)
    }
    Timer = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}