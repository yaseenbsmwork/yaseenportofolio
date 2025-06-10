import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Chat } from "lucide-react"

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">Yaseen BSM</span>
          </Link>
          <nav className="ml-6 flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            <Link to="/projects" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Projects
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/experience" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Experience
            </Link>
            <Link to="/skills" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Skills
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Chat className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Chat with me</h4>
                  <p className="text-sm text-muted-foreground">
                    Start a conversation with me
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full">Start Chat</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
