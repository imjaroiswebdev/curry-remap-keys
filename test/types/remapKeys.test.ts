import { remapKeys } from '../../src'
import type { CurriedRemapper, RemapMapping } from '../../src'

type Address = {
  billing_address: string
  city: string
  zip: string
}

type BillingInfo = {
  locationInfo: Address
}

type CustomerInfo = {
  interested_in: string[]
  isOneTimeBuyer: boolean
}

type User = {
  user_id: string
  order_id: string
  billingInfo: BillingInfo
  customerInfo: CustomerInfo
}

type RemappedUser = {
  userId: string
  order_id: string
  billingInfo: {
    locationInfo: {
      billingAddress: string
      city: string
      zip: string
    }
  }
  customerInfo: {
    interestedIn: string[]
    isOneTimeBuyer: boolean
  }
}

const user: User = {
  user_id: 'u-1',
  order_id: 'o-1',
  billingInfo: {
  locationInfo: {
    billing_address: '1 Main St',
    city: 'Anywhere',
    zip: '00000'
  }
  },
  customerInfo: {
    interested_in: ['notebooks'],
    isOneTimeBuyer: false
  }
}

const mapping: RemapMapping<User, RemappedUser> = {
  user_id: 'userId',
  billing_address: ['billingAddress', ['billingInfo', 'locationInfo']],
  interested_in: ['interestedIn', ['customerInfo']]
}

const remapUser: CurriedRemapper<User, RemappedUser> = remapKeys(mapping)
const result = remapUser(user)

// property access smoke checks
result.userId.toUpperCase()
result.customerInfo.interestedIn.length

// direct invocation typing
const directResult: RemappedUser = remapKeys(mapping, user)
directResult.userId.toUpperCase()

// @ts-expect-error - keys must belong to the source type
const invalidMapping: RemapMapping<User> = {
  missing: 'value'
}

void invalidMapping
void directResult
