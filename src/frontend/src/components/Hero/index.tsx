import TrainAnimation from "../Animation";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-4 md:py-4 gap-6">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-primary  to-primary/15 text-transparent bg-clip-text">
              CX
            </span>{" "}
            RAILWAY
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
    
            </span>{" "}
            Easy Transportation
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Experience the future of train travel with our state-of-the-art services designed for comfort and efficiency.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">
          <Link href="register">Get Started</Link>
          </Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/abrar-nazib/cortex-buet-hackathon"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
       <TrainAnimation/>
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};