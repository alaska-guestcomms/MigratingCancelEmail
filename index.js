const testFolders = ['./ResponsysRequests/', './ResponsysRequests/RefundRVWithMiles/'];
const fs = require('fs');

testFolders.forEach(folder => {
    fs.readdir(folder, (err, files) => {
        files.forEach(file => {
            const path = folder + file;
            if (!fs.lstatSync(path).isDirectory()) {
                var contents = fs.readFileSync(folder + file, 'utf8');
                console.log(contents);
            }
        });
    });
});
