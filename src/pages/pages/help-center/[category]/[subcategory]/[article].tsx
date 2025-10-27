// ** Next Import
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import HelpCenterArticle from 'src/views/pages/help-center/article'

const HelpCenterArticlePage = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return apiData ? (
    <HelpCenterArticle
      articles={apiData.articles}
      activeArticle={apiData.activeArticle}
      activeSubcategory={apiData.activeSubcategory}
    />
  ) : null
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await axios.get('/pages/help-center/article', {
  //   params: { category: 'getting-started' }
  // })
  // const apiData: {
  //   categories: HelpCenterCategoriesType[]
  //   articles: HelpCenterSubcategoryArticlesType[]
  //   activeArticle: HelpCenterSubcategoryArticlesType
  // } = await res.data

  // const paths: any = []
  // apiData.categories.forEach(category =>
  //   category.subCategories.forEach(subcategory =>
  //     subcategory.articles.forEach(article => {
  //       paths.push({
  //         params: { category: `${category.slug}`, subcategory: `${subcategory.slug}`, article: `${article.slug}` }
  //       })
  //     })
  //   )
  // )

  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async () => {
  // const res = await axios.get('/pages/help-center/article', {
  //   params: { article: params?.article, category: params?.category, subcategory: params?.subcategory }
  // })
  // const apiData = await res.data

  return {
    props: {}
  }
}

export default HelpCenterArticlePage
