'use client'

import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const MenuOne: React.FC = () => {
    const { cartState } = useCart();
    return (
        <div className="header-menu style-one top-0 left-0 right-0 w-full md:h-[74px] h-[56px]">
            <div className="container mx-auto h-full">
                <div className="header-main flex justify-between h-full my-2">
                    <div className="left flex items-center gap-16">
                        <Link href={'/'} className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                            <Image src="/images/New-Images/Logo.png" alt="HydroBay" width={150} height={150} />
                            {/* <div className="heading4">HydroBay</div> */}
                        </Link>
                        <div className="menu-main h-full max-lg:hidden">
                            <ul className='flex items-center gap-8 h-full'>
                                <li className='h-full relative'>
                                    <Link href="/" className="text-button-uppercase duration-300 h-full flex items-center justify-center">Home</Link>
                                </li>
                                <li className='h-full relative'>
                                    <Link href="/product/default" className="text-button-uppercase duration-300 h-full flex items-center justify-center">Products</Link>
                                </li>
                                <li className='h-full relative'>
                                    <Link href="/pages/about" className="text-button-uppercase duration-300 h-full flex items-center justify-center">About</Link>
                                </li>
                                <li className='h-full relative'>
                                    <Link href="/pages/contact" className="text-button-uppercase duration-300 h-full flex items-center justify-center">Contact</Link>
                                </li>
                                <li className='h-full relative'>
                                    <Link href="/shop/default" className="text-button-uppercase duration-300 h-full flex items-center justify-center">Shop</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right flex gap-12">
                        <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                            <Icon.MagnifyingGlass size={24} color='black' />
                            <div className="line absolute bg-line w-px h-6 -right-6"></div>
                        </div>
                        <div className="list-action flex items-center gap-4">
                            <div className="user-icon flex items-center justify-center cursor-pointer">
                                <Icon.User size={24} color='black' />
                            </div>
                            <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer">
                                <Icon.Heart size={24} color='black' />
                            </div>
                            <div className="cart-icon flex items-center relative cursor-pointer">
                                <Icon.Handbag size={24} color='black' />
                                <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuOne