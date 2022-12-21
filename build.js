const fs = require('fs-extra');

async function updateManifest() {
  try {
    // Read the manifest.json file generated by the WebpackManifestPlugin
    const manifest = await fs.readJson('dist/manifest.json');

    // Read the extension's manifest.json file
    const extensionManifest = await fs.readJson('src/manifest.json');

    // Update the extension's manifest.json file with the compiled file names that include the hash
    extensionManifest.background.service_worker = manifest['background.js'];
    // extensionManifest.content_scripts[0].js[0] = manifest['content.js'];

    // Write the updated manifest to the extension's manifest.json file
    await fs.writeJson('dist/manifest.json', extensionManifest, { spaces: 2 });
  } catch (error) {
    console.error(error);
  }
}

updateManifest();