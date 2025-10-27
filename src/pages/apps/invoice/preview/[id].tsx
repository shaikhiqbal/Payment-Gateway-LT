// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import Preview from 'src/views/apps/invoice/preview/Preview'

// ** Mock Data
// const now = new Date()
// const currentMonth = now.toLocaleString('default', { month: 'short' })

/*
const mockInvoices: InvoiceType[] = [
  {
    id: 4987,
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: 4988,
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    country: 'Haiti',
    contact: '(226) 204-8287',
    name: 'Stephanie Burns',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `15 ${currentMonth} ${now.getFullYear()}`
  },
  {
    id: 4989,
    issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    country: 'Denmark',
    contact: '(955) 676-1076',
    name: 'Tony Herrera',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `03 ${currentMonth} ${now.getFullYear()}`
  }
]
*/
const InvoicePreview = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Preview id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = mockInvoices.map((item: InvoiceType) => ({
  //   params: { id: `${item.id}` }
  // }))

  return {
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

export default InvoicePreview
