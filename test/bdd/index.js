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
const Value = require('../../lib/service/value');
const Class = require('../../lib/service/class');
const Factory = require('../../lib/service/factory');
const Container = require('../../');

/**
 */
describe('container', () => {
	/**
	 */
	it('new Container()', () => {
		let symbol = Symbol('name');
		let service = new Value(null);
		let symbol2 = Symbol('name2');
		let service2 = new Value('foo', true);
		let service3 = new Value('bar', false);
		let container = new Container();
		
		assert.ok(container.set('name', service) instanceof Container);
		assert.ok(container.set(symbol, service) instanceof Container);
		assert.strictEqual(container.get('name'), service);
		assert.strictEqual(container.get(symbol), service);

		assert.ok(container.isExists('name'));
		assert.ok(container.isExists(symbol));
		assert.ok(!container.isReadonly('name'));
		assert.ok(!container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), null);
		assert.strictEqual(container.create('name'), null);
		assert.strictEqual(container.resolve(symbol), null);
		assert.strictEqual(container.create(symbol), null);

		assert.ok(container.setIfNotExists('name', service2) instanceof Container);
		assert.ok(container.setIfNotExists(symbol, service2) instanceof Container);
		assert.ok(container.setIfNotReadonly('name', service2) instanceof Container);
		assert.ok(container.setIfNotReadonly(symbol, service2) instanceof Container);
		assert.ok(container.setIfNotReadonly('name', service3) instanceof Container);
		assert.ok(container.setIfNotReadonly(symbol, service3) instanceof Container);

		assert.ok(container.isReadonly('name'));
		assert.ok(container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), 'foo');
		assert.strictEqual(container.resolve('name',[]), 'foo');
		assert.strictEqual(container.create('name'), 'foo');
		assert.strictEqual(container.create('name',[]), 'foo');
		assert.strictEqual(container.resolve(symbol), 'foo');
		assert.strictEqual(container.resolve(symbol,[]), 'foo');
		assert.strictEqual(container.create(symbol), 'foo');
		assert.strictEqual(container.create(symbol,[]), 'foo');

		assert.ok(container.setIfNotExists('name2', service) instanceof Container);
		assert.ok(container.setIfNotExists(symbol2, service) instanceof Container);
		assert.ok(container.setIfNotReadonly('name2', service3) instanceof Container);
		assert.ok(container.setIfNotReadonly(symbol2, service3) instanceof Container);

		assert.strictEqual(container.resolve('name2'), 'bar');
		assert.strictEqual(container.create('name2'), 'bar');
		assert.strictEqual(container.resolve(symbol2), 'bar');
		assert.strictEqual(container.create(symbol2), 'bar');
	});

	/**
	 */
	it('new Container().#value', () => {
		let value = null;
		let symbol = Symbol('name');
		let value2 = 'foo';
		let symbol2 = Symbol('name2');
		let value3 = 'bar';
		let container = new Container();
		
		assert.ok(container.value('name', value) instanceof Container);
		assert.ok(container.value(symbol, value) instanceof Container);
		assert.ok(container.get('name') instanceof Value);
		assert.ok(container.get(symbol) instanceof Value);

		assert.ok(container.isExists('name'));
		assert.ok(container.isExists(symbol));
		assert.ok(!container.isReadonly('name'));
		assert.ok(!container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), value);
		assert.strictEqual(container.create('name'), value);
		assert.strictEqual(container.resolve(symbol), value);
		assert.strictEqual(container.create(symbol), value);

		assert.ok(container.valueIfNotExists('name', value2) instanceof Container);
		assert.ok(container.valueIfNotExists(symbol, value2) instanceof Container);
		assert.ok(container.valueIfNotReadonly('name', value2, true) instanceof Container);
		assert.ok(container.valueIfNotReadonly(symbol, value2, true) instanceof Container);
		assert.ok(container.valueIfNotReadonly('name', value3) instanceof Container);
		assert.ok(container.valueIfNotReadonly(symbol, value3) instanceof Container);

		assert.ok(container.isReadonly('name'));
		assert.ok(container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), value2);
		assert.strictEqual(container.create('name'), value2);
		assert.strictEqual(container.resolve(symbol), value2);
		assert.strictEqual(container.create(symbol), value2);

		assert.ok(container.valueIfNotExists('name2', value2) instanceof Container);
		assert.ok(container.valueIfNotExists(symbol2, value2) instanceof Container);
		assert.ok(container.valueIfNotReadonly('name2', value3) instanceof Container);
		assert.ok(container.valueIfNotReadonly(symbol2, value3) instanceof Container);

		assert.strictEqual(container.resolve('name2'), value3);
		assert.strictEqual(container.create('name2'), value3);
		assert.strictEqual(container.resolve(symbol2), value3);
		assert.strictEqual(container.create(symbol2), value3);
	});

	/**
	 */
	it('new Container().#class', () => {
		let klass = function(){this.value = null;}
		let symbol = Symbol('name');
		let klass2 = function(){this.value = 'foo';}
		let symbol2 = Symbol('name2');
		let klass3 = function(){this.value = 'bar';}
		let container = new Container();
		
		assert.ok(container.class('name', klass) instanceof Container);
		assert.ok(container.class(symbol, klass) instanceof Container);
		assert.ok(container.get('name') instanceof Class);
		assert.ok(container.get(symbol) instanceof Class);

		assert.ok(container.isExists('name'));
		assert.ok(container.isExists(symbol));
		assert.ok(!container.isReadonly('name'));
		assert.ok(!container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name').value, null);
		assert.strictEqual(container.create('name').value, null);
		assert.strictEqual(container.resolve(symbol).value, null);
		assert.strictEqual(container.create(symbol).value, null);

		assert.ok(container.classIfNotExists('name', klass2) instanceof Container);
		assert.ok(container.classIfNotExists(symbol, klass2) instanceof Container);
		assert.ok(container.classIfNotReadonly('name', klass2, true) instanceof Container);
		assert.ok(container.classIfNotReadonly(symbol, klass2, true) instanceof Container);
		assert.ok(container.classIfNotReadonly('name', klass3) instanceof Container);
		assert.ok(container.classIfNotReadonly(symbol, klass3) instanceof Container);

		assert.ok(container.isReadonly('name'));
		assert.ok(container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name').value, 'foo');
		assert.strictEqual(container.create('name').value, 'foo');
		assert.strictEqual(container.resolve(symbol).value, 'foo');
		assert.strictEqual(container.create(symbol).value, 'foo');

		assert.ok(container.classIfNotExists('name2', klass2) instanceof Container);
		assert.ok(container.classIfNotExists(symbol2, klass2) instanceof Container);
		assert.ok(container.classIfNotReadonly('name2', klass3) instanceof Container);
		assert.ok(container.classIfNotReadonly(symbol2, klass3) instanceof Container);

		assert.strictEqual(container.resolve('name2').value, 'bar');
		assert.strictEqual(container.create('name2').value, 'bar');
		assert.strictEqual(container.resolve(symbol2).value, 'bar');
		assert.strictEqual(container.create(symbol2).value, 'bar');
	});


	/**
	 */
	it('new Container().#factory', () => {
		let factory = () => null;
		let symbol = Symbol('name');
		let factory2 = () => 'foo';
		let symbol2 = Symbol('name2');
		let factory3 = () => 'bar';
		let container = new Container();
		
		assert.ok(container.factory('name', factory) instanceof Container);
		assert.ok(container.factory(symbol, factory) instanceof Container);
		assert.ok(container.get('name') instanceof Factory);
		assert.ok(container.get(symbol) instanceof Factory);

		assert.ok(container.isExists('name'));
		assert.ok(container.isExists(symbol));
		assert.ok(!container.isReadonly('name'));
		assert.ok(!container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), null);
		assert.strictEqual(container.create('name'), null);
		assert.strictEqual(container.resolve(symbol), null);
		assert.strictEqual(container.create(symbol), null);

		assert.ok(container.factoryIfNotExists('name', factory2) instanceof Container);
		assert.ok(container.factoryIfNotExists(symbol, factory2) instanceof Container);
		assert.ok(container.factoryIfNotReadonly('name', factory2, true) instanceof Container);
		assert.ok(container.factoryIfNotReadonly(symbol, factory2, true) instanceof Container);
		assert.ok(container.factoryIfNotReadonly('name', factory3) instanceof Container);
		assert.ok(container.factoryIfNotReadonly(symbol, factory3) instanceof Container);

		assert.ok(container.isReadonly('name'));
		assert.ok(container.isReadonly(symbol));
		assert.strictEqual(container.resolve('name'), 'foo');
		assert.strictEqual(container.create('name'), 'foo');
		assert.strictEqual(container.resolve(symbol), 'foo');
		assert.strictEqual(container.create(symbol), 'foo');

		assert.ok(container.factoryIfNotExists('name2', factory2) instanceof Container);
		assert.ok(container.factoryIfNotExists(symbol2, factory2) instanceof Container);
		assert.ok(container.factoryIfNotReadonly('name2', factory3) instanceof Container);
		assert.ok(container.factoryIfNotReadonly(symbol2, factory3) instanceof Container);

		assert.strictEqual(container.resolve('name2'), 'bar');
		assert.strictEqual(container.create('name2'), 'bar');
		assert.strictEqual(container.resolve(symbol2), 'bar');
		assert.strictEqual(container.create(symbol2), 'bar');
	});

	/**
	 */
	it('new Container()...catch(e)', () => {
		let symbol = Symbol('name');
		let service = new Value(null, true);
		let container = new Container();

		try{
			container.set();
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.set('name');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.set(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.get();
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.get('name');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.get(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.set('name', service);
			container.set('name', service);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}

		try{
			container.set(symbol, service);
			container.set(symbol, service);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});
});