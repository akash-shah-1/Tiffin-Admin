# Tiffin Service - Backend API Specification (Rev 2: Subscription Model)

## 📐 Architecture
- **Type**: Modular Monolith
- **Framework**: NestJS + GraphQL
- **Database**: MongoDB (Mongoose)

## 🔄 Core Workflows

### 1. Kitchen Onboarding (Seller Driven)
- **Seller**: Registers account -> Creates Kitchen Profile (Name, FSSAI, Address).
- **System**: Sets Kitchen status to `PENDING_APPROVAL`.
- **Admin**: Views `Pending` kitchens -> Verifies Documents -> Mutates status to `ACTIVE`.

### 2. Plans & Offerings (Seller Managed)
- **Subscription Plan**:
  - `type`: Weekly (5/6 days), Monthly (20/24 days).
  - `mealType`: Lunch, Dinner, Both.
  - `price`: Fixed price for the period.
  - `description`: "Ghar waala khaana" etc.
- **Trial Meal**:
  - `date`: Specific date.
  - `price`: One-time cost.

### 3. Customer Subscription
- **User**: Selects Plan -> Pays (Payment Gateway Mock).
- **System**: Creates `Subscription` record.
  - `startDate`: User selected.
  - `endDate`: Auto-calculated based on plan duration.
  - `status`: ACTIVE.

### 4. Payouts (Admin Managed)
- **Ledger**: Every subscription purchase records a transaction.
  - `Credit`: Kitchen Share (Price - Commission).
  - `Debit`: Admin Commission.
- **Disbursement**: Admin views "Pending Payouts" -> Marks as "Processed" weekly.

---

## 🛠 GraphQL Schema Definition

### Entities

#### `Kitchen` (Updated)
```graphql
type Kitchen {
  id: ID!
  owner: User!
  status: KitchenStatus! # PENDING, ACTIVE, REJECTED
  plans: [Plan!]!
  # ... basic info (name, address, fssai)
}
```

#### `Plan` (New)
```graphql
type Plan {
  id: ID!
  kitchenId: ID!
  name: String!       # "Budget Lunch Pack"
  description: String
  price: Float!
  duration: PlanDuration! # WEEKLY (6 days), MONTHLY (26 days)
  mealType: MealType!     # LUNCH, DINNER, BOTH
  isTrial: Boolean!       # If true, duration is 1 day
}
```

#### `Subscription` (Replaces `Order`)
```graphql
type Subscription {
  id: ID!
  user: User!
  plan: Plan!
  startDate: Date!
  endDate: Date!
  status: SubStatus! # ACTIVE, EXPIRED, PAUSED
  pricePaid: Float!
  deliveryTimeSlot: String! # e.g. "12:30 PM - 1:00 PM"
}
```

#### `Payout` (New)
```graphql
type Payout {
  id: ID!
  kitchen: Kitchen!
  amount: Float!
  periodStart: Date!
  periodEnd: Date!
  status: PayoutStatus! # PENDING, PROCESSED
}
```

## 🔐 Role Based Access Control (RBAC)

| Action | Admin | Seller | Customer |
|:---|:---:|:---:|:---:|
| **Approve Kitchen** | ✅ | ❌ | ❌ |
| **Create Plan** | ❌ | ✅ | ❌ |
| **Buy Subscription** | ❌ | ❌ | ✅ |
| **Disburse Money** | ✅ | ❌ | ❌ |

---
