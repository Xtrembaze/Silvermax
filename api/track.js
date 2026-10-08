const {read}=require('../lib/db');
// Returns ONE shipment for an exact tracking code. The full list is never exposed.
module.exports=(req,res)=>{
  const c=String(req.query.code||'').trim().toUpperCase(),d=read();
  const s=c&&d.ships.find(x=>x.code.toUpperCase()===c);
  res.setHeader('Cache-Control','no-store');
  if(!s)return res.status(404).json({error:'not found'});
  res.json({ship:{...s,pay:s.status==='Custom Clearance'?d.site.pay:''}});
};
