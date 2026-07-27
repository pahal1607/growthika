export type Role = 'admin' | 'client'
export type Profile = { id:string; email:string; full_name:string|null; role:Role; phone:string|null }
export type PackageRow = { id:string; name:string; price:number; total_reels:number; description:string|null; active:boolean }
export type ClientRow = { id:string; profile_id:string; company_name:string; phone:string|null; package_id:string|null; reels_used:number; start_date:string|null; renewal_date:string|null; drive_link:string|null; status:string; packages?:PackageRow|null; profiles?:Profile|null }
export type InfluencerRow = { id:string; name:string; instagram:string|null; city:string|null; niche:string|null; followers:number; engagement:number; rate:number; phone:string|null; email:string|null; portfolio_url:string|null; availability:string; notes:string|null }
export type DeliverableRow = { id:string; client_id:string; title:string; type:string; status:string; url:string|null; due_date:string|null; created_at:string }
export type InvoiceRow = { id:string; client_id:string; invoice_number:string; amount:number; status:string; due_date:string|null; url:string|null; created_at:string }
export type NotificationRow = { id:string; user_id:string; title:string; message:string; read:boolean; created_at:string }
