import Link from "next/link";
export default function NavBar(){
    return (
      <nav className="flex justify-between py-6 px-8 bg-orange-400 text-white mx-auto w-full rounded-lg">
      <Link href="/" className="font-bold text-2xl">ServicePulse Hub</Link>
      <div className="gap-6 flex">
        <Link href="/booking" className="hover:underline font-semibold">Booking An Appointment</Link>
        <Link href="/service" className="hover:underline font-semibold">Services</Link>
        <Link href="/support" className="hover:underline font-semibold">FAQs</Link>
        <Link href="/support" className="hover:underline font-semibold">Support</Link>
        <Link href="/login" className="hover:underline font-semibold">Login</Link>
        <Link href="/admin" className="hover:underline font-semibold">Admin Portals</Link>
      </div>
    </nav>
    )
}