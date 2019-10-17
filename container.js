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
'use strict';

const Service = require('./service/service');
const Value = require('./service/value');
const Class = require('./service/class');
const Factory = require('./service/factory');

/**
 */
class Container
{
	/**
	 * @constructor
	 */
	constructor(){
		this._services = {};
	}

	/**
	 * @param {string|symbol} name
	 * @throws {Error}
	 * @returns {Service}
	 */
	get(name){
		if (!this.isExists(name)) {
			throw new Error(`The service '${name}' not found`);
		}
		return this._services[name];
	}
	
	/**
	 * @param {string|symbol} name
	 * @param {Service} service
	 * @throws {Error}
	 * @returns {Container}
	 */
	set(name, service){
		if (!(service instanceof Service)) {
			throw new Error('The service must be instance of Service');
		}
		if (this.isReadonly(name)) {
			throw new Error(`The service '${name}' cannot be overridden`);
		}
		Object.defineProperty(this._services, name, {value: service, writable: !service.readonly, enumerable: true});
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Service} service
	 * @returns {Container}
	 */
	setIfNotExists(name, service){
		if (!this.isExists(name)) {
			this.set(name, service);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Service} service
	 * @returns {Container}
	 */
	setIfNotReadonly(name, service){
		if (!this.isExists(name)) {
			this.set(name, service);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @returns {boolean}
	 */
	isExists(name){
		return Object.prototype.hasOwnProperty.call(this._services, name);
	}

	/**
	 * @param {string|symbol} name
	 * @returns {boolean}
	 */
	isReadonly(name){
		let descriptor = Object.getOwnPropertyDescriptor(this._services, name);
		return !!descriptor && !descriptor.writable;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Array} args
	 * @returns {any}
	 */
	resolve(name, args = []){
		return this.get(name).resolve(args);
	}

	/**
	 * @param {string|symbol} name
	 * @param {Array} args
	 * @returns {any}
	 */
	create(name, args = []){
		return this.get(name).create(args);
	}

	/**
	 * @param {string|symbol} name
	 * @param {any} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	value(name, factory, readonly){
		return this.set(name, new Value(factory, readonly));
	}

	/**
	 * @param {string|symbol} name
	 * @param {any} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	valueIfNotExists(name, factory, readonly){
		if (!this.isExists(name)) {
			this.value(name, factory, readonly);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {any} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	valueIfNotReadonly(name, factory, readonly){
		if (!this.isReadonly(name)) {
			this.value(name, factory, readonly);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	class(name, factory, readonly){
		return this.set(name, new Class(factory, readonly));
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	classIfNotExists(name, factory, readonly){
		if (!this.isExists(name)) {
			this.class(name, factory, readonly);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	classIfNotReadonly(name, factory, readonly){
		if (!this.isReadonly(name)) {
			this.class(name, factory, readonly);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	factory(name, factory, readonly){
		return this.set(name, new Factory(factory, readonly));
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	factoryIfNotExists(name, factory, readonly){
		if (!this.isExists(name)) {
			this.factory(name, factory, readonly);
		}
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {function} factory
	 * @param {boolean} readonly
	 * @returns {Container}
	 */
	factoryIfNotReadonly(name, factory, readonly){
		if (!this.isReadonly(name)) {
			this.factory(name, factory, readonly);
		}
		return this;
	}
}

/**
 * @+
 */
module.exports = Container;