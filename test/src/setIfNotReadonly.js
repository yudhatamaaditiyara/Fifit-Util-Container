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

describe('Container#setIfNotReadonly', () => {
  it('must be work called with ("name", #service)', () => {
    let service1 = new Value(true);
    let service2 = new Value(true);
    let container = new Container();

    assert.ok(container.set('name', service1) instanceof Container);
    assert.ok(container.setIfNotReadonly('name', service2) instanceof Container);

    assert.strictEqual(container.get('name'), service2);
  });

  it('must be work called with (Symbol("name"), #service)', () => {
    let symbol = Symbol('name.readonly');
    let service1 = new Value(true);
    let service2 = new Value(true);
    let container = new Container();

    assert.ok(container.set(symbol, service1) instanceof Container);
    assert.ok(container.setIfNotReadonly(symbol, service2) instanceof Container);

    assert.strictEqual(container.get(symbol), service2);
  });
 
  it('must be work called with ("name.readonly", #service)', () => {
    let service1 = new Value(true, true);
    let service2 = new Value(true, true);
    let container = new Container();

    assert.ok(container.set('name.readonly', service1) instanceof Container);
    assert.ok(container.setIfNotReadonly('name.readonly', service2) instanceof Container);

    assert.strictEqual(container.get('name.readonly'), service1);
  });

  it('must be work called with (Symbol("name.readonly"), #service)', () => {
    let symbol = Symbol('name.readonly');
    let service1 = new Value(true, true);
    let service2 = new Value(true, true);
    let container = new Container();

    assert.ok(container.set(symbol, service1) instanceof Container);
    assert.ok(container.setIfNotReadonly(symbol, service2) instanceof Container);

    assert.strictEqual(container.get(symbol), service1);
  });
});