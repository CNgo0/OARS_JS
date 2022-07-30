const app = {
        selectFile: function (handleFile) {
            console.log('selectFile')
            t = document.createElement('input') 
            t.addEventListener('change', handleFile, false)

            t.id = 'get-file'
            t.type = 'file'
            t.click(); // (e) => console.log('E: %o', e))
        },
        getFileText: async function(blob) {
            return await blob.text()
        },
        
        getFile: () => {
            return new Promise((resolve, rej) => {
                // The selectFile method prompts a user to select a file; it takes an onchange callback.
                app.selectFile(async function (e) {
                    const file = this.files[0]
                    console.log('File - Size: %o, Type: %o, Name: %o', file.size, file.type, file.name)
                    data.file = await file.text() // Store the file contents
                    resolve(data.file) // return the file contents to the promise.
                })               
            })
        },

        downloadFile: () => {
          return services.download('test.txt', {
            // file: null,
    
            project: "demo",
            format: "JSON",
            // Name of a file to retreive or save.  Leave blank for???
            type: "FILE",
            apiEnv: "DEVELOPMENT",
            dbEnv: "DEVELOPMENT",
            // filePath: ".",
            // Name of file you want to access.  
            // filename: "test.txt",
          }).then(response => {
            console.log('We got the response back: %o', response)
            return response.text()
          })
        }
    }
    
    