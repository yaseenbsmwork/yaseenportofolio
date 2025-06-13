import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50   transition-all duration-300 ">
      <div className="flex h-16 items-center justify-between w-full px-4">
        <span className="text-xl font-bold text-white">YASEEN BSM</span>
        <Button variant="outline" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
