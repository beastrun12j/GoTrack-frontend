import Logo from "@/assets/logo-bw.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex md:flex-row flex-col-reverse items-center w-full justify-between">
        <div className="flex justify-center items-center md:mt-0 mt-3">
          <Image src={Logo} alt="logo" height={130} width={130} />
        </div>
        <div className="space-x-4 md:block md:w-auto flex justify-center items-center md:justify-end w-full">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">Privacy Policy</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/">Terms of Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
