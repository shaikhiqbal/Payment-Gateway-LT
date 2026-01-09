export type BankAccount = {
  id: number
  name: string
  accountNumber: string
  routingNumber: string
  accountType: string
}

export const bankAccounts: BankAccount[] = [
  {
    id: 1,
    name: 'NerkarNerkar',
    accountNumber: '6005223223',
    routingNumber: '45698731',
    accountType: 'Saving Account'
  },
  {
    id: 2,
    name: 'testtest',
    accountNumber: '654654654654',
    routingNumber: '323-132-132',
    accountType: 'Saving Account'
  },
  {
    id: 3,
    name: 'NerkarNerkar',
    accountNumber: '91106296647',
    routingNumber: '',
    accountType: 'Saving Account'
  }
]
export default bankAccounts
