import { Input } from "@nextui-org/react";
import { NextLogo } from "./next-logo";
import { BeakerIcon, BuildingStorefrontIcon } from "@heroicons/react/16/solid";
import Cart from "./cart";

export default function Header() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800 px-6 py-2">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 hover:opacity-70">
          <NextLogo />
        </div>
        <div className="flex-1">
          <Input
            size="sm"
            radius="lg"
            startContent={<BeakerIcon className="h-6 w-6 text-blue-500" />}
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <Cart />
      </div>
    </div>
  );
}
