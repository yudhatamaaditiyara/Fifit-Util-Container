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

describe('Container#set', () => {
  it('must be work called with ("name", #service)', () => {
    let service = new Value(1);
    let container = new Container();
    assert.ok(container.set('name', service) instanceof Container);
    assert.ok(container.isExists('name'));
  });

  it('must be work called with (Symbol("name"), #service)', () => {
    let symbol = Symbol('name');
    let service = new Value(1);
    let container = new Container();
    assert.ok(container.set(symbol, service) instanceof Container);
    assert.ok(container.isExists(symbol));
  });

  it('must be throw IllegalArgumentError() called with ("name", null)', () => {
    let container = new Container();
    try {
      container.set('name', null);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("name.readonly", #service)', () => {
    let service = new Value(true, true);
    let container = new Container();
    container.set('name', service);
    try {
      container.set('name', service);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with (Symbol("name"), null)', () => {
    let symbol = Symbol('name');
    let container = new Container();
    try {
      container.set(symbol, null);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with (Symbol("name.readonly"), #service)', () => {
    let symbol = Symbol('name');
    let service = new Value(true, true);
    let container = new Container();
    container.set(symbol, service);
    try {
      container.set(symbol, service);
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});