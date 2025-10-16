import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Rediriger vers la page de login admin
  redirect('/admin/login');
}