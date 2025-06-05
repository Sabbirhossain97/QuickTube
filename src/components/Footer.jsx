import { Heart, Github, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur mb-6 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current " />
            <span className="ml-2">by</span>
            <a
              href="https://github.com/Sabbirhossain97"
              target="_blank"
              className="hover:text-blue-500"
              rel="noopener noreferrer"
              aria-label="GitHub">
              Sabbir Hossain
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              asChild
            >
              <a
                href="https://github.com/Sabbirhossain97"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/sabbir-hossain-b73726214/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              asChild
            >
              <a
                href="https://www.facebook.com/sabbir.h.shawon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
