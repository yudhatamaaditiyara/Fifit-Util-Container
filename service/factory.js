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

const Service = require('./service');

/**
 */
class Factory extends Service
{
	/**
	 * @param {function} factory
	 * @param {boolean|void} readonly
	 * @throws {Error}
	 */
	constructor(factory, readonly){
		if (typeof factory != 'function') {
			throw new Error('The factory must be type of function');
		}
		super(factory, readonly);
	}

	/**
	 * @param {Array} args
	 * @returns {Object}
	 */
	resolve(args = []){
		return this.exports || (this.exports = this.create(args));
	}

	/**
	 * @param {Array} args
	 * @returns {Object}
	 */
	create(args = []){
		return this.factory(...args);
	}
}

/**
 * @+
 */
module.exports = Factory;