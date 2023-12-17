import Sidebar, { SidebarItem } from '../../components/sidebar/Sidebar';
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react'
import { Clients, Dashboard, Orders } from '../../pages';
import { useState } from 'react';

export const Layout = () => {
    const [isActive, setIsActive] = useState("admin")

    return (
        <>
            <main className='flex'>
                <Sidebar>
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"admin"} text="Dashboard" icon={<LayoutDashboard />} alert size={20} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"client"} size={20} text="Clients" icon={<UserCircle />} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"order"} size={20} text="Orders" icon={<Package />} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"statitics"} size={20} text="Statistics" icon={<BarChart3 />} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"inventory"} size={20} text="Inventory" icon={<Boxes />} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"billings"} size={20} text="Billings" icon={<Receipt />} />
                    <hr className="my-3" />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"settings"} size={20} text="Settings" icon={<Settings />} />
                    <SidebarItem isActive={isActive} setIsActive={setIsActive} txt={"help"} size={20} text="Help" icon={<LifeBuoy />} />
                </Sidebar>
                <section>
                    {isActive === "admin" && <Dashboard />}
                    {isActive === "client" && <Clients />}
                    {isActive === "order" && <Orders />}
                </section>
            </main>
        </>
    )
}
