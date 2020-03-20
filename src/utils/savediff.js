import fs from 'fs';

const saveDiff = (diff, filePath) => {
  var data = JSON.stringify(diff);

  fs.writeFile(filePath, data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
};

export default saveDiff;