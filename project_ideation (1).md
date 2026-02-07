# Project Ideation Document: The Anonymous Truth Protocol (Veritas)

**Project Name**: Anonymous Truth Protocol (Veritas)  
**Role**: System Engineer & Product Manager  
**Version**: 3.0 (Finalized "High-Stakes" Architecture)  
**Status**: Ready for Submission

---

## 1. Problem Understanding

The core challenge is to create a campus communication platform that allows for the anonymous sharing of sensitive information while preventing the chaos, misinformation, and "trolling" typical of unmoderated anonymous networks.

### Key Pain Points
*   **Centralized Bias**: In traditional models, a central admin controls truth, often censoring valid but controversial information.
*   **Sybil Attacks**: Malicious actors can create multiple accounts to artificially inflate the popularity of a false rumor.
*   **History Rewriting**: Trust scores of old "verified" facts can fluctuate mysteriously if user reputations change retroactively, confusing users and destabilizing truth.
*   **The "Mob Rule"**: Popular false rumors can dominate purely democratic systems if there is no mechanism to weigh expertise or truthfulness.

---

## 2. Assumptions Made

To design this system, we rely on the following behavioral and technical assumptions:

*   **Rational Actors**: Users value their reputation score because it determines their voting power; they will act to preserve it.
*   **Honest Minority**: Even if a majority of users are coordinated liars, a consistent honest minority can maintain truth consensus through reputation weighting.
*   **Technical Constraint**: The "truth" logic must be decentralized and algorithmic, but the infrastructure (storage/UI) must be centralized for performance.
*   **Identity Root**: The university email system is the sole anchor for verifying student status, though it must never be linked to the user's on-platform identity.
*   **High-Stakes Behavior**: Users will exercise extreme caution in voting if the penalty for being wrong is significantly higher (2x to 3x) than the reward for being right.

---

## 3. System Architecture Design

### 3.1 The "Democratic Platform" Concept

We propose a Hybrid Architecture that combines a Reddit-style centralized forum with a mathematically decentralized truth engine.

*   **User Experience**: Seamless, web-based thread browsing hosted on a central server.
*   **Truth Determination**: Controlled strictly by a transparent, open-source algorithm. The server executes the math but cannot manually alter Trust Scores.

### 3.2 Core Capabilities

1.  **Full Anonymity**: Content is attributed only to "Anonymous Member".
2.  **High-Stakes Reputation**: A punitive economy where the penalty for inaccuracy is significantly higher than the reward for accuracy, filtering out "noise" and "trolling".
3.  **Vote Weight Snapshots**: To solve "History Rewriting," a user's vote weight is locked at the moment of voting and does not change even if their future reputation fluctuates.
4.  **Tri-State Voting**: Users can vote Verify, Dispute, or Uncertain.

### 3.3 Hybrid Infrastructure

*   **Centralized Host**: Handles traffic, stores data, and serves the UI.
*   **Decentralized Logic**: The "Trust Score Engine" is an immutable logic layer. Calculations are logged in a public Audit Log for verification.

### 3.4 Identity & Sybil Resistance

*   **Blind Token Issuance**:
    1.  User enters `email@university.edu`.
    2.  System verifies OTP.
    3.  System issues a Cryptographic Token.
    4.  **Crucial Step**: The server records `Hash(Email) -> TokenIssued=True` but never stores the link between the Email and the Token ID (Blinded Issuance).
*   **One Person = One Vote**: Enforced by the hash registry.

### 3.5 Database Schema (Key Entities)

*   **Users**: `token_id`, `reputation_score` (Default 0.2), `created_at`.
*   **Rumors**: `rumor_id`, `trust_score` (0.00-1.00), `is_frozen` (Boolean), `final_classification`.
*   **Votes**: `rumor_id`, `voter_token`, `vote_weight_snapshot` (The weight at time of vote).
*   **Proofs**: `proof_id`, `content`, `maturity_status` (>10 votes).

---

## 4. Trust Score Mechanism (The "Brain")

Every rumor begins with a Trust Score of 0.00. It must earn credibility through the following algorithmic consensus mechanism.

### 4.1 The Master Formula

$$TrustScore = 0.50(V) + 0.30(P) + 0.20(M)$$

### 4.2 Component Definitions

#### A. Weighted Vote Score ($V$) - 50% Weight
This is the primary signal of community consensus.

*   **Input**: Users vote Verify (1.0), Uncertain (0.5), or Dispute (0.0).
*   **Weighting**: The vote is weighted by the voter's reputation at the snapshot moment.
    *   **Formula**: $Weight = \frac{\sqrt{Reputation}}{10}$
    *   **Note**: Square root prevents high-reputation users from overpowering the system ("Reputation Oligarchy").
*   **Calculation**: Weighted Average of all votes.

#### B. Mature Proofs Score ($P$) - 30% Weight
Users can submit "Proofs" (images/links/text) which serve as sub-threads with their own mini-trust scores.

*   **Maturity Rule**: A proof does not contribute to the main score until it receives >10 votes.
*   **Scoring**: Calculated as the weighted average of votes on that specific proof.

#### C. Momentum Score ($M$) - 20% Weight
This rewards organic consensus building and penalizes artificial "brigading".

*   **Method**: Analyzes voting patterns in 6-hour windows.
*   **Volatility Penalty**: If the verification ratio changes drastically (>0.4 delta) between windows, the score is penalized to prevent manipulation.

---

## 5. The High-Stakes Reputation Economy

To ensure high-quality data, the system employs a "High-Risk/High-Reward" reputation model.

### 5.1 Initialization

*   **Initial Trust Score**: 0.2.
    *   **Impact**: New users have almost zero influence ($Weight \approx 0.04$) until they prove themselves.

### 5.2 The Lifecycle

1.  **Active Phase (Day 0–60)**: Trust scores fluctuate based on incoming votes and proofs.
2.  **Frozen Phase (Day 60)**: The score is permanently frozen and the rumor is classified (e.g., "Verified True" or "Verified False").
3.  **Settlement Phase**: Reputation rewards/penalties are distributed based on the final classification.

### 5.3 Reward & Penalty Schedule

#### For Voters
*   **Correct Vote**: +0.2 Reputation
    *   (e.g., Voted Verify on a rumor that ended up Verified True).
*   **Incorrect Vote**: -0.4 Reputation
    *   (e.g., Voted Verify on a rumor that ended up Verified False).
    *   **Design Note**: The 2:1 penalty ratio forces users to vote "Uncertain" or abstain unless they are confident.

#### For Proof Posters
Submitting evidence is high-stakes.
*   **Helpful Proof**: +0.5 Reputation
    *   (Proof supported the final truth).
*   **Misleading Proof**: -1.5 Reputation
    *   (Proof contradicted the final truth).
    *   **Design Note**: A 3:1 penalty ratio strictly deters the fabrication of evidence.

#### Original Poster (Rumor Author)
*   **Multiplier**: 3x the voter adjustment.
*   **Payoff**:
    *   Posted Verified Truth: +0.6 Reputation (3 * 0.2).
    *   Posted Verified Falsehood: -1.2 Reputation (3 * -0.4).

---

## 6. Security & Integrity

*   **Audit Log**: A public, immutable JSON log of every score calculation ensures that the server is adhering to the formulas above.
*   **Vote Locking**: Prevents "retroactive" score changes by locking weights at the moment of the vote.
*   **Soft Deletion**: If a rumor is deleted, it remains in the database (hidden from UI) to preserve the integrity of any cross-references or reputation calculations.
