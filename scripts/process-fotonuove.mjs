import sharp from 'sharp';
import { readdir, mkdir, unlink, stat, copyFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { join, extname } from 'node:path';

const SRC = 'fotonuove';
const DST = 'public/negozio';
const MAX_SIDE = 1400;

await mkdir(DST, { recursive: true });

const files = await readdir(SRC);

// ═══════════════════════════════════════════════════════════════
// 1. HEIC → JPG (via heif-convert) → WebP (via sharp)
// ═══════════════════════════════════════════════════════════════
const heicFiles = files.filter(f => /\.heic$/i.test(f));
let idx = 14; // 11/12/13 già usati dal run precedente
for (const file of heicFiles) {
  const src = join(SRC, file);
  const tmpJpg = join(SRC, file.replace(/\.heic$/i, '.__tmp.jpg'));
  execSync(`heif-convert -q 92 "${src}" "${tmpJpg}"`, { stdio: 'pipe' });
  const outName = `new-${idx}.webp`;
  const dst = join(DST, outName);
  const meta = await sharp(tmpJpg).metadata();
  const isLandscape = (meta.width ?? 0) > (meta.height ?? 0);
  await sharp(tmpJpg)
    .rotate()
    .resize({ [isLandscape ? 'width' : 'height']: MAX_SIDE, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(dst);
  await unlink(tmpJpg);
  console.log(`✓ ${file} → ${outName} (${isLandscape ? 'landscape' : 'portrait'})`);
  idx++;
}

// ═══════════════════════════════════════════════════════════════
// 2. MP4 → MP4 compresso (h264, AAC, bitrate ragionevole)
// ═══════════════════════════════════════════════════════════════
const mp4Files = files.filter(f => /\.mp4$/i.test(f));
let vIdx = 8; // video esistenti 01-07, continua da 08
for (const file of mp4Files) {
  const src = join(SRC, file);
  const outName = `new-${vIdx}.mp4`;
  const dst = join(DST, outName);
  // Compressione: h264 CRF 26, scaled a max 1080p, AAC 128k
  const cmd = `ffmpeg -y -i "${src}" -vcodec libx264 -preset medium -crf 26 -vf "scale='min(1080,iw)':-2" -acodec aac -b:a 128k -movflags +faststart "${dst}"`;
  execSync(cmd, { stdio: 'pipe' });
  const srcSize = (await stat(src)).size;
  const dstSize = (await stat(dst)).size;
  const saved = Math.round((1 - dstSize / srcSize) * 100);
  console.log(`✓ ${file} → ${outName} (${(srcSize/1024/1024).toFixed(1)}MB → ${(dstSize/1024/1024).toFixed(1)}MB, -${saved}%)`);
  vIdx++;
}

console.log('\n✅ Tutti i media processati in', DST);
