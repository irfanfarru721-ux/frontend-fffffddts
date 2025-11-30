import React, { useEffect, useState } from "react";
import { getVendorsByModule } from "../api/api";
import { Link, useParams } from "react-router-dom";

export default function VendorsPage(){
  const { moduleId } = useParams();
  const [vendors,setVendors] = useState([]);
  useEffect(()=> {
    if(!moduleId) return;
    getVendorsByModule(moduleId).then(r=> setVendors(r.data || []));
  },[moduleId]);
  return (
    <div className="container">
      <h2>Vendors</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {vendors.map(v=> <Link key={v._id} to={`/vendor/${v._id}/products`} className="card"><h3>{v.name}</h3><p>{v.address}</p></Link>)}
      </div>
    </div>
  );
}
