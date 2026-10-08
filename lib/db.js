const fs=require('fs'),path=require('path');
exports.read=()=>JSON.parse(fs.readFileSync(path.join(process.cwd(),'data','db.json'),'utf8'));
