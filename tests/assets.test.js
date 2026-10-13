import test from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/utils/assets.js';
test('project hosting prefixes bundled images and preserves uploaded and external images', () => {
  assert.equal(assetUrl('/images/foods/burger-photo.png', '/sedap-dashboard/app/'), '/sedap-dashboard/app/images/foods/burger-photo.png');
  assert.equal(assetUrl('/brand/sedap-mark.svg'), '/brand/sedap-mark.svg');
  for (const path of ['data:image/png;base64,upload', 'https://example.com/photo.jpg', undefined]) assert.equal(assetUrl(path, '/sedap-dashboard/app/'), path);
});
