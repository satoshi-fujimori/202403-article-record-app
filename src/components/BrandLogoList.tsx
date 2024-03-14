import Image from "next/image";
import CSS3_logo from "../../public/CSS3_logo.svg";
import HTML5_Logo from "../../public/HTML5_Logo.svg";
import js from "../../public/js.svg";
import next_light from "../../public/next_light.svg";
import tslogo from "../../public/ts_logo.svg";
import reactlogo from "../../public/react-logo.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames";
import { logoString } from "@/app/type/type";
import { useState } from "react";

export const logos: { logo: StaticImport; name: logoString }[] = [
  { logo: CSS3_logo, name: "css" },
  { logo: HTML5_Logo, name: "html" },
  { logo: js, name: "javascript" },
  { logo: reactlogo, name: "react" },
  { logo: next_light, name: "next.js" },
  { logo: tslogo, name: "typescript" },
];
export default function BrandLogoList({
  selectedKeyword,
  handleSelectKeyword,
  setIsLoading,
  isLoading,
}: {
  selectedKeyword: string;
  handleSelectKeyword: (keyword: logoString) => void;
  setIsLoading: (boolean: boolean) => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-4 m-4 relative md:w-3/5 md:mx-auto">
      {logos.map((logo, i) => (
        <div
          key={i}
          className={classNames(
            "flex items-center",
            selectedKeyword !== logo.name && "opacity-20"
          )}
        >
          <button
            onClick={() => {
              setIsLoading(true);
              handleSelectKeyword(logo.name);
              setIsLoading(false);
            }}
          >
            <Image
              src={logo.logo}
              width={80}
              height={80}
              alt={`logo${i}`}
              className={classNames(
                "hover:ring-2 hover:ring-primary h-20",
                selectedKeyword === logo.name && "ring-2 ring-primary"
              )}
            />
          </button>
        </div>
      ))}
      <div
        className="flex items-center justify-center absolute inset-x-0 bottom-0 h-12"
        style={{ zIndex: -1 }}
      >
        <div className="h-full w-12"></div>
      </div>
    </div>
  );
}
