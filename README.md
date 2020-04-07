# debounceAsync

`debounceAsync(func, delay = 0, leading = false)`

Creates a debounced function.

| argument | description |
| ---: | :--- |
| `func` | A function to debounce. |
| `delay` | A number as the delay. |
| `leading` | If `true`, the function is invoked on the leading edge of the delay. |

Returns a new function.

## setup

### npm

```shell
npm install @seregpie/debounce-async
```

### ES module

```javascript
import debounceAsync from '@seregpie/debounce-async';
```

### Node

```javascript
let debounceAsync = require('@seregpie/debounce-async');
```

### browser

```html
<script src="https://unpkg.com/@seregpie/debounce-async"></script>
```

The function is globally available as `debounceAsync`.

## usage

```javascript
let debounced = debounceAsync(async n => {
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
  return n;
}, 1000);
let p0 = debounced(0);
let p1 = debounced(1);
let p2 = debounced(2);
await new Promise(resolve => {
  setTimeout(resolve, 3000);
});
let p3 = debounced(3);
let p4 = debounced(4);
let p5 = debounced(5);
let r = await Promise.all([p0, p1, p2, p3, p4, p5]);
// => [2, 2, 2, 5, 5, 5]
```
