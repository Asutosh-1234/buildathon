/* user [icon: user]{
  _id ObjectId
  name String
  email String (unique, indexed)
  avatar String (optional)
  createdAt Date
  updatedAt Date
}

trip {
  _id ObjectId
  title String
  startDate Date
  endDate Date
  createdBy ObjectId (ref: User)
  createdAt Date
  updatedAt Date
}

TripMember {
  _id ObjectId
  tripId ObjectId (ref: Trip, indexed)
  members ObjectId (ref: UserId, role)
  role String (enum: "owner" | "editor" | "viewer")
  joinedAt Date
}


Activity {
  _id ObjectId
  tripId ObjectId (ref: Trip, indexed)
  dayId ObjectId (ref: TripDay, indexed)
  title String
  description String
  location String
  startTime Date
  endTime Date
  order Number
  createdBy ObjectId (ref: User)
  createdAt Date
  updatedAt Date
}

TripDay {
  _id (PK)
  tripId (FK)
  date date
  order number
}

Comment {
  _id (PK)
  tripId ObjectId (ref: Trip, indexed)
  dayId (FK)
  activityId (FK)
  userId (FK)
  content string
  createdAt date
}

Checklist {
  _id ObjectId
  tripId ObjectId (ref: Trip, indexed)
  title String
}

ChecklistItem {
  _id ObjectId
  checklistId ObjectId (ref: Checklist, indexed)
  text String
  isCompleted Boolean

  createdAt Date
}

Expense {
  _id ObjectId
  tripId ObjectId (ref: Trip, indexed)
  title String
  amount Number
  category String
  paidBy ObjectId (ref: User)
  createdAt Date
}

Reservation {
  _id ObjectId
  tripId ObjectId (ref: Trip, indexed)
  type String (Hotel | Flight | Train | Event)
  title String
  date Date
  notes String
  confirmationNumber String
  createdAt Date
}

user._id - trip.createdBy
user._id < TripMember.members
trip._id - TripMember.tripId

trip._id < TripDay.tripId
TripDay._id < Activity.dayId
trip._id < Activity.tripId
user._id < Activity.createdBy

trip._id < Checklist.tripId
Checklist._id < ChecklistItem.checklistId

trip._id < Comment.tripId
Activity._id < Comment.activityId
user._id < Comment.userId

trip._id < Expense.tripId
user._id < Expense.paidBy

trip._id < Reservation.tripId
 */