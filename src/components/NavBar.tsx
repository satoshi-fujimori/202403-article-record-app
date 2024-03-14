import { Bars3Icon } from "@heroicons/react/24/outline";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function NavBar() {
  const headerContents: {
    title: string;
    link: string;
  }[] = [
    { title: "HOME", link: "/" },
    {
      title: "RECORD",
      link: "/record",
    },
    {
      title: "TREND",
      link: "/chart",
    },
  ];
  return (
    <>
      <header className="sm:hidden flex justify-between m-2 font-lob">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button>
              <Bars3Icon className="w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="top-0 my-10 h-fit w-72 rounded-none">
            <div className="flex flex-col gap-6 p-2 items-center">
              {headerContents.map((content) => (
                <a href={content.link} className="decorate-none">
                  {content.title}
                </a>
              ))}
            </div>
          </DrawerContent>
        </Drawer>

        <h1 className="font-title text-xl">QIITA ARTICLE RECORDER</h1>
      </header>
      <header className="hidden sm:flex justify-between p-4 items-center bg-primary w-screen">
        <h1 className="font-title text-3xl">QIITA ARTICLE RECORDER</h1>
        <div className="flex gap-x-4 text-sm">
          {headerContents.map((content) => (
            <a href={content.link} className="decorate-none">
              {content.title}
            </a>
          ))}
        </div>
      </header>
    </>
  );
}

/*

    <div className="h-12 sm:h-24 bg-primary flex gap-x-4 justify-start items-center font-lob">
      <Bars3Icon className="h-6 sm:h-10 ml-2" />
      <p className="font-title text-xl sm:text-3xl">ARTICLE RECORDER</p>
    </div>
    */
