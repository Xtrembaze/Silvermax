const crypto=require('crypto'),{read}=require('../lib/db');
const h=x=>crypto.createHash('sha256').update(String(x)).digest();
const same=(a,b)=>crypto.timingSafeEqual(h(a),h(b));
module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'POST only'});
  const b=req.body||{},pw=process.env.ADMIN_PASSWORD;
  if(!pw||!same(b.password,pw))return res.status(401).json({error:'Unauthorized'});
  if(b.action==='get')return res.json(read());
  if(b.action==='save'){
    const d=b.data;
    if(!d||!d.site||!Array.isArray(d.ships))return res.status(400).json({error:'Bad data'});
    const t=process.env.GITHUB_TOKEN,r=process.env.GITHUB_REPO;
    if(!t||!r)return res.json({committed:false});
    const br=process.env.GITHUB_BRANCH||'main',u=`https://api.github.com/repos/${r}/contents/data/db.json`;
    const hd={Authorization:`Bearer ${t}`,Accept:'application/vnd.github+json','User-Agent':'silvermax'};
    const g=await fetch(`${u}?ref=${br}`,{headers:hd});
    if(!g.ok)return res.status(502).json({error:'GitHub read failed'});
    const {sha}=await g.json();
    const p=await fetch(u,{method:'PUT',headers:hd,body:JSON.stringify({message:'Update from admin dashboard',content:Buffer.from(JSON.stringify(d,null,2)).toString('base64'),sha,branch:br})});
    if(!p.ok)return res.status(502).json({error:'GitHub write failed'});
    return res.json({committed:true});
  }
  res.status(400).json({error:'Bad action'});
};
