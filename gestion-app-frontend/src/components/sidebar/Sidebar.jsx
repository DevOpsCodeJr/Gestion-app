import { ChevronFirst, MoreVertical, ChevronLast } from "lucide-react";
import { useState, createContext, useContext, useEffect } from "react";
import MiAlarma from "../../assets/imagen mi alarma.png";
import { useAppContext } from "../../hooks/useAppContext";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState({});
  const { auth } = useAppContext();

  const myFunction = (name) => {
    let fullName = name;

    let separateName = fullName.split(" ");
    let firstName = separateName[0];
    let lastName = separateName.slice(1).join(" ");

    return {
      firstName,
      lastName,
    };
  };

  useEffect(() => {
    if (auth.id) {
      setData(myFunction(auth.name));
    }
  }, []);

  return (
    <aside className="h-full w-max rounded-md pr-2">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm rounded-3xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={MiAlarma}
            alt=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-14" : "w-0"
            } `}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-800"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 justify-center">
          <img
            src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=c7d2fe&color=3730a3&bold=true`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? " w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-500">{auth.name}</h4>
              <span className="text-xs text-gray-600">{auth.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  txt,
  isActive,
  setIsActive,
}) {
  const { expanded } = useContext(SidebarContext);

  const handleActive = (txt) => {
    setIsActive(txt);
  };

  return (
    <li>
      {txt === "logout" ? (
        <Link
          to="/dashboard/logout"
          className={`relative flex items-center py-3 px-3 my-1.5 font-medium rounded-md cursor-pointer transition-colors group ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? " w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {isActive === txt && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}

          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </Link>
      ) : (
        <div
          onClick={() => handleActive(txt)}
          className={`relative flex items-center py-3 px-3 my-1.5 font-medium rounded-md cursor-pointer transition-colors group ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }`}
        >
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? " w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {isActive === txt && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            />
          )}

          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
