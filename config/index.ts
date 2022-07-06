export const appUrl = 'https://johnkingzy.dev/'
export const userName = 'johnkingzy'
export const twitterUserName = '@johnkingzy'
export const siteName = 'johnkingzy.dev';

export const appConfig = {
  userName,
  seo: {
    default: {
      title: `${userName}  — %s`,
      openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: appUrl,
        site_name: siteName,
      },
      twitter: {
        handle: twitterUserName,
        site: twitterUserName,
        cardType: 'summary_large_image',
      },
      additionalMetaTags: [
        {
          name: 'theme-color',
          content: '#0063ff',
        },
        {
          name: 'mask-icon',
          content: 'safari-pinned-tab',
        },
      ],
      additionalLinkTags: [
        {
          rel: 'icon',
          href: '/static/images/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          rel: 'apple-touch-icon',
          href: '/static/images/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          rel: 'icon',
          href: '/static/images/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          rel: 'icon',
          href: '/static/images/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          rel: 'mask-icon',
          href: '/static/images/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
        {
          rel: 'manifest',
          href: '/static/site.webmanifest',
        },
      ],
    },
    contact: {
      title: 'Contact page',
      description: `Get in touch with ${userName}`,
      openGraph: {
        url: appUrl,
        title: 'Contact page',
        description: `Get in touch with ${userName}`,
        site_name: { siteName },
      },
      twitter: {
        handle: twitterUserName, //twitter:creator
        site: twitterUserName, //twitter:site
        cardType: 'summary_large_image', //twitter:card
      },
    },
  },
}
