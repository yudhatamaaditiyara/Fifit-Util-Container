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
const Service = require('../../../lib/service/service');

describe('service/Service', () => {
  it('must be work new Service(#factory)', () => {
    let service = new Service(true);
    assert.strictEqual(service.factory, true);
    assert.strictEqual(service.readonly, false);
  });

  it('must be work new Service(#factory).resolve()', () => {
    let service = new Service(true);
    assert.strictEqual(service.resolve(), true);
    assert.strictEqual(service.resolve([]), true);
  });

  it('must be work new Service(#factory).create()', () => {
    let service = new Service(true);
    assert.strictEqual(service.create(), true);
    assert.strictEqual(service.create([]), true);
  });
});