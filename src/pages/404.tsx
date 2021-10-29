import ContentPage from '../components/ContentPage'
import { getPageProps } from '../lib/pageProps'
import {  PageProps } from '../interface/page'

const PageNotFound = (Props: PageProps) => (
  <ContentPage {...Props} />
)

export const getStaticProps = async ({ preview }) => getPageProps('404', preview);

export default PageNotFound
