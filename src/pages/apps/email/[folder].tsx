// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next/types'

// ** Types
import { MailLayoutType } from 'src/types/apps/emailTypes'

// ** Demo Components Imports
import Email from 'src/views/apps/email/Email'

const EmailApp = ({ folder }: MailLayoutType) => {
  return <Email folder={folder} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await axios.get('/apps/email/allEmails')
  // const data: MailType[] = await res.data.emails

  // const paths = data.map((mail: MailType) => ({
  //   params: { folder: mail.folder }
  // }))

  // Return an array of paths; use an empty array for now if you don't want to pre-render any folders
  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      folder: params?.folder
    }
  }
}

EmailApp.contentHeightFixed = true

export default EmailApp
