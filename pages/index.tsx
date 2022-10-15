import { NextSeo } from 'next-seo'
import Layout from '../components/Layout'
import { sanity, urlFor } from '../client'
import { PortableText } from '@portabletext/react'
import { Page } from '../types'
import groq from 'groq'
import { GetStaticProps } from 'next'
import { appUrl, siteName, twitterUserName } from '../config'

const Home = ({ page }: { page: Page }) => {
  return (
    <Layout h1={page.heroTextOne} h2={page.heroTextTwo}>
      <NextSeo
        title={page.seoTitle}
        description={page.seoDescription}
        canonical={appUrl}
        openGraph={{
          url: appUrl,
          title: page.seoTitle,
          description: page.seoDescription,
          images: [
            {
              url: page.seoImage && urlFor(page.seoImage).width(1200).url(),
              width: 800,
              height: 600,
              alt: page.seoTitle,
              type: 'image/jpeg',
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          handle: twitterUserName, //twitter:creator
          site: siteName, //twitter:site
          cardType: 'summary_large_image', //twitter:card
        }}
      />
      <article className="animate-fade">
        <PortableText value={page.body} />
      </article>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const page = await sanity.fetch(
    groq`
  *[_type == "page" && slug.current == $slug][0]{
  title,
  body,
  heroTextOne,
  heroTextTwo,
  seoTitle,
  seoDescription,
  seoImage,
  seoKeywords,
}`,
    { slug: 'home' }
  )

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
    revalidate: 60,
  }
}
