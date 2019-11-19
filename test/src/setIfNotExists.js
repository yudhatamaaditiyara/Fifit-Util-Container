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

describe('Container#setIfNotExists', () => {
  it('must be work called with ("name", #service)', () => {
    let service = new Value(1);
    let container = new Container();
    assert.ok(container.setIfNotExists('name', service) instanceof Container);
    assert.strictEqual(container.get('name'), service);
  });

  it('must be work called with (Symbol("name"), #service)', () => {
    let symbol = Symbol('name');
    let service = new Value(1);
    let container = new Container();
    assert.ok(container.setIfNotExists(symbol, service) instanceof Container);
    assert.strictEqual(container.get(symbol), service);
  });

  it('must be work called with ("name.exists", #service)', () => {
    let service1 = new Value(1);
    let service2 = new Value(1);
    let container = new Container();

    assert.ok(container.set('name.exists', service1) instanceof Container);
    assert.ok(container.setIfNotExists('name.exists', service2) instanceof Container);

    assert.strictEqual(container.get('name.exists'), service1);
  });

  it('must be work called with (Symbol("name.exists"), #service)', () => {
    let symbol = Symbol('name.exists');
    let service1 = new Value(1);
    let service2 = new Value(1);
    let container = new Container();

    assert.ok(container.set(symbol, service1) instanceof Container);
    assert.ok(container.setIfNotExists(symbol, service2) instanceof Container);

    assert.strictEqual(container.get(symbol), service1);
  });
});