const fs = require('fs');
class Banner {
    static get SHOW(){
        const version = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        return Buffer.from('"CiBfXyAgICBfXyAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICBfIAovIC8gL1wgXCBcX18gXyAgX19ffCB8IF9fXyAgXyAgIF8gIF9ffCB8IF9fIF8gXyBfXyAoXykKXCBcLyAgXC8gLyBfYCB8LyBfX3wgfC8gXyBcfCB8IHwgfC8gX2AgfC8gX2AgfCAnXyBcfCB8CiBcICAvXCAgLyAoX3wgfCAoX198IHwgKF8pIHwgfF98IHwgKF98IHwgKF98IHwgfF8pIHwgfAogIFwvICBcLyBcX18sX3xcX19ffF98XF9fXy8gXF9fLF98XF9fLF98XF9fLF98IC5fXy98X3wKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfF98ICAgICAgCg=="', 'base64').toString('utf-8') + "\nv"+version.version+"\n";
            }
}

module.exports = Banner;