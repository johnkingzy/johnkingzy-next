import { NextSeo } from 'next-seo'
import Layout from '../../components/Layout'
import { sanity, urlFor } from '../../client'
import { PortableText } from '@portabletext/react'
import { Page } from '../../types'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps } from 'next'
import ProjectsGallery from '../../components/ProjectsGallery'
import PostsGallery from '../../components/PostsGallery'
import { appUrl, siteName, twitterUserName } from '../../config'

const CustomPage = ({ page }: { page: Page }) => {
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
          site: twitterUserName, //twitter:site
          cardType: 'summary_large_image', //twitter:card
        }}
      />
      <article>
        <PortableText value={page.body} />
        {page.slug.current === 'projects' && <ProjectsGallery />}
        {page.slug.current === 'writings' && <PostsGallery />}
      </article>
    </Layout>
  )
}

export default CustomPage

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "page" && title != "Contact"]{slug}`
  const pages = await sanity.fetch(query)
  const paths = pages.map((page: { slug: { current: string } }) => ({
    params: { slug: page.slug.current },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug?: string }

  const page = await sanity.fetch(
    groq`
    *[_type == "page" && slug.current == $slug][0]
  `,
    {
      slug,
    }
  )

  return {
    props: {
      page,
    },
    revalidate: 5,
  }
}
