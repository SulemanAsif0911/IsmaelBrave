#!/bin/bash
# Rebuild the headless-chromium audit rig (run from anywhere; everything lands in /tmp)
set -e
mkdir -p /tmp/pkgtest /tmp/shots
cd /tmp/pkgtest
[ -f package.json ] || npm init -y >/dev/null 2>&1
npm i playwright-core pngjs @sparticuz/chromium 2>&1 | tail -1
node -e '
const fs=require("fs"),zlib=require("zlib");
const bin="node_modules/@sparticuz/chromium/bin";
const br=bin+"/chromium.br";
if(fs.existsSync(br)){
  fs.writeFileSync("/tmp/chromium", zlib.brotliDecompressSync(fs.readFileSync(br)));
  fs.chmodSync("/tmp/chromium",0o755);
  console.log("chromium extracted");
}
for(const t of ["al2023","swiftshader","fonts"]){
  if(fs.existsSync(bin+"/"+t+".tar.br")){
    fs.writeFileSync("/tmp/"+t+".tar", zlib.brotliDecompressSync(fs.readFileSync(bin+"/"+t+".tar.br")));
  } else if(fs.existsSync(bin+"/"+t+".tar")){
    fs.copyFileSync(bin+"/"+t+".tar", "/tmp/"+t+".tar");
  } else continue;
  console.log(t+" decompressed");
}
'
for t in al2023 swiftshader fonts; do
  if [ -f /tmp/$t.tar ]; then mkdir -p /tmp/$t && tar -xf /tmp/$t.tar -C /tmp/$t && rm /tmp/$t.tar && echo "extracted $t"; fi
done
pip3 install --break-system-packages -q pillow imageio imageio-ffmpeg 2>&1 | tail -1
echo RIG-DONE
