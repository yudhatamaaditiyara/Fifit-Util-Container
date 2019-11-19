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
const Class = require('../../lib/service/class');
const Factory = require('../../lib/service/factory');
const Container = require('../../');

describe('Container#create', () => {
  it('must be work create service value', () => {
    let service = new Value(1); 
    let container = new Container();
    assert.ok(container.set('value', service) instanceof Container);
    assert.strictEqual(container.create('value'), 1);
  });

  it('must be work create service class', () => {
    class Foo{}
    let service = new Class(Foo); 
    let container = new Container();
    assert.ok(container.set('container', service) instanceof Container);
    assert.notStrictEqual(container.create('container'), container.create('container'));
  });

  it('must be work create service class with args', () => {
    let service = new Class(function(value){
      this.value = value;
    }); 
    let container = new Container();
    assert.ok(container.set('container', service) instanceof Container);
    assert.strictEqual(container.create('container',[1]).value, 1);
    assert.strictEqual(container.create('container',[2]).value, 2);
  });

  it('must be work create service factory', () => {
    let index = 0;
    let service = new Factory(() => ++index); 
    let container = new Container();
    assert.ok(container.set('refcount', service) instanceof Container);
    assert.strictEqual(container.create('refcount'), 1);
    assert.strictEqual(container.create('refcount'), 2);
  });

  it('must be work create service factory with args', () => {
    let index = 0;
    let service = new Factory((add) => ++index + add); 
    let container = new Container();
    assert.ok(container.set('refcount', service) instanceof Container);
    assert.strictEqual(container.create('refcount', [1]), 2);
    assert.strictEqual(container.create('refcount', [2]), 4);
  });
});