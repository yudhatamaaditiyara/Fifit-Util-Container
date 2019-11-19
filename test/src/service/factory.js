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
const Factory = require('../../../lib/service/factory');

describe('service/Factory', () => {
  it('must be instanceof Service', () => {
    let foo = () => {};
    let service = new Factory(foo);
    assert.ok(service instanceof Service);
  });

  it('must be work new Factory(#factory)', () => {
    let foo = () => {};
    let service = new Factory(foo);
    assert.strictEqual(service.factory, foo);
    assert.strictEqual(service.readonly, false);
  });

  it('must be work new Factory(#factory, true)', () => {
    let foo = () => {};
    let service = new Factory(foo, true);
    assert.strictEqual(service.factory, foo);
    assert.strictEqual(service.readonly, true);
  });

  it('must be work new Factory(#factory).resolve()', () => {
    let foo = (value) => value;
    let service = new Factory(foo);
    assert.strictEqual(service.resolve(), void 0);
    assert.strictEqual(service.exports, void 0);
  });

  it('must be work new Factory(#factory).resolve([#args])', () => {
    let foo = (value) => value;
    let service = new Factory(foo);
    assert.strictEqual(service.resolve([true]), true);
    assert.strictEqual(service.resolve([false]), true);
    assert.strictEqual(service.exports, true);
  });

  it('must be work new Factory(#factory).create()', () => {
    let foo = (value) => value;
    let service = new Factory(foo);
    assert.strictEqual(service.create(), void 0);
    assert.strictEqual(service.exports, void 0);
  });

  it('must be work new Factory(#factory).create([#args])', () => {
    let foo = (value) => value;
    let service = new Factory(foo);
    assert.strictEqual(service.create([true]), true);
    assert.strictEqual(service.create([false]), false);
    assert.strictEqual(service.exports, void 0);
  });

  it('must be throw IllegalArgumentError() -> new Factory()', () => {
    try {
      new Factory();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() -> new Factory(null)', () => {
    try {
      new Factory(null);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() -> new Factory(null, true)', () => {
    try {
      new Factory(null, true);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});