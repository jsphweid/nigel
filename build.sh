export DEBUG=electron-builder

electron-builder --x64 --publish=never

chmod +x ./release/mac/Nigel.app/Contents/MacOS/*