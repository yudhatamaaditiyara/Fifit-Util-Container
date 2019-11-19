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
const Value = require('../../lib/service/value');
const Container = require('../../');

describe('Container#valueIfNotReadonly', () => {
  it('must be work called with ("name.readonly", #factory)', () => {
    let container = new Container();
    assert.ok(container.valueIfNotReadonly('name.readonly', 1) instanceof Container);
    assert.ok(container.valueIfNotReadonly('name.readonly', 2) instanceof Container);

    assert.ok(container.get('name.readonly') instanceof Value);
    assert.strictEqual(container.get('name.readonly').factory, 2);
  });
  
  it('must be work called with (Symbol("name.readonly"), #factory)', () => {
    let symbol = Symbol('name.readonly');
    let container = new Container();
    assert.ok(container.valueIfNotReadonly(symbol, 1) instanceof Container);
    assert.ok(container.valueIfNotReadonly(symbol, 2) instanceof Container);

    assert.ok(container.get(symbol) instanceof Value);
    assert.strictEqual(container.get(symbol).factory, 2);
  });

  it('must be work called with ("name.readonly", #factory, true)', () => {
    let container = new Container();
    assert.ok(container.valueIfNotReadonly('name.readonly', 1, true) instanceof Container);
    assert.ok(container.valueIfNotReadonly('name.readonly', 2, true) instanceof Container);

    assert.ok(container.get('name.readonly') instanceof Value);
    assert.strictEqual(container.get('name.readonly').factory, 1);
  });

  it('must be work called with (Symbol("name.readonly"), #factory, true)', () => {
    let symbol = Symbol('name.readonly');
    let container = new Container();
    assert.ok(container.valueIfNotReadonly(symbol, 1, true) instanceof Container);
    assert.ok(container.valueIfNotReadonly(symbol, 2, true) instanceof Container);
    
    assert.ok(container.get(symbol) instanceof Value);
    assert.strictEqual(container.get(symbol).factory, 1);
  });
});