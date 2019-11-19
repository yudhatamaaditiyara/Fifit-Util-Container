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
const Factory = require('../../lib/service/factory');
const Container = require('../../');

describe('Container#factory', () => {
  it('must be work called with ("name", #factory)', () => {
    let foo = () => {};
    let container = new Container();
    assert.ok(container.factory('name', foo) instanceof Container);
    assert.ok(container.get('name') instanceof Factory);
  });

  it('must be work called with (Symbol("name"), #factory)', () => {
    let foo = () => {};
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.factory(symbol, foo) instanceof Container);
    assert.ok(container.get(symbol) instanceof Factory);
  });

  it('must be work called with ("name", #factory, true)', () => {
    let foo = () => {};
    let container = new Container();
    assert.ok(container.factory('name', foo, true) instanceof Container);
    assert.ok(container.get('name') instanceof Factory);
  });

  it('must be work called with (Symbol("name"), #factory, true)', () => {
    let foo = () => {};
    let symbol = Symbol('name');
    let container = new Container();
    assert.ok(container.factory(symbol, foo, true) instanceof Container);
    assert.ok(container.get(symbol) instanceof Factory);
  });
});