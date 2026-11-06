import Link from "next/link";
import { DISCOVERY_GROUPS } from "@/lib/discovery";

export function DiscoveryLinks({ currentPath }: { currentPath?: string }) {
  return (
    <nav aria-label="Explorer la clear ice Ice4Riches" className="border-t border-[#f5f3ef]/15 bg-[#111315] px-6 py-12 text-[#f5f3ef]">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {DISCOVERY_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-lg font-medium">{group.title}</h2>
            <ul className="mt-5 space-y-3">
              {group.links.filter((link) => link.href !== currentPath).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm leading-6 text-[#f5f3ef]/75 underline-offset-4 hover:underline focus-visible:underline">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
