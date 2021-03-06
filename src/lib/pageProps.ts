import { PageTemplateProps } from '../interface/page'
import { PageResponseProps } from '../interface/pageResponse'
import { buildPageStructure } from './pageStructureBuilder'
import apiEndPoints from './strapiApi'
import { fetchApi } from './util'

const { getStaticPaths, getPages, getConfig, getPagesPreview } = apiEndPoints
const siteBaseUrl = process.env.SITE_BASE_URL

/**
 * Get data associated with page from markdown file
 * @param {string} page name of page
 */
export async function getPageData(page: string, preview: boolean): Promise<PageResponseProps| null> {
  try {
    if (preview) {
      const url = `${getPagesPreview}${page}`
      const res = await fetchApi(url)
      return res[0]
    }
    const url = `${getPages}/${page}`
    return await fetchApi(url)
  } catch (e) {
    return null
  }
}

/**
 * Get Data associated with the app
 */
export async function getConfigData() { 
  try {
    return await fetchApi(getConfig)
  } catch(e) {
    return { 
      status: 'error',
      message: 'Unable to load config file'
    };
  }
}

/**
 * Generates props for static props
 * @param {string} page The name of the page
 * @param {boolean} preview If in preview mode
 * @param {object} previewData the page data
 * @returns Page Props
 */
export async function getPageProps(formTitle: string, preview: boolean) {
  const config =  await getConfigData()

  let pageData:PageResponseProps = await getPageData(formTitle, preview)
  let data: PageTemplateProps = {} as PageTemplateProps

  // 404 doesn't appear in preview mode with out this
  if (formTitle === '404' && !pageData) {
    pageData = await getPageData(formTitle, true)
  }
 
  if (pageData) {
    data = await buildPageStructure(pageData)
    if (data.pageSEO) {
      data.pageSEO.canonical = siteBaseUrl + data.pageSEO.canonical
    }
  }


  return {
    props: {
      formTitle,
      preview: false,
      notFound: false,
      config,
      file: {
        data
      }
    },
  }
}

/**
 * Get full list of static paths
 * @returns {
      "params": { "slug": string[]}
    }[]
 */
export async function getPathsList(): Promise<{
  params: { slug: string[];}
}[]> {
  try {
    const result  = await fetchApi(getStaticPaths);
    const data: {
      params: { slug: string[]; }
    }[] = result
    return data.filter(v => v.params.slug[0] !== '404');
  } catch (e) {
    return []
  }
}