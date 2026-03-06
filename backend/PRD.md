# Product Requirements Document
## Collaborative Trip Planning Platform

**Version:** 1.0  
**Last Updated:** March 2026  
**Stack:** Node.js + Express + MongoDB (Mongoose) + Auth0 (OAuth)

---

## 1. Project Overview

A collaborative itinerary planning platform that allows users to create trips, plan day-wise itineraries, invite members, manage budgets, track reservations, and communicate through comments — all in one place.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | Auth0 (OAuth 2.0 / OpenID Connect) |
| File Storage | Cloudinary / AWS S3 (for attachments) |
| Hosting | Render / Railway / Vercel (backend) |

---

## 3. Authentication — OAuth via Auth0

### Flow
1. User clicks **Login / Sign Up** on the frontend
2. Redirected to **Auth0 Universal Login** page
3. User authenticates via Google, GitHub, or email/password
4. Auth0 redirects back with an **authorization code**
5. Backend exchanges the code for an **access token + ID token**
6. Backend checks if user exists in DB via `auth0Id`
   - If **new user** → create User document in MongoDB
   - If **existing user** → return existing user
7. Return JWT to frontend for subsequent API calls

### Auth0 Fields Used
```
auth0Id   → sub field from Auth0 token (e.g. "google-oauth2|1234567890")
name      → name field from Auth0 token
email     → email field from Auth0 token
avatar    → picture field from Auth0 token
```

### Middleware
Every protected route must pass through an `authenticate` middleware that:
- Verifies the JWT from the `Authorization: Bearer <token>` header
- Attaches `req.user` (the MongoDB User document) to the request

```
POST /api/auth/callback   → Exchange Auth0 code, create/find user, return token
GET  /api/auth/me         → Return current logged-in user profile
POST /api/auth/logout     → Invalidate session
```

---

## 4. Data Models (MongoDB)

### 4.1 User
```
_id, auth0Id (unique), name, email (unique), avatar, createdAt, updatedAt
```

### 4.2 Trip
```
_id, createdBy (ref: User), title, description, coverImage,
startDate, endDate (must be > startDate), createdAt, updatedAt
```

### 4.3 TripMember
```
_id, tripId (ref: Trip), userId (ref: User), email, name,
role (owner | editor | viewer), joinedAt
Unique index: { tripId, userId }
```

### 4.4 TripDay
```
_id, tripId (ref: Trip), date, order, createdAt, updatedAt
Compound index: { tripId, order }
```

### 4.5 Activity
```
_id, tripId (ref: Trip), dayId (ref: TripDay), title, description,
location, startTime, endTime (must be > startTime), order, status
(upcoming | ongoing | completed), notes, attachments[{ url, fileName }],
coordinates { lat, lng }, createdBy (ref: User), createdAt, updatedAt
Compound index: { tripId, dayId, order }
```

### 4.6 TripMember Roles
```
owner  → Full access. Can delete trip, manage members, edit everything
editor → Can create/edit/delete days, activities, checklists, expenses, reservations
viewer → Read-only. Can only add comments
```

### 4.7 Comment
```
_id, tripId (ref: Trip), dayId? (ref: TripDay), activityId? (ref: Activity),
userId (ref: User), content, createdAt, updatedAt
Rule: At least one of dayId or activityId must be present
```

### 4.8 Checklist
```
_id, tripId (ref: Trip), title, createdBy (ref: User), createdAt, updatedAt
```

### 4.9 ChecklistItem
```
_id, checklistId (ref: Checklist), text, isCompleted (default: false), createdAt, updatedAt
```

### 4.10 Expense
```
_id, tripId (ref: Trip), paidBy (ref: User), title, description,
amount (min: 0), date, category (enum: EXPENSE_TYPES), createdAt, updatedAt
Compound index: { tripId, date }
```

### 4.11 Reservation
```
_id, tripId (ref: Trip), type (Hotel | Flight | Train | Event),
title, date, notes, confirmationNumber, createdAt, updatedAt
Compound index: { tripId, date }
```

---

## 5. API Endpoints

### Auth
```
POST   /api/auth/callback       Exchange Auth0 token, upsert user
GET    /api/auth/me             Get current user profile
POST   /api/auth/logout         Logout
```

### Trips
```
POST   /api/trips               Create a trip (auto-adds creator as owner in TripMember)
GET    /api/trips               Get all trips for current user
GET    /api/trips/:tripId       Get single trip details
PUT    /api/trips/:tripId       Update trip (owner/editor only)
DELETE /api/trips/:tripId       Delete trip (owner only)
```

### Trip Members
```
POST   /api/trips/:tripId/members            Invite a member (owner only)
GET    /api/trips/:tripId/members            Get all members of a trip
PUT    /api/trips/:tripId/members/:userId    Update member role (owner only)
DELETE /api/trips/:tripId/members/:userId    Remove a member (owner only)
```

### Trip Days
```
POST   /api/trips/:tripId/days              Add a day to trip (editor/owner)
GET    /api/trips/:tripId/days              Get all days of a trip
PUT    /api/trips/:tripId/days/:dayId       Update day (editor/owner)
DELETE /api/trips/:tripId/days/:dayId       Delete day (editor/owner)
```

### Activities
```
POST   /api/trips/:tripId/days/:dayId/activities              Add activity
GET    /api/trips/:tripId/days/:dayId/activities              Get activities for a day
PUT    /api/trips/:tripId/days/:dayId/activities/:activityId  Update activity
DELETE /api/trips/:tripId/days/:dayId/activities/:activityId  Delete activity
PATCH  /api/trips/:tripId/days/:dayId/activities/reorder      Bulk reorder activities
```

### Comments
```
POST   /api/trips/:tripId/comments              Add comment (any member)
GET    /api/trips/:tripId/comments              Get all comments for a trip
GET    /api/trips/:tripId/days/:dayId/comments  Get comments for a day
GET    /api/activities/:activityId/comments     Get comments for an activity
DELETE /api/trips/:tripId/comments/:commentId   Delete comment (author or owner)
```

### Checklists
```
POST   /api/trips/:tripId/checklists                          Create checklist
GET    /api/trips/:tripId/checklists                          Get all checklists
DELETE /api/trips/:tripId/checklists/:checklistId             Delete checklist

POST   /api/checklists/:checklistId/items                     Add item
PUT    /api/checklists/:checklistId/items/:itemId             Update/toggle item
DELETE /api/checklists/:checklistId/items/:itemId             Delete item
```

### Expenses
```
POST   /api/trips/:tripId/expenses              Add expense
GET    /api/trips/:tripId/expenses              Get all expenses for trip
GET    /api/trips/:tripId/expenses/summary      Aggregated summary by category/user
PUT    /api/trips/:tripId/expenses/:expenseId   Update expense
DELETE /api/trips/:tripId/expenses/:expenseId   Delete expense
```

### Reservations
```
POST   /api/trips/:tripId/reservations                    Add reservation
GET    /api/trips/:tripId/reservations                    Get all reservations
PUT    /api/trips/:tripId/reservations/:reservationId     Update reservation
DELETE /api/trips/:tripId/reservations/:reservationId     Delete reservation
```

---

## 6. Authorization Rules

| Action | Owner | Editor | Viewer |
|---|---|---|---|
| View trip & all content | ✅ | ✅ | ✅ |
| Create/edit/delete days | ✅ | ✅ | ❌ |
| Create/edit/delete activities | ✅ | ✅ | ❌ |
| Reorder activities | ✅ | ✅ | ❌ |
| Add/edit/delete expenses | ✅ | ✅ | ❌ |
| Add/edit/delete reservations | ✅ | ✅ | ❌ |
| Add/edit/delete checklists | ✅ | ✅ | ❌ |
| Add comments | ✅ | ✅ | ✅ |
| Delete own comment | ✅ | ✅ | ✅ |
| Delete any comment | ✅ | ❌ | ❌ |
| Invite/remove members | ✅ | ❌ | ❌ |
| Change member roles | ✅ | ❌ | ❌ |
| Edit trip details | ✅ | ✅ | ❌ |
| Delete trip | ✅ | ❌ | ❌ |

---

## 7. Middleware Chain

```
Request
  └── authenticate (verify Auth0 JWT, attach req.user)
        └── isTripMember (verify user belongs to the trip)
              └── hasRole('owner' | 'editor') (for write operations)
                    └── Controller
```

---

## 8. Key Business Logic Notes

### Trip Creation
When a trip is created, automatically insert a `TripMember` document with `role: "owner"` for the creator. This should happen inside the trip controller, not manually.

### Activity Reordering
The `PATCH /reorder` endpoint receives an ordered array of activity IDs:
```json
{ "orderedIds": ["actId1", "actId2", "actId3"] }
```
Use `bulkWrite` to update all `order` fields in a single DB operation.

### Expense Summary
Use MongoDB aggregation pipeline on the Expense collection:
```
$match tripId → $group by category → $sum amount
$group by paidBy → $sum amount (to show who paid what)
```

### Comment Validation
Backend must enforce: a comment must have either `dayId` or `activityId` (or both). Reject with `400` if neither is provided.

### Auth0 Token Refresh
Access tokens expire. The frontend should handle token refresh silently using Auth0's `getAccessTokenSilently()` method before making API calls.

---

## 9. Error Response Format

All API errors should follow this consistent format:
```json
{
  "success": false,
  "message": "Human readable error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
```
UNAUTHORIZED       → Not logged in
FORBIDDEN          → Logged in but insufficient role
NOT_FOUND          → Resource doesn't exist
VALIDATION_ERROR   → Invalid request body
INTERNAL_ERROR     → Server error
```

---

## 10. Build Order (Recommended)

```
Phase 1 — Foundation
  ✅ Models (done)
  [ ] Auth0 setup + /auth/callback + authenticate middleware
  [ ] User controller

Phase 2 — Core Trip
  [ ] Trip CRUD controller
  [ ] TripMember controller + role middleware
  [ ] TripDay controller

Phase 3 — Itinerary
  [ ] Activity controller (including reorder endpoint)
  [ ] Comment controller

Phase 4 — Organization
  [ ] Checklist + ChecklistItem controller
  [ ] Reservation controller
  [ ] Expense controller (including summary aggregation)

Phase 5 — Polish
  [ ] File upload integration (Cloudinary/S3) for attachments
  [ ] Input validation (Zod / Joi)
  [ ] Rate limiting
  [ ] Error handling middleware
```

---

## 11. Environment Variables Needed

```env
PORT=5000
MONGO_URI=mongodb+srv://...
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
CLOUDINARY_URL=...         # if using Cloudinary for file uploads
```
