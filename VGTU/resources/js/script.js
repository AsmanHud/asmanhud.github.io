function sample(arr,n) {
  let resarr = [];
  for (let i = 0; i < n; ++i) {
      resarr.push(arr[Math.floor(Math.random()*arr.length)]);
  }
  return resarr.join('');
}
let r = ['0', '1', '2', 'S'];
let s = sample(r, 5);
console.log(s+" world");