import React from 'react'

import Preview from '../preview/'

const Index = () => {
  return <Preview />
}

Index.acl = {
  action: 'read',
  subject: 'user-management'
}

export default Index
