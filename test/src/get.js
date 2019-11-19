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
const Container = require('../../');

describe('Container#get', () => {
  it('must be work called with ("name")', () => {
    let service = new Value(1); 
    let container = new Container();
    assert.ok(container.set('name', service) instanceof Container);
    assert.strictEqual(container.get('name'), service);
  });

  it('must be work called with (Symbol("name"))', () => {
    let symbol = Symbol('name');
    let service = new Value(1);
    let container = new Container();
    assert.ok(container.set(symbol, service) instanceof Container);
    assert.strictEqual(container.get(symbol), service);
  });

  it('must be throw IllegalArgumentError() called with ("unknown")', () => {
    let container = new Container();
    try {
      container.get('unknown');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with (Symbol("unknown"))', () => {
    let symbol = Symbol('unknown');
    let container = new Container();
    try {
      container.get(symbol);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});