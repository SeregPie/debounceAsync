let assert = require('assert').strict;

let debounceAsync = require('./index');

let waitAsync = function(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

(async () => {
	let run = async function(wait, leading) {
		let d = 10;
		let f = debounceAsync(async n => {
			if (wait) {
				await waitAsync(d*8);
			}
			return n;
		}, d, leading);
		let p = [];
		p.push(f(0));
		await waitAsync(d/4);
		p.push(f(1));
		await waitAsync(d/4);
		p.push(f(2));
		await waitAsync(d*4);
		p.push(f(3));
		await waitAsync(d/4);
		p.push(f(4));
		await waitAsync(d/4);
		p.push(f(5));
		return Promise.all(p);
	};
	{
		let r = await run(false, false);
		assert.deepEqual(r, [2, 2, 2, 5, 5, 5]);
	}
	{
		let r = await run(true, false);
		assert.deepEqual(r, [2, 2, 2, 2, 2, 2]);
	}
	{
		let r = await run(false, true);
		assert.deepEqual(r, [0, 0, 0, 3, 3, 3]);
	}
	{
		let r = await run(true, true);
		assert.deepEqual(r, [0, 0, 0, 0, 0, 0]);
	}
})();
