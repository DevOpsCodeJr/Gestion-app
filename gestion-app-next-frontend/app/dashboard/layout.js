import Sidebar, { SidebarItem } from "../lib/components/sidebar/Sidebar";
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react'

export default function Layout({ children }) {
    return (
        <main className="flex">
            <Sidebar>
                <SidebarItem link={"/dashboard"} text="Dashboard" icon={<LayoutDashboard />} alert size={20} />
                <SidebarItem link={"/dashboard/clients"} size={20} text="Clients" icon={<UserCircle />} />
                <SidebarItem link={"/dashboard/orders"} size={20} text="Orders" icon={<Package />} />
                <SidebarItem link={""} size={20} text="Statistics" icon={<BarChart3 />} />
                <SidebarItem link={""} size={20} text="Inventory" icon={<Boxes />} />
                <SidebarItem link={""} size={20} text="Billings" icon={<Receipt />} />
                <hr className="my-3" />
                <SidebarItem link={""} size={20} text="Settings" icon={<Settings />} />
                <SidebarItem link={""} size={20} text="Help" icon={<LifeBuoy />} />
            </Sidebar>
            {children}
        </main>
    );
}