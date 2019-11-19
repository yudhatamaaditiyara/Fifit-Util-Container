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

describe('service/Class', () => {
  it('must be instanceof Service', () => {
    class Foo{}
    let service = new Class(Foo);
    assert.ok(service instanceof Service);
  });

  it('must be work new Class(#factory)', () => {
    class Foo{}
    let service = new Class(Foo);
    assert.strictEqual(service.factory, Foo);
    assert.strictEqual(service.readonly, false);
  });

  it('must be work new Class(#factory, true)', () => {
    class Foo{}
    let service = new Class(Foo, true);
    assert.strictEqual(service.factory, Foo);
    assert.strictEqual(service.readonly, true);
  });

  it('must be work new Class(#factory).resolve()', () => {
    class Foo{
      constructor(value){
        this.value = value;
      }
    }
    let service = new Class(Foo);
    assert.strictEqual(service.resolve().value, void 0);
    assert.strictEqual(service.exports.value, void 0);
  });

  it('must be work new Class(#factory).resolve([#args])', () => {
    class Foo{
      constructor(value){
        this.value = value;
      }
    }
    let service = new Class(Foo);
    assert.strictEqual(service.resolve([true]).value, true);
    assert.strictEqual(service.resolve([false]).value, true);
    assert.strictEqual(service.exports.value, true);
  });

  it('must be work new Class(#factory).create()', () => {
    class Foo{
      constructor(value){
        this.value = value;
      }
    }
    let service = new Class(Foo);
    assert.strictEqual(service.create().value, void 0);
    assert.strictEqual(service.exports, void 0);
  });

  it('must be work new Class(#factory).create([#args])', () => {
    class Foo{
      constructor(value){
        this.value = value;
      }
    }
    let service = new Class(Foo);
    assert.strictEqual(service.create([true]).value, true);
    assert.strictEqual(service.create([false]).value, false);
    assert.strictEqual(service.exports, void 0);
  });

  it('must be throw IllegalArgumentError() -> new Class()', () => {
    try {
      new Class();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() -> new Class(null)', () => {
    try {
      new Class(null);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() -> new Class(null, true)', () => {
    try {
      new Class(null, true);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});