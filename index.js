const showdown = require('showdown')
const fs = require('fs')

function writeFileToHtml(path, fileName) {
    fs.readFile(`${path}/${fileName}.md`, 'utf8', function (err, markdownText) {
        if (err) {
            console.error(err)
            return
        }
    
        // Convert the MD to HTML
        const converter = new showdown.Converter();
        const htmlText = converter.makeHtml(markdownText);
    
        // Write the HTML to a new file
        fs.writeFile(`${__dirname}/html/${fileName}.html`, htmlText, function (err) {
            if (err) {
                console.error(err)
            } else {
                console.log('HTML file saved.')
            }
        })
    })
}

function convertFolderContents(path) {
    fs.readdir(path, (err, contents) => {
        if (err) {
            console.error(err)
            return
        }
    
        contents.forEach(file => {
            const fileExtension = file.slice(file.length - 2)
            // Only convert if this file is md
            if (fileExtension === 'md') {
                const fileNameWithoutExtension = file.slice(0, file.length - 3)
                writeFileToHtml(path, fileNameWithoutExtension)
            }
        })
  
    })
}

function convertSingleFile(path, fileName) {
    writeFileToHtml(path, fileName)
}

// Path pointing to where your .md files are contained
const path = `${__dirname}/../../Documents/Obsidian Vault/Solidity`

// Pass in both a path and the file name
convertSingleFile(path, 'Functions')

// Only pass in the path where many .md files will be contained
convertFolderContents(path)