import React from 'react'

import ForDialog from 'src/views/pages/escrow-management/FormDialog'

const EscrowManagement = () => {
  return <ForDialog />
}

EscrowManagement.acl = {
  action: 'read',
  subject: 'permission'
}
export default EscrowManagement
