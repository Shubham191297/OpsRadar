import React from "react";
import { Button, Disclosure } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Incidents", href: "/incidents", current: false },
  { name: "Create", href: "/create-incident", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-sky-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navigation.map((item) => {
                  const activeTab = item.href === currentPath;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={activeTab ? "page" : undefined}
                      className={classNames(
                        activeTab
                          ? "bg-sky-900 text-white"
                          : "text-gray-300 hover:bg-sky-700 hover:text-white",
                        "rounded-md px-3 py-2 text-md font-medium",
                        "flex justify-center",
                      )}
                    >
                      <span className="mr-2 align-bottom">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
