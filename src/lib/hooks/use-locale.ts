import { useParams } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/settings";

export function useLocale() {
  const params = useParams();
  const locale = (params?.lang as string) || defaultLocale;
  return locale;
}
