import Link from "next/link";
import { Button } from "@/components/ui/button";

const emoji = '😬';
const title = "the url doesn't exist";
const message = "better luck next time?";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">{emoji}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{message}</p>
                <Button asChild variant="ghost">
                    <Link href="/notes">go home</Link>
                </Button>
            </div>
        </div>
    );
}
