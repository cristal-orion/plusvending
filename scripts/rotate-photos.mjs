import sharp from 'sharp';
import { rename, unlink } from 'node:fs/promises';

const rotations = [
  { file: 'public/negozio/new-14.webp', angle: 270 },
  { file: 'public/negozio/new-15.webp', angle: 90 },
  { file: 'public/negozio/new-16.webp', angle: 270 },
  { file: 'public/negozio/new-17.webp', angle: 270 },
];

for (const { file, angle } of rotations) {
  const tmp = file + '.tmp.webp';
  await sharp(file).rotate(angle).webp({ quality: 82, effort: 5 }).toFile(tmp);
  await unlink(file);
  await rename(tmp, file);
  console.log(`✓ ${file} ruotata di ${angle}°`);
}
