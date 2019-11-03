/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const {IllegalArgumentError} = require('ganiyem-error');
const Service = require('../../../lib/service/service');
const Class = require('../../../lib/service/class');

/**
 */
describe('service/class', () => {
	/**
	 */
	it('instance of Service', () => {
		let service = new Class(()=>{});
		assert.ok(service instanceof Service);
	});

	/**
	 */
	it('new Class(#factory)', () => {
		let factory = Service;
		let service = new Class(factory);
		assert.strictEqual(service.factory, factory);
		assert.strictEqual(service.readonly, false);

		let exports = service.resolve([1]);
		assert.strictEqual(exports.factory, 1);
		assert.strictEqual(service.resolve().factory, exports.factory);
		assert.strictEqual(service.resolve([2]).factory, exports.factory);
		assert.strictEqual(service.resolve([3]), exports);
		assert.strictEqual(service.exports, exports);

		let instance = service.create([1]);
		assert.strictEqual(instance.factory, 1);
		assert.notStrictEqual(service.create([1]), instance);

		assert.strictEqual(service.create().factory, undefined);
	});

	/**
	 */
	it('new Class(#factory, true)', () => {
		let factory = Service;
		let service = new Class(factory, true);
		assert.strictEqual(service.factory, factory);
		assert.strictEqual(service.readonly, true);

		let exports = service.resolve([1]);
		assert.strictEqual(exports.factory, 1);
		assert.strictEqual(service.resolve().factory, exports.factory);
		assert.strictEqual(service.resolve([2]).factory, exports.factory);
		assert.strictEqual(service.resolve([3]), exports);
		assert.strictEqual(service.exports, exports);

		let instance = service.create([1]);
		assert.strictEqual(instance.factory, 1);
		assert.notStrictEqual(service.create([1]), instance);
		
		assert.strictEqual(service.create().factory, undefined);
	});

	/**
	 */
	it('new Class()...catch(e)', () => {
		try {
			new Class();
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});
});