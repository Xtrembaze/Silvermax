const {read}=require('../lib/db');
// Public site content only. Payment details are never sent here.
module.exports=(req,res)=>{const {pay,...site}=read().site;res.setHeader('Cache-Control','no-store');res.json(site)};
