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
const Class = require('../../lib/service/class');
const Container = require('../../');

describe('Container#classIfNotReadonly', () => {
  it('must be work called with ("name", #factory)', () => {
    class Foo{}
    class Bar{}
    let container = new Container();
    assert.ok(container.classIfNotReadonly('name', Foo) instanceof Container);
    assert.ok(container.classIfNotReadonly('name', Bar) instanceof Container);

    assert.ok(container.get('name') instanceof Class);
    assert.strictEqual(container.get('name').factory, Bar);
  });

  it('must be work called with (Symbol("name"), #factory)', () => {
    class Foo{}
    class Bar{}
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.classIfNotReadonly(symbol, Foo) instanceof Container);
    assert.ok(container.classIfNotReadonly(symbol, Bar) instanceof Container);

    assert.ok(container.get(symbol) instanceof Class);
    assert.strictEqual(container.get(symbol).factory, Bar);
  });

  it('must be work called with ("name", #factory, true)', () => {
    class Foo{}
    class Bar{}
    let container = new Container();
    assert.ok(container.classIfNotReadonly('name', Foo, true) instanceof Container);
    assert.ok(container.classIfNotReadonly('name', Bar, true) instanceof Container);

    assert.ok(container.get('name') instanceof Class);
    assert.strictEqual(container.get('name').factory, Foo);
  });

  it('must be work called with (Symbol("name"), #factory, true)', () => {
    class Foo{}
    class Bar{}
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.classIfNotReadonly(symbol, Foo, true) instanceof Container);
    assert.ok(container.classIfNotReadonly(symbol, Bar, true) instanceof Container);

    assert.ok(container.get(symbol) instanceof Class);
    assert.strictEqual(container.get(symbol).factory, Foo);
  });
});