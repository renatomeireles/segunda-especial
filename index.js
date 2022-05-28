#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, './segundaespecial');

const segundaespecial = function () {
    const linuxcmd = R.join('', ['paplay ', soundPath, '.ogg']);
    const windowscmd = `powershell -c (New-Object Media.SoundPlayer '${soundPath}.wav').PlaySync()`
    const maccmd = R.join('', ['afplay ', soundPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd) {
        return exect(cmd, function (error) {
            R.ifElse(
                R.empty,
                () => console.log('Segunda-feira especial!'),
                (error) => console.error(error),
                error)
        });
    }
}

module.exports = segundaespecial;

if (!module.parent) {
    segundaespecial();
}
