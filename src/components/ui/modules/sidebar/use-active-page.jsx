'use client';
import { navBarItems } from '@/components/ui/modules/sidebar/nav-bar-items';
import { ROUTES } from '@/lib/routes/client.route';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * @returns {{page: NavBarItems | null}}
 */
export function useActivePage() {
  const [page, setPage] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    const path = pathname.toLowerCase();
    const home = ROUTES.HOME.toLowerCase();
    const activePath = navBarItems.find((item) => {
      const href = item.href.toLowerCase();
      const isHome = href === home;
      return (isHome && path === home) || (!isHome && path.startsWith(href));
    });
    if (activePath) {
      setPage(activePath);
    }
  }, [page, pathname]);
  return { page };
}
