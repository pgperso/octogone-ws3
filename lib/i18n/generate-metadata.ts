import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface GenerateMetadataProps {
  title?: string
  description?: string
  locale: string
  path?: string
}

export function generateMetadata({
  title,
  description,
  locale,
  path = '',
}: GenerateMetadataProps): Metadata {
  const siteUrl = `${siteConfig.url}/${locale}${path}`
  
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url: siteUrl,
      locale: locale,
      siteName: siteConfig.name,
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        'fr': `${siteConfig.url}/fr${path}`,
        'en': `${siteConfig.url}/en${path}`,
      },
    },
  }
}
