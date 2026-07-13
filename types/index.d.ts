// globals.d.ts
// Tambahkan deklarasi tipe global di sini jika diperlukan.

interface SidebarNavItem {
  title: string;
  href: string;
  icon: string; // Nama ikon dari lucide-react
}

interface DashboardConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

// Tambahkan definisi untuk MainNavItem jika belum ada
interface MainNavItem {
  title: string;
  href: string;
}
