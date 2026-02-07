# Veritas Implementation Plan

## 1. Executive Summary
This document outlines the step-by-step implementation plan for Veritas, the anonymous truth protocol. Based on the PRD and Ideation documents, the focus is on a high-stakes reputation economy, rigorous trust scoring, and complete anonymity.

## 2. Phase 1: Core Trust Engine & Rumor Management
**Goal**: Implement the mathematical backbone of the system (Trust Score = 0.5V + 0.3P + 0.2M).

### 2.1 Refined Trust Score Logic
- [ ] **Backend**: Update `calculate_trust_score` in `rumors/services.py`:
    - Implement `Weighted Vote Score (V)`: $\frac{\sqrt{Reputation}}{10}$
    - Implement `Mature Proofs Score (P)`: Only count proofs with >10 votes.
    - Implement `Momentum Score (M)`: Track voting velocity in 6h windows.
- [ ] **Backend**: Create `TrustScoreLog` model in `audit/models.py` for transparency.
- [ ] **Backend**: Implement async task (Celery/Django-Q) for score recalculation to avoid blocking API.

### 2.2 Proof System Implementation
- [ ] **Backend**: Update `Proof` model to support multiple types (Text/Link/Photo).
- [ ] **Backend**: Implement `ProofVote` logic with "Maturity" check (10 votes).
- [ ] **API**: Endpoints for `POST /proofs/`, `POST /proofs/{id}/vote/`.
- [ ] **Frontend**: Build `ProofSubmissionDialog` component.
- [ ] **Frontend**: Build `ProofList` component with voting buttons (Supports/Refutes).

## 3. Phase 2: High-Stakes Reputation Economy
**Goal**: Implement the rewards and penalties system to incentivize truth.

### 3.1 Reputation Models & Logic
- [ ] **Backend**: Add `reputation_score` field to `User` model (default 0.2).
- [ ] **Backend**: Create `ReputationEvent` model to log every score change (Reason, Amount, RelatedRumor).
- [ ] **Backend**: Implement `Rumor Freeze` logic (Day 60):
    - Lock trust score.
    - Classify rumor (Verified True/False/Uncertain).
    - Trigger "Settlement": Calculate and apply +/- reputation to all participants.

### 3.2 Cron Jobs / Scheduled Tasks
- [ ] **Backend**: Set up daily cron job to identify and freeze 60-day old rumors.
- [ ] **Backend**: Set up daily cron job to decay unused reputation (optional, if per PRD).

## 4. Phase 3: User Dashboard & Experience
**Goal**: Allow users to track their impact and manage their identity.

### 4.1 Dashboard
- [ ] **Frontend**: Create `/dashboard` page.
- [ ] **API**: Endpoint `GET /users/me/stats/`:
    - Current Reputation.
    - Voting Accuracy %.
    - History of Voted Rumors & posted Proofs.
- [ ] **Frontend**: Visualize Reputation History (Line Chart).

### 4.2 Application Features
- [ ] **Frontend**: Implement `Sort By` functionality (Trending, Trusted, Controversial).
- [ ] **Frontend**: Implement `Search` bar (Basic text search on rumors).
- [ ] **Frontend**: Add `Filters` (Date range, Classification).

## 5. Phase 4: Security & Device Verification
**Goal**: Prevent Sybil attacks and ensure account security.

### 5.1 Device Fingerprinting
- [ ] **Frontend**: Collect browser fingerprint (User Agent, Screen, Timezone) on login/signup.
- [ ] **Backend**: Store fingerprint hash in `UserDevice` model.
- [ ] **Backend**: Enforce logic: New fingerprint -> Require OTP. Known fingerprint -> Login directly.

### 5.2 Rate Limiting
- [ ] **Backend**: Implement strict rate limits for:
    - Rumor creation (5/hour).
    - Voting (limit per minute).
    - Proof submission (10/hour).

## 6. Phase 5: Polish & Deployment
- [ ] **UI**: Add "How it works" modal to explain Trust Score.
- [ ] **UI**: Add loading skeletons and error boundaries.
- [ ] **Backend**: Dockerize application for deployment.
- [ ] **Docs**: API Documentation (Swagger/Redoc).

## 7. Immediate Next Steps
1.  **Trust Engine**: Refine the scoring algorithm in `rumors/services.py`.
2.  **Proofs**: Building the proof submission and voting flow.
