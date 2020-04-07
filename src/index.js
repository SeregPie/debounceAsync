import Function_noop from './core/Function/noop';
import Promise_try from './core/Promise/try';

export default function(func, delay, leading) {
	let queue = Promise.resolve();
	let enqueue = (func => {
		queue = queue.then(func).catch(Function_noop);
	});
	let currentThis;
	let currentArgs;
	let currentPromise;
	let resolveCurrentPromise;
	let invoke = (() => {
		let promise = Promise_try(() => func.apply(currentThis, currentArgs));
		resolveCurrentPromise(promise);
		return promise;
	});
	let restartTimer = Function_noop;
	let wait = (() => new Promise(resolve => {
		let timeoutId = setTimeout(resolve, delay);
		restartTimer = (() => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(resolve, delay);
		});
	}));
	return function(...args) {
		return Promise_try(() => {
			currentThis = this;
			currentArgs = args;
			restartTimer();
			if (!currentPromise) {
				currentPromise = new Promise(resolve => {
					resolveCurrentPromise = resolve;
				});
				if (leading) {
					enqueue(invoke);
					enqueue(wait);
				} else {
					enqueue(wait);
					enqueue(invoke);
				}
				enqueue((() => {
					currentPromise = null;
				}));
			}
			return currentPromise;
		});
	};
}
