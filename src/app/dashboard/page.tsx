
import { auth } from "@/src/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }
  
  return  <>
    Dashboard 
    <p>username : {session.user.name}</p>
    <p>user_email : { session.user.email}</p>
  </>
}