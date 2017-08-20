const path = require('path');
const { exec } = require('child_process');
const { readdir, open, writeFile } = require('fs');
const { promisify } = require('util');
const nodeID3 = require('node-id3');

const readDirectory = promisify(readdir);
const execute = promisify(exec);
const openFile = promisify(open);

const workDir = path.resolve(process.argv[2] || '.');
const filenameRegex = /^(\d+)__(\w+)__([a-z0-9\-]+).wav$/i;
const fileWrite = promisify(writeFile);

readDirectory(workDir).then(function (filenames) {
  return filenames.filter(function (filename) {
    return path.extname(filename).toLowerCase() == '.wav';
  })
}).then(function (filenames) {
  return Promise.all(filenames.map(function (filename) {
    const
      inputFilename = path.resolve(workDir, filename),
      outputFilename = inputFilename.substr(inputFilename, inputFilename.length - 5) + '.mp3';

    console.info(`Encoding "${inputFilename}" to "${outputFilename}"...`);

    const command = `ffmpeg -y -i ${inputFilename} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${outputFilename}`;
    console.info(command);

    return execute(command, { cwd: workDir, }).then(function (stdout, stderr) {
      const
        matches = filenameRegex.exec(filename),
        tags = {
          trackNumber: matches[1],
          artist: matches[2],
          title: matches[3],
          comment: {
            language: 'eng',
            text: `https://freesound.org/people/${matches[2]}/sounds/${matches[1]}/`,
          },
        };

      console.info(
        `"${outputFilename}" encoded.`,
        `Tagging with `,
        `'trackNumber:${tags.trackNumber}'`,
        `'artist:${tags.artist}'`,
        `'title:${tags.title}'`);

      nodeID3.write(tags, outputFilename);
      tags.filename = filename;
      return tags;
    });
  }))
}).then(function (tags) {
  const
    manifest = tags.reduce(function (manifest, tag) {
      manifest[tag.trackNumber] = tag;
      return manifest;
    }, {})
  return fileWrite(path.resolve(workDir, 'manifest.json'), JSON.stringify(manifest)).then(function () {
    return manifest;
  });
});
