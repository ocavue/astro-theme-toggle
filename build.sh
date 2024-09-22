cd $(dirname $0)
export PATH=$PATH:$PWD/node_modules/.bin

esbuild --minify --bundle --outdir=temp lib/theme-script.ts
cp lib/theme-style.astro lib/theme-script.astro
echo "<script is:inline>" >> lib/theme-script.astro
cat temp/theme-script.js >> lib/theme-script.astro
echo "</script>" >> lib/theme-script.astro

astro build 
