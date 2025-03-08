import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface NavigationProps {
  session: Session | null;
}

const Navigation: React.FC<NavigationProps> = ({ session }) => {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-2 transition-colors hover:text-accent-400"
            >
              <Image
                className="rounded-full"
                src={session.user.image}
                height={32}
                width={32}
                referrerPolicy="no-referrer"
                alt={session.user.image}
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
