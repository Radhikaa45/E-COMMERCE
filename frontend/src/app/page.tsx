"use client"

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Home(){

const [products,setProducts]=useState([])

useEffect(()=>{

api.get("/api/products")
.then((res)=>{

setProducts(res.data)

})

},[])

return(

<div>

<nav className="flex justify-between p-6 border-b">

<h1 className="text-2xl font-bold">

NEEKZ Special

</h1>

<div className="flex gap-6">

<p>Home</p>

<p>Shop</p>

<p>Cart</p>

</div>

</nav>

<section className="text-center py-20">

<h1 className="text-5xl font-bold">

Luxury Food Collection

</h1>

<p>

Premium products crafted for you

</p>

</section>

<div className="grid grid-cols-4 gap-6 p-10">

{products.map((product:any)=>(

<div
key={product.id}
className="border p-5 rounded-xl"
>

<img
src={product.image}
alt={product.name}
/>

<h2>

{product.name}

</h2>

<p>

₹{product.price}

</p>

</div>

))}

</div>

</div>

)

}