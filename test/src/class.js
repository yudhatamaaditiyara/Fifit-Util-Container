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

describe('Container#class', () => {
  it('must be work called with ("name", #factory)', () => {
    class Foo{}
    let container = new Container();
    assert.ok(container.class('name', Foo) instanceof Container);
    assert.ok(container.get('name') instanceof Class);
  });

  it('must be work called with (Symbol("name"), #factory)', () => {
    class Foo{}
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.class(symbol, Foo) instanceof Container);
    assert.ok(container.get(symbol) instanceof Class);
  });

  it('must be work called with ("name", #factory, true)', () => {
    class Foo{}
    let container = new Container();
    assert.ok(container.class('name', Foo, true) instanceof Container);
    assert.ok(container.get('name') instanceof Class);
  });

  it('must be work called with (Symbol("name"), #factory, true)', () => {
    class Foo{}
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.class(symbol, Foo, true) instanceof Container);
    assert.ok(container.get(symbol) instanceof Class);
  });
});