/* global Promise */
/* eslint-env node, mocha */
/* eslint-disable no-console */

const path = require('path');
const { exec } = require('child_process');
const { readdir, writeFile } = require('fs');
const { promisify } = require('util');
const nodeID3 = require('node-id3');

const readDirectory = promisify(readdir);
const execute = promisify(exec);

const workDir = path.resolve(process.argv[2] || '.');
const filenameRegex = /^(\d+)__(\w+)__([a-z0-9\-]+).wav$/i;
const fileWrite = promisify(writeFile);

readDirectory(workDir).then(function (filenames) {
  return filenames.filter(function (filename) {
    return path.extname(filename).toLowerCase() == '.wav';
  });
}).then(function (filenames) {
  return Promise.all(filenames.map(function (filename) {
    const
      inputFilename = path.resolve(workDir, filename),
      outputFilename = inputFilename.substr(inputFilename, inputFilename.length - 3) + 'mp3';

    console.info(`Encoding "${inputFilename}" to "${outputFilename}"...`);

    const command = `ffmpeg -y -i ${inputFilename} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${outputFilename}`;
    console.debug(command);

    return execute(command, { cwd: workDir, }).then(function () {
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
        'Tagging with ',
        `'trackNumber:${tags.trackNumber}'`,
        `'artist:${tags.artist}'`,
        `'title:${tags.title}'`);

      nodeID3.write(tags, outputFilename);
      tags.url = path.basename(outputFilename);
      return tags;
    });
  }));
}).then(function (tags) {
  return fileWrite(path.resolve(workDir, 'manifest.json'), JSON.stringify(tags)).then(function () {
    return tags;
  });
});
