import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaHamburger } from "react-icons/fa";
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dropdown({ icon, links, position, func , size }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:text-gray-700">
                    {icon}
                </MenuButton>
            </div>

            <MenuItems
                transition
                className={`absolute ${position} z-10 mt-2 ${size}  rounded-md bg-slate-900  shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
            >
                <div className="py-1">
                    {links.map((link, index) => (

                        <MenuItem key={index}>
                            {({ focus }) => (
                                <Link
                                    to={link.path}
                                    className={classNames(focus ? ' text-white' : 'text-slate-400', 'block px-4 py-2 text-sm text-center')}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </MenuItem>

                    ))}

                    {func && (
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    className={classNames(
                                        focus ? ' text-white' : 'text-slate-400',
                                        'block w-full px-4 py-2  text-sm',
                                    )}
                                    onClick={func.function}
                                    disabled={func.isLoading}
                                >
                                    {func.name}
                                </button>
                            )}
                        </MenuItem>
                    )}
                </div>


            </MenuItems>
        </Menu>
    )
}


