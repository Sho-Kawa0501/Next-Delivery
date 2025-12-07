import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({restaurant} : RestaurantCardProps) {
  return (
    <div className="relative">
      <Link href={`/restaurant/${restaurant.id}`} className="inset-0 absolute z-10"></Link>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src={restaurant.photoUrl}
          fill
          alt="レストラン画像"
          sizes="(max-width: 1280px) 25%, 280px"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">{restaurant.restaurantName}</p>
      </div>
    </div>
  );
}
