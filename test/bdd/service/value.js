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
const Service = require('../../../lib/service/service');
const Value = require('../../../lib/service/value');

/**
 */
describe('service/value', () => {
	/**
	 */
	it('instance of Service', () => {
		let service = new Value();
		assert.ok(service instanceof Service);
	});

	/**
	 */
	it('new Value(#factory)', () => {
		let factory = ()=>{};
		let service = new Value(factory);
		assert.strictEqual(service.factory, factory);
		assert.strictEqual(service.readonly, false);
		assert.strictEqual(service.create(), factory);
		assert.strictEqual(service.resolve(), factory);
		assert.strictEqual(service.create([]), factory);
		assert.strictEqual(service.resolve([]), factory);
	});

	/**
	 */
	it('new Value(#factory, true)', () => {
		let factory = ()=>{};
		let service = new Value(factory, true);
		assert.strictEqual(service.factory, factory);
		assert.strictEqual(service.readonly, true);
		assert.strictEqual(service.create(), factory);
		assert.strictEqual(service.resolve(), factory);
		assert.strictEqual(service.create([]), factory);
		assert.strictEqual(service.resolve([]), factory);
	});
});