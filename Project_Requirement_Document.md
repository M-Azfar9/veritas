**Product Requirements Document (PRD)**

**Veritas: Anonymous Truth Protocol Platform**

**Document Version:** 1.0  
**Last Updated:** February 7, 2026  
**Document Owner:** System Architecture & Engineering Team  
**Status:** Ready for Development

**Table of Contents**

- [Executive Summary](#1-executive-summary)
- [Project Overview](#2-project-overview)
- [Business Objectives](#3-business-objectives)
- [Target Users](#4-target-users)
- [Functional Requirements](#5-functional-requirements)
- [Technical Requirements](#6-technical-requirements)
- [System Architecture](#7-system-architecture)
- [Data Models](#8-data-models)
- [User Interface Requirements](#9-user-interface-requirements)
- [Security & Privacy](#10-security--privacy)
- [Performance Requirements](#11-performance-requirements)
- [Success Metrics](#12-success-metrics)
- [Constraints & Assumptions](#13-constraints--assumptions)
- [Risks & Mitigations](#14-risks--mitigations)
- [Development Roadmap](#15-development-roadmap)
- [Appendices](#16-appendices)

**1\. Executive Summary**

**1.1 Project Vision**

Veritas is an anonymous campus communication platform that enables NUST university students to share and verify sensitive information through a community-driven truth consensus mechanism. Unlike traditional anonymous platforms that suffer from misinformation and trolling, Veritas employs a mathematically rigorous trust scoring system to surface accurate information while maintaining complete user anonymity.

**1.2 Core Value Proposition**

- **For Students**: A safe, anonymous channel to share and verify campus information without fear of retribution
- **For Truth Seekers**: A reliable, community-validated source of campus news and events
- **For the Community**: A self-regulating system where accuracy and honesty are incentivized through reputation mechanics

**1.3 Key Differentiators**

| **Feature** | **Traditional Anonymous Platforms** | **Veritas** |
| --- | --- | --- |
| **Truth Determination** | Admin-controlled or simple popularity | Algorithmic, transparent, community-driven |
| **Anonymity** | Often compromised | Complete, cryptographically protected |
| **Quality Control** | Reactive moderation | Proactive reputation system |
| **Accountability** | None | Reputation-based voting weight |
| **Transparency** | Opaque algorithms | Open-source, auditable calculations |

**1.4 Success Criteria**

- **Adoption**: 4,000-5,000 active users within 6 months
- **Content Quality**: >70% of frozen rumors classified as VERIFIED_TRUE or VERIFIED_FALSE (not UNCERTAIN)
- **User Trust**: Average user reputation score >55 (indicating overall accurate voting)
- **Engagement**: 50% of registered users voting weekly
- **System Integrity**: Zero successful Sybil attacks or reputation manipulation incidents

**2\. Project Overview**

**2.1 Problem Statement**

**Core Challenge**: University students need a platform to share sensitive campus information anonymously, but existing solutions fail in critical ways:

- **Yik Yak-style platforms**: Become toxic echo chambers with no truth verification
- **Reddit-style forums**: Administrators can manipulate or censor content
- **WhatsApp/Telegram groups**: No anonymity, prone to misinformation spread
- **Official channels**: Students fear retaliation when sharing controversial information

**Specific Pain Points**:

- **Centralized Bias**: Admins control what is "true," often censoring valid controversial information
- **Sybil Attacks**: Malicious actors create multiple accounts to inflate false rumors
- **History Rewriting**: Trust scores change mysteriously, confusing users
- **Mob Rule**: Popular false rumors dominate without expertise weighting
- **Zero Accountability**: Anonymous users face no consequences for spreading misinformation

**2.2 Proposed Solution**

A **hybrid architecture** combining:

- **Centralized Infrastructure**: Reddit-style web platform for seamless UX
- **Decentralized Truth Logic**: Mathematical algorithms determine credibility (admins cannot override)
- **High-Stakes Reputation Economy**: Penalties for inaccuracy >> rewards for accuracy
- **Cryptographic Anonymity**: Blind token issuance prevents identity linking
- **Transparent Auditability**: All calculations logged publicly

**2.3 Scope**

**In Scope (MVP)**

✅ User registration with university email verification  
✅ Anonymous rumor posting and voting  
✅ Tri-state voting (Verify/Uncertain/Dispute)  
✅ Trust score calculation with 3 components (Votes, Proofs, Momentum)  
✅ Proof submission system with mini-voting  
✅ Reputation system with rewards/penalties  
✅ 60-day rumor freeze and classification  
✅ Real-time trust score updates  
✅ Public audit log  
✅ Device fingerprinting for multi-device access  
✅ Feed with sorting options  
✅ User dashboard with reputation history

**Out of Scope (Future Releases)**

❌ Mobile native apps (iOS/Android)  
❌ Push notifications  
❌ Direct messaging between users  
❌ Comment threading (basic comments only)  
❌ Advanced analytics dashboard  
❌ Machine learning for bot detection  
❌ Photo/video authenticity verification (EXIF checking)  
❌ Multi-university support  
❌ Content recommendation engine

**2.4 Target Launch Date**

**MVP Launch**: 12 weeks from project kickoff  
**Beta Testing**: Weeks 10-12 (200 selected students)  
**Full Launch**: Week 13 (all NUST students)

**3\. Business Objectives**

**3.1 Primary Objectives**

- **Community Safety**: Provide a harassment-free, anonymous communication channel for 80%+ of NUST students
- **Information Accuracy**: Achieve >75% accuracy rate on frozen rumors (VERIFIED_TRUE/FALSE classifications)
- **User Engagement**: Sustain 50%+ weekly active user rate among registered users
- **Platform Integrity**: Maintain zero successful attacks on anonymity or reputation systems

**3.2 Secondary Objectives**

- **Reduce Misinformation**: Decrease spread of false campus rumors by 60% compared to WhatsApp groups
- **Build Trust**: Achieve 4+ star average user satisfaction rating
- **Demonstrate Model**: Create replicable model for other universities
- **Academic Contribution**: Publish research paper on decentralized truth consensus mechanisms

**3.3 Non-Goals**

- **Monetization**: Platform is non-commercial (at least for first 2 years)
- **Content Moderation**: System is self-regulating; no manual fact-checking
- **Government/Admin Oversight**: No special access for university administration
- **User Identification**: Never reverse anonymity for any reason

**4\. Target Users**

**4.1 User Personas**

**Persona 1: "The Whistleblower"**

- **Demographics**: Undergraduate, 20-22 years old, politically aware
- **Goals**: Share sensitive information about campus issues without retaliation
- **Pain Points**: Fear of identification, skepticism of administration
- **Usage Pattern**: Posts 1-2 rumors/month, rarely votes
- **Success Metric**: Can post controversial content safely

**Persona 2: "The Truth Seeker"**

- **Demographics**: Graduate student, 23-26 years old, research-oriented
- **Goals**: Stay informed with accurate campus information
- **Pain Points**: Tired of sifting through misinformation in group chats
- **Usage Pattern**: Visits daily, votes on 5-10 rumors/day, rarely posts
- **Success Metric**: Spends <5 minutes finding accurate information

**Persona 3: "The Engaged Citizen"**

- **Demographics**: Undergraduate, 19-21 years old, socially active
- **Goals**: Build reputation, contribute to community accuracy
- **Pain Points**: Frustrated by trolling in other platforms
- **Usage Pattern**: Daily activity, submits proofs, votes strategically
- **Success Metric**: Achieves "Expert" reputation tier (>75 score)

**Persona 4: "The Skeptic"**

- **Demographics**: Any student, privacy-conscious
- **Goals**: Verify information accuracy through crowd consensus
- **Pain Points**: Distrust of centralized platforms
- **Usage Pattern**: Reads feed weekly, occasionally votes "Uncertain"
- **Success Metric**: Trusts platform enough to engage

**4.2 User Segmentation**

| **Segment** | **% of Users** | **Engagement Level** | **Primary Value** |
| --- | --- | --- | --- |
| **Lurkers** | 40% | View only, no votes | Information access |
| **Casual Voters** | 35% | Vote occasionally | Community participation |
| **Active Contributors** | 20% | Vote + submit proofs | Building reputation |
| **Power Users** | 5%  | Post rumors + vote + proofs | Platform influence |

**4.3 User Acquisition Strategy**

**Phase 1 (Weeks 1-4)**: Invite-only beta with 200 trusted students from diverse departments  
**Phase 2 (Weeks 5-8)**: Open registration with referral system (existing users can invite 5 friends)  
**Phase 3 (Weeks 9+)**: Fully open to all \*.nust.edu.pk email addresses

**Marketing Channels**:

- Campus poster campaign (QR codes)
- Student council endorsement
- Class representative announcements
- Social media (Instagram, Facebook groups)
- Word-of-mouth incentives (early adopter badges)

**5\. Functional Requirements**

**5.1 User Authentication & Account Management**

**FR-1.1: Email Verification**

**Priority**: P0 (Critical)  
**User Story**: As a student, I want to register with my university email so that only NUST students can access the platform.

**Acceptance Criteria**:

- System accepts only emails ending with .nust.edu.pk
- User receives 6-digit OTP within 30 seconds
- OTP expires after 10 minutes
- User can request new OTP (max 3 per hour per email)
- System blocks temporary email services (disposable domains)
- Email→Token mapping is never stored (blind issuance)

**Technical Details**:

Input: <user@seecs.nust.edu.pk>

Process:

1\. Validate email format and domain

2\. Generate 6-digit OTP

3\. Store OTP with expiry timestamp

4\. Send email via SMTP

5\. Rate limit: 3 requests/hour/IP

Output: "OTP sent to your email" message

**FR-1.2: Random Username Generation**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want a randomly generated username so that my identity remains anonymous.

**Acceptance Criteria**:

- Username format: &lt;adjective&gt;\_&lt;noun&gt;\_&lt;4-digits&gt;
- Examples: silent_tiger_4729, brave_phoenix_1823
- User can click "🎲 Randomize" button unlimited times
- Hover tooltip shows "Randomize username"
- No offensive words in adjective/noun lists
- System ensures uniqueness before assignment

**Technical Details**:

python

\# Username generation algorithm

adjectives = \["silent", "brave", "clever", "swift", "bright", ...\] # 200+ words

nouns = \["tiger", "phoenix", "falcon", "mountain", "river", ...\] # 200+ words

def generate_username():

adjective = random.choice(adjectives)

noun = random.choice(nouns)

digits = random.randint(1000, 9999)

username = f"{adjective}\_{noun}\_{digits}"

\# Check uniqueness

while db.users.filter(username=username).exists():

digits = random.randint(1000, 9999)

username = f"{adjective}\_{noun}\_{digits}"

return username

**FR-1.3: Device Fingerprinting**

**Priority**: P1 (High)  
**User Story**: As a user, I want to access my account from multiple devices without compromising security.

**Acceptance Criteria**:

- First device is automatically verified
- Subsequent devices require OTP verification
- System captures browser fingerprint (user agent, screen res, timezone, fonts)
- Device limit: 5 devices per account
- User can see verified devices in dashboard
- User can revoke device access

**Technical Details**:

javascript

// Client-side fingerprint collection

const fingerprint = {

userAgent: navigator.userAgent,

screenResolution: \`\${screen.width}x\${screen.height}\`,

timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

language: navigator.language,

canvasFingerprint: generateCanvasFingerprint(), // WebGL rendering hash

fontListHash: hashInstalledFonts()

};

const deviceUUID = localStorage.getItem('device_uuid') || uuidv4();

localStorage.setItem('device_uuid', deviceUUID);

// Send to backend for verification

**FR-1.4: Login Flow**

**Priority**: P0 (Critical)  
**User Story**: As a registered user, I want to log in securely from any device.

**Acceptance Criteria**:

- Known device: username + password → instant login
- New device: username + password → OTP sent → verify → login
- OTP email does NOT reveal registered email address (maintains anonymity)
- Session expires after 7 days of inactivity
- "Remember this device" checkbox available

**5.2 Rumor Management**

**FR-2.1: Rumor Creation**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want to post anonymous rumors so that I can share sensitive campus information safely.

**Acceptance Criteria**:

- Text content: 10-500 characters
- Optional: attach 1 image OR 1 link (evidence)
- User attribution: "Posted by Anonymous Member"
- Initial trust score: 0.0
- Rate limit: 5 rumors per hour per user
- Profanity filter (warning, not block)
- Character counter shown in real-time

**Technical Details**:

typescript

interface RumorCreateRequest {

content: string; // 10-500 chars

evidence_type?: 'photo' | 'link'; // Optional

evidence_url?: string; // If evidence provided

}

interface RumorResponse {

rumor_id: string;

content: string;

posted_by: 'Anonymous Member'; // Always

trust_score: 0.0; // Always starts at 0

created_at: string;

vote_count: 0;

proof_count: 0;

}

\`\`\`

\#### FR-2.2: Rumor Feed

\*\*Priority\*\*: P0 (Critical)

\*\*User Story\*\*: As a user, I want to browse rumors so that I can stay informed about campus events.

\*\*Acceptance Criteria\*\*:

\- Default sort: "Latest" (newest first)

\- Sorting options:

\- Latest (created_at DESC)

\- Trending (high vote activity in last 24h)

\- Most Trusted (trust_score DESC, frozen only)

\- Controversial (vote split near 50/50)

\- Pagination: 30 rumors per page

\- Infinite scroll on mobile

\- Filter options:

\- Status: All / Active / Frozen

\- Classification: All / Verified True / Verified False / Uncertain

\- Each rumor card shows:

\- Content (truncated to 200 chars)

\- Trust score (visual meter)

\- Vote breakdown (X verify, Y uncertain, Z dispute)

\- Time posted ("2 hours ago")

\- Proof count badge

\*\*UI Wireframe\*\*:

\`\`\`

┌────────────────────────────────────────────────┐

│ \[Sort: Latest ▼\] \[Filter: All ▼\] │

├────────────────────────────────────────────────┤

│ ┌──────────────────────────────────────────┐ │

│ │ "Campus gym closing next week for..." │ │

│ │ Posted by Anonymous Member • 2h ago │ │

│ │ │ │

│ │ Trust: ████████░░ 82% LIKELY_TRUE │ │

│ │ 25 votes: 18 verify • 5 uncertain • 2 dispute │

│ │ 3 proofs submitted │ │

│ │ │ │

│ │ \[✓ Verify\] \[? Uncertain\] \[✗ Dispute\] │ │

│ └──────────────────────────────────────────┘ │

│ ┌──────────────────────────────────────────┐ │

│ │ "Professor canceled Friday's exam" │ │

│ │ ... │ │

│ └──────────────────────────────────────────┘ │

└────────────────────────────────────────────────┘

**FR-2.3: Rumor Detail View**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want to view full rumor details so that I can make informed voting decisions.

**Acceptance Criteria**:

- Full content (no truncation)
- Current trust score with breakdown:
  - Weighted Vote Score (V): 0.XX
  - Mature Proofs Score (P): 0.XX
  - Momentum Score (M): 0.XX
- Vote statistics:
  - Total votes
  - Verify/Uncertain/Dispute counts
  - Vote trend chart (if >50 votes)
- Proof list (sorted by trust score DESC)
- Comment section (basic, no threading)
- Action buttons:
  - Vote (if not voted yet)
  - Change Vote (if already voted, within 24h cooldown)
  - Submit Proof
  - Share (copy link)
  - Report (policy violations only)

**FR-2.4: Rumor Lifecycle Management**

**Priority**: P0 (Critical)  
**User Story**: As the system, I want to automatically freeze rumors after 60 days so that historical facts remain stable.

**Acceptance Criteria**:

- Day 0-60: Trust score recalculates on every vote/proof
- Day 60 (midnight UTC):
  - Trust score permanently frozen
  - Classification assigned based on final score:
    - 0.75-1.00: VERIFIED_TRUE
    - 0.60-0.75: LIKELY_TRUE
    - 0.40-0.60: UNCERTAIN
    - 0.25-0.40: LIKELY_FALSE
    - 0.00-0.25: VERIFIED_FALSE
  - Reputation settlement triggered for all participants
  - Rumor marked with "FROZEN" badge in UI
  - New votes still accepted but don't affect score
- Frozen rumors used for cross-reference consistency checks

**Technical Details**:

python

\# Scheduled task (runs daily at 00:00 UTC)

def freeze_mature_rumors():

cutoff_date = timezone.now() - timedelta(days=60)

mature_rumors = Rumor.objects.filter(

created_at_\_lte=cutoff_date,

is_frozen=False

)

for rumor in mature_rumors:

\# Calculate final trust score

final_score = calculate_trust_score_with_proofs(rumor.rumor_id)

\# Freeze

rumor.trust_score = final_score

rumor.is_frozen = True

rumor.frozen_at = timezone.now()

rumor.classification = classify_rumor(final_score)

rumor.save()

\# Trigger reputation settlement

settle_reputation_for_rumor(rumor.rumor_id)

**5.3 Voting System**

**FR-3.1: Tri-State Voting**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want to vote on rumors with three options so that I can express uncertainty.

**Acceptance Criteria**:

- Three vote options:
  - ✓ Verify (value: 1.0) - "This is true"
  - ? Uncertain (value: 0.5) - "Not sure / needs more info"
  - ✗ Dispute (value: 0.0) - "This is false"
- User can vote once per rumor
- User can change vote (max 3 changes, 24h cooldown between changes)
- Vote weight calculated at time of voting: sqrt(profile_trust_score) / 10
- Vote weight snapshot stored permanently (never recalculated)
- Vote submission triggers trust score recalculation (async)
- Visual feedback: button highlights after voting
- Vote count updates in real-time for all users viewing rumor

**Technical Details**:

typescript

interface VoteRequest {

rumor_id: string;

vote_type: 'VERIFY' | 'UNCERTAIN' | 'DISPUTE';

}

interface VoteResponse {

success: boolean;

vote_weight_snapshot: number; // Locked forever

voter_reputation_snapshot: number; // For reference

new_trust_score: number; // Rumor's updated score

}

// Backend calculation

def cast_vote(rumor_id, voter_id, vote_type):

voter = User.objects.get(pk=voter_id)

\# Calculate weight AT THIS MOMENT

vote_weight = math.sqrt(voter.profile_trust_score) / 10

\# Apply modifiers

if voter.is_probationary:

vote_weight \*= 0.5

if voter.flagged_as_suspicious:

vote_weight \*= 0.5

\# Create vote with SNAPSHOT

vote = Vote.objects.create(

rumor_id=rumor_id,

voter_id=voter_id,

vote_type=vote_type,

vote_value=VOTE_VALUES\[vote_type\], # 1.0, 0.5, or 0.0

weight_snapshot=vote_weight, # LOCKED FOREVER

voter_reputation_snapshot=voter.profile_trust_score

)

\# Trigger async recalculation

trigger_trust_score_update(rumor_id)

\`\`\`

\#### FR-3.2: Vote Weight Snapshot

\*\*Priority\*\*: P0 (Critical)

\*\*User Story\*\*: As the system, I want to lock vote weights at voting time so that trust scores don't mysteriously change later.

\*\*Acceptance Criteria\*\*:

\- When user votes, their current reputation score is captured

\- Vote weight is calculated and stored in \`vote.weight_snapshot\`

\- Even if user's reputation changes later, vote weight NEVER recalculates

\- Trust score calculations ALWAYS use historical snapshots

\- This solves the "verified facts mysteriously changing scores" bug

\*\*Why This Matters\*\*:

\`\`\`

Without snapshots (BAD):

\- Day 1: Alice (rep=81) votes Verify, weight=0.9

\- Day 30: Alice's other votes increase her rep to 100, weight becomes 1.0

\- Rumor's trust score changes even though no new information arrived

\- Users confused: "Why did the score change?"

With snapshots (GOOD):

\- Day 1: Alice votes, weight=0.9 LOCKED

\- Day 30: Alice's rep increases to 100

\- Rumor's trust score unchanged (uses weight=0.9 from snapshot)

\- Predictable, transparent behavior

**FR-3.3: Vote Change Restrictions**

**Priority**: P1 (High)  
**User Story**: As a user, I want to change my vote if new evidence emerges, but the system should prevent abuse.

**Acceptance Criteria**:

- Users can change vote max 3 times per rumor
- 24-hour cooldown between vote changes
- Vote changes allowed only on active rumors (not frozen)
- System logs reason for change (optional user input)
- If no new evidence was added since last vote, flag user for review
- Vote change triggers trust score recalculation

**5.4 Proof System**

**FR-4.1: Proof Submission**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want to submit evidence to support or dispute rumors so that the community can make informed decisions.

**Acceptance Criteria**:

- Proof types:
  - Text (10-300 characters)
  - Photo (max 5MB, JPG/PNG)
  - Video (max 20MB, MP4) - Future
  - Link (URL validation)
  - Document (PDF, max 2MB) - Future
- Proof attribution: "Posted by Anonymous Member"
- Initial proof trust score: 0.0
- Proof can be submitted anytime before rumor freeze (Day 60)
- Rate limit: 10 proofs per hour per user
- Each proof has its own voting system (SUPPORTS/UNCERTAIN/REFUTES)

**Technical Details**:

typescript

interface ProofSubmissionRequest {

rumor_id: string;

proof_type: 'text' | 'photo' | 'video' | 'link' | 'document';

content: string; // Text content or caption

file_url?: string; // If photo/video/document

}

interface ProofResponse {

proof_id: string;

rumor_id: string;

proof_type: string;

content: string;

file_url: string | null;

trust_score: 0.0; // Starts at 0

vote_count: 0;

is_mature: false; // Becomes true at 10 votes

created_at: string;

}

**FR-4.2: Proof Voting**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want to vote on proofs so that I can signal which evidence is reliable.

**Acceptance Criteria**:

- Three vote options:
  - 👍 Supports (1.0) - "This proof validates the rumor"
  - 🤷 Uncertain (0.5) - "Not sure if this proves anything"
  - 👎 Refutes (0.0) - "This proof contradicts the rumor"
- Voting mechanics identical to rumor voting (weight snapshots, etc.)
- Proof becomes "mature" at 10+ votes
- Only mature proofs contribute to rumor's trust score
- Immature proofs shown but labeled "Awaiting community review"

**FR-4.3: Proof Maturity System**

**Priority**: P0 (Critical)  
**User Story**: As the system, I want to require minimum votes before proofs affect trust scores so that low-quality evidence doesn't skew results.

**Acceptance Criteria**:

- Proof starts as "immature" (is_mature=False)
- After 10th vote, proof becomes "mature" (is_mature=True)
- Only mature proofs factor into rumor's Proofs Score (P)
- If rumor freezes (Day 60) and proof has <10 votes, it doesn't contribute to final classification
- Mature proofs display "✓ Verified by Community" badge

**Calculation**:

python

def calculate_mature_proofs_score(rumor_id):

mature_proofs = Proof.objects.filter(

rumor_id=rumor_id,

is_mature=True,

is_deleted=False

)

if not mature_proofs.exists():

return 0.5 # Neutral if no mature proofs

\# Weighted average of proof trust scores

total_weighted_sum = 0

total_weight = 0

for proof in mature_proofs:

weight = math.sqrt(proof.vote_count) # More votes = more confidence

total_weighted_sum += proof.trust_score \* weight

total_weight += weight

avg_score = total_weighted_sum / total_weight

\# Bonus for multiple independent proofs

proof_count_bonus = min(len(mature_proofs) \* 0.05, 0.2)

return min(avg_score + proof_count_bonus, 1.0)

**5.5 Trust Score Calculation**

**FR-5.1: Master Trust Score Formula**

**Priority**: P0 (Critical)  
**User Story**: As the system, I want to calculate trust scores algorithmically so that no admin can manipulate results.

**Acceptance Criteria**:

- Formula: TrustScore = 0.50 × V + 0.30 × P + 0.20 × M
- Where:
  - V = Weighted Vote Score (community consensus)
  - P = Mature Proofs Score (evidence quality)
  - M = Momentum Score (temporal voting patterns)
- All calculations logged to audit_log table with full breakdown
- Algorithm is open-source and published on GitHub
- Any changes require public review period (7 days minimum)
- Recalculation triggered by: new vote, new proof vote, proof maturity

**Technical Details**:

python

def calculate_trust_score_with_proofs(rumor_id):

"""

Master trust score calculation

Returns: Decimal value 0.00-1.00

"""

V = calculate_vote_score(rumor_id) # 50% weight

P = calculate_mature_proofs_score(rumor_id) # 30% weight

M = calculate_momentum_score(rumor_id) # 20% weight

trust_score = 0.50 \* V + 0.30 \* P + 0.20 \* M

\# Log calculation for transparency

AuditLog.objects.create(

event_type='TRUST_SCORE_CALCULATED',

rumor_id=rumor_id,

calculation_data={

'V': float(V),

'P': float(P),

'M': float(M),

'trust_score': float(trust_score),

'algorithm_version': '1.0.0',

'timestamp': timezone.now().isoformat()

}

)

return Decimal(str(trust_score)).quantize(Decimal('0.01'))

**FR-5.2: Weighted Vote Score (V)**

**Priority**: P0 (Critical)  
**Acceptance Criteria**:

- Calculated as weighted average of all votes
- Vote values: Verify=1.0, Uncertain=0.5, Dispute=0.0
- Weight formula: sqrt(voter_reputation) / 10
- Uses vote weight snapshots (never current reputation)
- If no votes exist, returns 0.5 (neutral)

python

def calculate_vote_score(rumor_id):

votes = Vote.objects.filter(rumor_id=rumor_id)

if not votes.exists():

return Decimal('0.5')

weighted_sum = sum(v.vote_value \* v.weight_snapshot for v in votes)

total_weight = sum(v.weight_snapshot for v in votes)

return Decimal(str(weighted_sum / total_weight)).quantize(Decimal('0.01'))

**FR-5.3: Momentum Score (M)**

**Priority**: P1 (High)  
**User Story**: As the system, I want to detect voting manipulation by analyzing temporal patterns.

**Acceptance Criteria**:

- Analyzes voting in 6-hour windows
- Rewards consistent trends (steady increase/decrease)
- Penalizes high volatility (>0.4 delta between windows)
- Looks at last 24 hours (4 windows)
- If <5 votes total, returns 0.5 (neutral)

**Algorithm**:

python

def calculate_momentum_score(rumor_id):

votes = Vote.objects.filter(rumor_id=rumor_id).order_by('voted_at')

if votes.count() < 5:

return Decimal('0.5')

\# Create 6-hour windows

windows = create_time_windows(votes, window_hours=6, num_windows=4)

if len(windows) < 2:

return Decimal('0.5')

\# Calculate verify ratios for each window

verify_ratios = \[

w\['verify_count'\] / w\['total_count'\]

for w in windows if w\['total_count'\] > 0

\]

\# Calculate max delta between consecutive windows

max_delta = max(

abs(verify_ratios\[i+1\] - verify_ratios\[i\])

for i in range(len(verify_ratios) - 1)

)

\# Apply volatility penalty

if max_delta > 0.4:

penalty = (max_delta - 0.4) \* 2

base_score = verify_ratios\[-1\] # Latest window

return Decimal(str(max(0.0, base_score - penalty))).quantize(Decimal('0.01'))

return Decimal(str(verify_ratios\[-1\])).quantize(Decimal('0.01'))

**5.6 Reputation System**

**FR-6.1: Initial Reputation**

**Priority**: P0 (Critical)  
**Acceptance Criteria**:

- All new users start with profile_trust_score = 50
- Vote weight for new user: sqrt(50) / 10 = 0.707
- Reputation range: \[0, 100\]
- If reputation drops to 0, user cannot vote (must rebuild through correct voting)

**FR-6.2: Probationary Period**

**Priority**: P1 (High)  
**User Story**: As the system, I want to limit new accounts' influence so that bot armies can't immediately attack the platform.

**Acceptance Criteria**:

- New accounts flagged is_probationary=True for 7 days
- Probationary accounts have 50% vote weight (weight \*= 0.5)
- Probationary accounts cannot:
  - Post rumors (can only vote)
  - Submit proofs
  - Vote more than 5 times per day
- After 7 days, probation automatically lifted

**FR-6.3: Reputation Settlement (Day 60)**

**Priority**: P0 (Critical)  
**User Story**: As a user, I want my reputation to increase when I vote accurately so that I gain more influence over time.

**Acceptance Criteria**:

- When rumor freezes (Day 60), all participants receive reputation adjustments
- Adjustment based on alignment between vote and final classification
- Formula: alignment_error = |vote_value - final_trust_score|
- Reward/penalty scale:
  - Error <0.10: +5 to +7 points
  - Error <0.20: +3 points
  - Error <0.30: +2 points
  - Error <0.40: +1 point
  - Error 0.40-0.60: 0 points (neutral)
  - Error 0.60-0.75: -2 points
  - Error >0.75: -4 to -6 points
- Bonus for VERIFIED_TRUE/FALSE classifications: ±2 additional points
- Original poster: 3× multiplier on adjustment
- Proof posters: +3 to +5 (helpful) or -3 to -5 (misleading)

**Technical Details**:

python

def settle_reputation_for_rumor(rumor_id):

rumor = Rumor.objects.get(pk=rumor_id)

final_score = rumor.frozen_trust_score

classification = rumor.classification

\# Process all voters

for vote in rumor.votes.all():

adjustment = calculate_voter_adjustment(vote, final_score, classification)

update_user_reputation(vote.voter_id, adjustment, rumor_id)

\# Process original poster (3× multiplier)

if rumor.author_id:

poster_adjustment = calculate_poster_adjustment(final_score, classification)

update_user_reputation(rumor.author_id, poster_adjustment, rumor_id)

\# Process proof posters

for proof in rumor.proofs.filter(is_mature=True):

proof_adjustment = calculate_proof_poster_adjustment(proof, classification)

update_user_reputation(proof.poster_id, proof_adjustment, rumor_id)

def calculate_voter_adjustment(vote, final_score, classification):

vote_values = {'VERIFY': 1.0, 'UNCERTAIN': 0.5, 'DISPUTE': 0.0}

vote_value = vote_values\[vote.vote_type\]

alignment_error = abs(vote_value - float(final_score))

\# Base adjustment

if alignment_error < 0.10:

adjustment = 5

elif alignment_error < 0.20:

adjustment = 3

elif alignment_error < 0.30:

adjustment = 2

elif alignment_error < 0.40:

adjustment = 1

elif alignment_error < 0.60:

adjustment = 0

elif alignment_error < 0.75:

adjustment = -2

else:

adjustment = -4

\# Bonus/penalty for clear classifications

if classification in \['VERIFIED_TRUE', 'VERIFIED_FALSE'\]:

if alignment_error < 0.25:

adjustment += 2

elif alignment_error > 0.75:

adjustment -= 2

return adjustment

\`\`\`

\---

\### 5.7 User Dashboard

\#### FR-7.1: Reputation Dashboard

\*\*Priority\*\*: P1 (High)

\*\*User Story\*\*: As a user, I want to see my reputation history so that I understand how my voting accuracy affects my influence.

\*\*Acceptance Criteria\*\*:

\- Display current reputation score (large, prominent)

\- Reputation tier badge:

\- 0-25: Novice (bronze)

\- 26-50: Contributor (silver)

\- 51-75: Expert (gold)

\- 76-100: Master (platinum)

\- Vote weight indicator: "Your vote counts as X.XX votes"

\- Reputation event log (last 50 events):

\- Event type (Correct Vote, Incorrect Vote, Helpful Proof, etc.)

\- Delta (+5, -3, etc.)

\- Rumor reference

\- Timestamp

\- Accuracy statistics:

\- Total votes cast

\- Frozen rumors voted on

\- Accuracy rate (% correct)

\- Average alignment error

\*\*UI Wireframe\*\*:

\`\`\`

┌────────────────────────────────────────────────┐

│ Your Reputation: 78 / 100 \[Expert 🏆\] │

│ Vote Weight: 0.88 │

├────────────────────────────────────────────────┤

│ Statistics │

│ • Total Votes: 127 │

│ • Frozen Rumors Voted: 34 │

│ • Accuracy Rate: 76.5% │

│ • Avg Alignment Error: 0.18 │

├────────────────────────────────────────────────┤

│ Recent Reputation Changes │

│ ┌──────────────────────────────────────────┐ │

│ │ +7 Correct Vote on "Gym closing..." │ │

│ │ VERIFIED_TRUE • 2 days ago │ │

│ ├──────────────────────────────────────────┤ │

│ │ -4 Incorrect Vote on "Exam canceled" │ │

│ │ VERIFIED_FALSE • 5 days ago │ │

│ ├──────────────────────────────────────────┤ │

│ │ +5 Helpful Proof on "Library hours" │ │

│ │ VERIFIED_TRUE • 1 week ago │ │

│ └──────────────────────────────────────────┘ │

└────────────────────────────────────────────────┘

**FR-7.2: Voting History**

**Priority**: P2 (Medium)  
**Acceptance Criteria**:

- List of all rumors user has voted on
- For each: rumor content, vote type, outcome (if frozen), adjustment received
- Filter by: Active / Frozen / All
- Sort by: Recent / Highest Adjustment / Lowest Adjustment

**FR-7.3: Verified Devices**

**Priority**: P2 (Medium)  
**Acceptance Criteria**:

- List of all verified devices
- For each: device fingerprint hash (last 8 chars), last used, browser/OS
- "Revoke Access" button for each device
- Current device highlighted

**5.8 Audit & Transparency**

**FR-8.1: Public Audit Log**

**Priority**: P1 (High)  
**User Story**: As a skeptical user, I want to verify that the system is calculating trust scores correctly.

**Acceptance Criteria**:

- Public page: /audit
- Paginated log of all trust score calculations
- Each entry shows:
  - Rumor ID (clickable)
  - Timestamp
  - Algorithm version
  - Component breakdown (V, P, M values)
  - Final trust score
  - Vote count snapshot
- Filter by: Rumor ID, Date Range
- Export as JSON (for independent verification)

**Technical Details**:

sql

\-- audit_log table structure

CREATE TABLE audit_log (

log_id UUID PRIMARY KEY,

event_type VARCHAR(50), -- 'TRUST_SCORE_CALCULATED', 'RUMOR_FROZEN', etc.

rumor_id UUID,

user_id UUID, -- NULL for system events

calculation_data JSONB, -- Full breakdown

timestamp TIMESTAMP DEFAULT NOW()

);

\-- Example calculation_data

{

"algorithm_version": "1.0.0",

"components": {

"V": 0.843,

"P": 1.000,

"M": 0.750

},

"trust_score": 0.886,

"vote_count": 25,

"proof_count": 3,

"rumor_age_days": 5

}

**FR-8.2: Independent Verification**

**Priority**: P2 (Medium)  
**User Story**: As a technically savvy user, I want to download data and verify calculations myself.

**Acceptance Criteria**:

- Download button on each audit log entry
- Downloads JSON file with:
  - All votes (vote_id, vote_type, weight_snapshot)
  - All proofs (proof_id, trust_score, is_mature)
  - Algorithm implementation (link to GitHub)
- User can run open-source verification script to confirm calculation

**6\. Technical Requirements**

**6.1 Technology Stack**

**Frontend Stack**

yaml

Framework: Next.js 16.0

Language: TypeScript 5.3

Styling: Tailwind CSS 3.4

UI Components: Radix UI + Shadcn

State Management:

\- Server State: React Query (TanStack Query)

\- Client State: Zustand

Icons: Lucide React

Forms: React Hook Form + Zod validation

Date Handling: date-fns

Deployment: Vercel (free tier)

**Backend Stack**

yaml

Framework: Django 5.0

API: Django REST Framework 3.14

Language: Python 3.11

Authentication: Django JWT (djangorestframework-simplejwt)

Task Queue: Upstash QStash (HTTP-based)

Deployment: Render.com (free tier)

**Database & Infrastructure**

yaml

Database: Supabase (PostgreSQL 15)

\- Storage: 500MB

\- Real-time: Enabled

Cache/Sessions: Upstash Redis

\- Commands: 10k/day

File Storage: Supabase Storage

\- Quota: 1GB

Email: SendGrid (free tier: 100 emails/day)

\`\`\`

\### 6.2 API Specifications

\#### Base URL

\`\`\`

Production: <https://api-veritas.onrender.com/api/v1>

Development: <http://localhost:8000/api/v1>

\`\`\`

\#### Authentication

\`\`\`

Type: JWT (JSON Web Tokens)

Header: Authorization: Bearer &lt;token&gt;

Token Expiry: 7 days

Refresh Token: 30 days

**Response Format**

json

// Success

{

"success": true,

"data": { ... },

"timestamp": "2026-02-07T10:30:00Z"

}

// Error

{

"success": false,

"error": {

"code": "VALIDATION_ERROR",

"message": "Email must end with .nust.edu.pk",

"details": { "field": "email" }

},

"timestamp": "2026-02-07T10:30:00Z"

}

\`\`\`

\#### Key Endpoints

\*\*Authentication\*\*

\`\`\`

POST /auth/verify-email/

Request: { "email": "<user@seecs.nust.edu.pk>" }

Response: { "success": true, "message": "OTP sent" }

POST /auth/verify-otp/

Request: { "email": "...", "otp": "123456" }

Response: { "success": true, "session_token": "..." }

GET /auth/generate-username/

Response: { "username": "silent_tiger_4729" }

POST /auth/register/

Request: {

"session_token": "...",

"username": "silent_tiger_4729",

"password": "SecurePass123!"

}

Response: { "access_token": "...", "refresh_token": "..." }

POST /auth/login/

Request: { "username": "...", "password": "..." }

Response: { "access_token": "...", "refresh_token": "...", "device_verified": true }

\`\`\`

\*\*Rumors\*\*

\`\`\`

GET /rumors/feed/?page=1&sort=latest&filter=all

Response: {

"results": \[ ... \],

"count": 245,

"next": "/rumors/feed/?page=2",

"previous": null

}

POST /rumors/

Request: {

"content": "Campus gym closing next week for renovations",

"evidence_type": "link",

"evidence_url": "<https://nust.edu.pk/announcements/>..."

}

Response: { "rumor_id": "...", "trust_score": 0.0, ... }

POST /rumors/{id}/vote/

Request: { "vote_type": "VERIFY" }

Response: { "vote_weight_snapshot": 0.707, "new_trust_score": 0.82 }

**6.3 Database Schema**

See Section 8 (Data Models) for complete schema.

**6.4 Real-Time Architecture**

**Supabase Real-Time Subscriptions**

javascript

// Frontend: Subscribe to rumor updates

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const subscription = supabase

.channel(\`rumor:\${rumorId}\`)

.on('postgres_changes', {

event: 'UPDATE',

schema: 'public',

table: 'rumors',

filter: \`rumor_id=eq.\${rumorId}\`

}, (payload) => {

// Update UI with new trust_score

setTrustScore(payload.new.trust_score)

})

.subscribe()

**Backend: Automatic Broadcasting**

python

\# After trust score recalculation

rumor.trust_score = new_score

rumor.save() # Supabase automatically broadcasts UPDATE event via real-time

**6.5 Task Queue (Upstash QStash)**

**HTTP-Based Task Triggers**

python

\# Backend endpoint for async tasks

@require_POST

def recalculate_trust_score_task(request):

\# Verify QStash signature

signature = request.headers.get('Upstash-Signature')

if not verify_qstash_signature(request.body, signature):

return JsonResponse({'error': 'Unauthorized'}, status=401)

data = json.loads(request.body)

rumor_id = data\['rumor_id'\]

\# Perform calculation

new_score = calculate_trust_score_with_proofs(rumor_id)

\# Update database (triggers Supabase real-time broadcast)

rumor = Rumor.objects.get(pk=rumor_id)

rumor.trust_score = new_score

rumor.save()

return JsonResponse({'status': 'success'})

**Triggering Tasks**

python

\# After vote is cast

import requests

requests.post(

'<https://qstash.upstash.io/v2/publish/https://api-veritas.onrender.com/api/tasks/recalculate-trust/>',

headers={'Authorization': f'Bearer {QSTASH_TOKEN}'},

json={'rumor_id': str(rumor_id)}

)

**Scheduled Tasks (Cron)**

yaml

\# QStash cron jobs

\- name: freeze_mature_rumors

schedule: "0 0 \* \* \*" # Daily at midnight UTC

url: <https://api-veritas.onrender.com/api/tasks/freeze-rumors/>

\- name: cleanup_expired_otps

schedule: "0 \*/6 \* \* \*" # Every 6 hours

url: <https://api-veritas.onrender.com/api/tasks/cleanup-otps/>

\`\`\`

\### 6.6 Performance Requirements

| Metric | Target | Measurement |

|--------|--------|-------------|

| **\*\*API** Response Time**\*\*** | <500ms (p95) | New Relic APM |

| **\*\*Page** Load Time**\*\*** | <2s (p95) | Lighthouse CI |

| **\*\*Trust** Score Recalculation**\*\*** | <3s (async) | Custom logging |

| **\*\*Real-time** Update Latency**\*\*** | <1s | Supabase monitoring |

| **\*\*Database** Query Time**\*\*** | <100ms (p95) | Supabase dashboard |

| **\*\*Concurrent** Users**\*\*** | 500+ | Load testing (k6) |

| **\*\*Uptime\*\*** | 99.5%+ | UptimeRobot |

\### 6.7 Scalability Requirements

**\*\*Current** Scale (MVP)**\*\***

\- 4,000-5,000 users

\- ~10,000 rumors

\- ~50,000 votes

\- ~5,000 proofs

**\*\*Database** Sizing**\*\***

\`\`\`

Users: 5,000 × 0.5KB = 2.5MB

Rumors: 10,000 × 1KB = 10MB

Votes: 50,000 × 0.3KB = 15MB

Proofs: 5,000 × 0.5KB = 2.5MB

Audit Logs: 50,000 × 0.5KB = 25MB

Total: ~55MB (well within 500MB Supabase limit)

**Future Scale (Year 1)**

- 20,000 users
- ~50,000 rumors
- ~250,000 votes
- ~25,000 proofs
- **Estimated DB size**: ~300MB (still within free tier)

**6.8 Security Requirements**

**Authentication Security**

- Passwords hashed with bcrypt (cost factor 12)
- JWT tokens signed with RS256 (not HS256)
- Device fingerprints stored as SHA-256 hashes
- Email hashes stored with salt

**Input Validation**

- All user inputs sanitized (prevent XSS)
- SQL injection prevention (parameterized queries via Django ORM)
- Rate limiting on all endpoints
- CAPTCHA on registration

**Data Privacy**

- Email→Token mapping NEVER stored in database
- User posts attributed only to "Anonymous Member"
- No IP address logging (except for rate limiting, 24h retention)
- No analytics tracking (privacy-first)

**CORS Configuration**

python

CORS_ALLOWED_ORIGINS = \[

'<https://veritas.nust.edu.pk>',

'<http://localhost:3000>' # Dev only

\]

CORS_ALLOW_CREDENTIALS = True

\`\`\`

\---

\## 7. System Architecture

\### 7.1 High-Level Architecture

\`\`\`

┌─────────────────────────────────────────────────────────┐

│ CLIENT LAYER │

│ (Next.js on Vercel) │

├─────────────────────────────────────────────────────────┤

│ - React components │

│ - Supabase JS client (real-time subscriptions) │

│ - API integration (fetch/axios) │

│ - Device fingerprinting (client-side) │

└─────────────────────────────────────────────────────────┘

↓ HTTPS

┌─────────────────────────────────────────────────────────┐

│ API LAYER │

│ (Django REST on Render.com) │

├─────────────────────────────────────────────────────────┤

│ - Authentication (JWT) │

│ - Business logic (trust score calculation) │

│ - Database ORM (Django models) │

│ - Task queue triggers (QStash HTTP) │

└─────────────────────────────────────────────────────────┘

↓

┌────────────────┴────────────────┐

↓ ↓

┌─────────────────┐ ┌─────────────────┐

│ DATABASE │ │ CACHE/QUEUE │

│ (Supabase) │ │ (Upstash) │

├─────────────────┤ ├─────────────────┤

│ - PostgreSQL 15 │ │ - Redis cache │

│ - Real-time pub │ │ - QStash queue │

│ - File storage │ │ - Session store │

└─────────────────┘ └─────────────────┘

\`\`\`

\### 7.2 Component Interaction Flow

\*\*Vote Submission Flow\*\*

\`\`\`

1\. User clicks "Verify" button

└─> Frontend: RumorCard.tsx

2\. Frontend sends POST /rumors/{id}/vote/

└─> Backend: views/vote_create()

3\. Backend calculates vote weight

└─> weight = sqrt(user.reputation) / 10

4\. Backend stores vote with snapshot

└─> Vote.objects.create(weight_snapshot=weight)

5\. Backend triggers async task

└─> QStash HTTP call to /tasks/recalculate-trust/

6\. Task calculates new trust score

└─> V = calculate_vote_score()

└─> P = calculate_proof_score()

└─> M = calculate_momentum_score()

└─> trust_score = 0.5\*V + 0.3\*P + 0.2\*M

7\. Task updates database

└─> rumor.trust_score = new_score

└─> rumor.save()

8\. Supabase broadcasts UPDATE event

└─> All subscribed clients receive update

9\. Frontend receives real-time update

└─> useEffect hook updates trust score in UI

\`\`\`

\### 7.3 Data Flow Diagram

\`\`\`

┌──────────┐ ┌──────────┐ ┌──────────┐

│ User A │ │ User B │ │ User C │

└────┬─────┘ └────┬─────┘ └────┬─────┘

│ POST vote │ │

├───────────────>│ │

│ ▼ │

│ ┌─────────────┐ │

│ │ Backend │ │

│ │ (Django) │ │

│ └──────┬──────┘ │

│ │ │

│ ▼ │

│ ┌─────────────┐ │

│ │ Database │ │

│ │ (Supabase) │ │

│ └──────┬──────┘ │

│ │ UPDATE rumor │

│ ▼ │

│ ┌─────────────┐ │

│ │ Real-time │ │

│ │ Broadcast │ │

│ └──────┬──────┘ │

│ │ │

│ ┌───────────┼───────────┐ │

▼ ▼ ▼ ▼ ▼

┌──────────┐ ┌──────────┐ ┌──────────┐

│ User A │ │ User B │ │ User C │

│ receives │ │ receives │ │ receives │

│ update │ │ update │ │ update │

└──────────┘ └──────────┘ └──────────┘

\`\`\`

\### 7.4 Security Architecture

\*\*Defense in Depth\*\*

\`\`\`

Layer 1: Network (Vercel/Render firewalls)

↓

Layer 2: Application (Rate limiting, CORS)

↓

Layer 3: Authentication (JWT, device fingerprinting)

↓

Layer 4: Authorization (User permissions, probation checks)

↓

Layer 5: Data (Input validation, parameterized queries)

↓

Layer 6: Monitoring (Audit logs, anomaly detection)

\`\`\`

\---

\## 8. Data Models

\### 8.1 Entity Relationship Diagram

\`\`\`

┌──────────────┐ ┌──────────────┐

│ users │ │ rumors │

├──────────────┤ ├──────────────┤

│ user_id (PK) │──────────<│ author_id │

│ email_hash │ 1:N │ rumor_id (PK)│

│ username │ │ content │

│ reputation │ │ trust_score │

└──────┬───────┘ └──────┬───────┘

│ │

│ 1:N │ 1:N

│ │

▼ ▼

┌──────────────┐ ┌──────────────┐

│ votes │ │ proofs │

├──────────────┤ ├──────────────┤

│ vote_id (PK) │ │ proof_id (PK)│

│ rumor_id (FK)│<──────────┤ rumor_id (FK)│

│ voter_id (FK)│ │ poster_id │

│ weight_snap │ │ trust_score │

└──────────────┘ └──────┬───────┘

│

│ 1:N

▼

┌──────────────┐

│ proof_votes │

├──────────────┤

│ proof_id (FK)│

│ voter_id (FK)│

│ weight_snap │

└──────────────┘

**8.2 Complete Schema**

sql

\-- USERS TABLE

CREATE TABLE users (

user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

email_hash VARCHAR(64) UNIQUE NOT NULL,

username VARCHAR(50) UNIQUE NOT NULL,

password_hash VARCHAR(255) NOT NULL,

profile_trust_score DECIMAL(5,2) DEFAULT 50.00

CHECK (profile_trust_score >= 0 AND profile_trust_score <= 100),

is_probationary BOOLEAN DEFAULT TRUE,

probation_ends_at TIMESTAMP DEFAULT NOW() + INTERVAL '7 days',

flagged_as_suspicious BOOLEAN DEFAULT FALSE,

created_at TIMESTAMP DEFAULT NOW(),

last_active TIMESTAMP DEFAULT NOW()

);

\-- USER DEVICES TABLE

CREATE TABLE user_devices (

device_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

device_uuid UUID NOT NULL,

fingerprint_hash VARCHAR(64),

is_verified BOOLEAN DEFAULT FALSE,

last_used TIMESTAMP DEFAULT NOW(),

created_at TIMESTAMP DEFAULT NOW(),

UNIQUE(user_id, device_uuid)

);

\-- EMAIL VERIFICATION TABLE

CREATE TABLE email_verifications (

verification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

email VARCHAR(255) NOT NULL,

otp VARCHAR(6) NOT NULL,

created_at TIMESTAMP DEFAULT NOW(),

expires_at TIMESTAMP NOT NULL,

is_used BOOLEAN DEFAULT FALSE

);

\-- RUMORS TABLE

CREATE TABLE rumors (

rumor_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

author_id UUID REFERENCES users(user_id) ON DELETE SET NULL,

content TEXT NOT NULL CHECK (char_length(content) >= 10 AND char_length(content) <= 500),

\-- Trust scoring

trust_score DECIMAL(4,2) DEFAULT 0.00

CHECK (trust_score >= 0 AND trust_score <= 1),

vote_score DECIMAL(4,2) DEFAULT 0.00,

proof_score DECIMAL(4,2) DEFAULT 0.00,

momentum_score DECIMAL(4,2) DEFAULT 0.00,

\-- Lifecycle

is_frozen BOOLEAN DEFAULT FALSE,

frozen_at TIMESTAMP,

classification VARCHAR(20)

CHECK (classification IN ('VERIFIED_TRUE', 'LIKELY_TRUE', 'UNCERTAIN', 'LIKELY_FALSE', 'VERIFIED_FALSE')),

\-- Metadata

is_deleted BOOLEAN DEFAULT FALSE,

deleted_at TIMESTAMP,

created_at TIMESTAMP DEFAULT NOW(),

\-- Evidence (optional, attached by author)

evidence_type VARCHAR(20) CHECK (evidence_type IN ('photo', 'link', 'document')),

evidence_url TEXT

);

\-- VOTES TABLE

CREATE TABLE votes (

vote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

rumor_id UUID REFERENCES rumors(rumor_id) ON DELETE CASCADE,

voter_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

\-- Vote data

vote_type VARCHAR(10) CHECK (vote_type IN ('VERIFY', 'UNCERTAIN', 'DISPUTE')),

vote_value DECIMAL(2,1) CHECK (vote_value IN (0.0, 0.5, 1.0)),

\-- Snapshot (locked forever)

weight_snapshot DECIMAL(6,4) NOT NULL,

voter_reputation_snapshot DECIMAL(5,2) NOT NULL,

\-- Metadata

voted_at TIMESTAMP DEFAULT NOW(),

last_updated_at TIMESTAMP DEFAULT NOW(),

change_count INT DEFAULT 0 CHECK (change_count <= 3),

UNIQUE(rumor_id, voter_id)

);

\-- PROOFS TABLE

CREATE TABLE proofs (

proof_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

rumor_id UUID REFERENCES rumors(rumor_id) ON DELETE CASCADE,

poster_id UUID REFERENCES users(user_id) ON DELETE SET NULL,

\-- Proof content

proof_type VARCHAR(20) CHECK (proof_type IN ('text', 'photo', 'video', 'link', 'document')),

content TEXT,

file_url TEXT,

\-- Trust scoring

trust_score DECIMAL(4,2) DEFAULT 0.00,

vote_count INT DEFAULT 0,

is_mature BOOLEAN DEFAULT FALSE,

\-- Classification

is_classified BOOLEAN DEFAULT FALSE,

final_classification VARCHAR(20),

\-- Metadata

is_deleted BOOLEAN DEFAULT FALSE,

created_at TIMESTAMP DEFAULT NOW()

);

\-- PROOF VOTES TABLE

CREATE TABLE proof_votes (

proof_vote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

proof_id UUID REFERENCES proofs(proof_id) ON DELETE CASCADE,

voter_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

\-- Vote data

vote_type VARCHAR(10) CHECK (vote_type IN ('SUPPORTS', 'UNCERTAIN', 'REFUTES')),

vote_value DECIMAL(2,1) CHECK (vote_value IN (0.0, 0.5, 1.0)),

\-- Snapshot

weight_snapshot DECIMAL(6,4) NOT NULL,

\-- Metadata

voted_at TIMESTAMP DEFAULT NOW(),

UNIQUE(proof_id, voter_id)

);

\-- REPUTATION EVENTS TABLE

CREATE TABLE reputation_events (

event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,

event_type VARCHAR(30) CHECK (event_type IN (

'CORRECT_VOTE', 'INCORRECT_VOTE',

'HELPFUL_PROOF', 'MISLEADING_PROOF',

'AUTHOR_BONUS', 'AUTHOR_PENALTY'

)),

delta DECIMAL(5,2) NOT NULL,

rumor_id UUID REFERENCES rumors(rumor_id) ON DELETE SET NULL,

proof_id UUID REFERENCES proofs(proof_id) ON DELETE SET NULL,

created_at TIMESTAMP DEFAULT NOW()

);

\-- AUDIT LOG TABLE

CREATE TABLE audit_log (

log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

event_type VARCHAR(50) NOT NULL,

rumor_id UUID,

user_id UUID,

calculation_data JSONB,

timestamp TIMESTAMP DEFAULT NOW()

);

\-- INDEXES

CREATE INDEX idx_votes_rumor ON votes(rumor_id);

CREATE INDEX idx_votes_voter ON votes(voter_id);

CREATE INDEX idx_proofs_rumor ON proofs(rumor_id);

CREATE INDEX idx_proof_votes_proof ON proof_votes(proof_id);

CREATE INDEX idx_rumors_created ON rumors(created_at DESC);

CREATE INDEX idx_rumors_trust ON rumors(trust_score DESC);

CREATE INDEX idx_rumors_frozen ON rumors(is_frozen, created_at);

CREATE INDEX idx_reputation_events_user ON reputation_events(user_id, created_at DESC);

CREATE INDEX idx_audit_log_rumor ON audit_log(rumor_id, timestamp DESC);

**9\. User Interface Requirements**

**9.1 Design Principles**

- **Anonymity First**: Never expose user identities
- **Transparency**: Show how trust scores are calculated
- **Minimal Friction**: Fast voting, clear actions
- **Mobile-First**: Optimized for phone usage (70% of traffic)
- **Accessible**: WCAG 2.1 AA compliance

**9.2 Design System**

**Color Palette** (Monochromatic + Accent)

css

/\* Grayscale \*/

\--color-bg-primary: #FFFFFF;

\--color-bg-secondary: #F5F5F5;

\--color-text-primary: #171717;

\--color-text-secondary: #737373;

\--color-border: #E5E5E5;

/\* Trust Score Colors \*/

\--color-verified-true: #10B981; /\* Green \*/

\--color-likely-true: #84CC16; /\* Light green \*/

\--color-uncertain: #F59E0B; /\* Yellow \*/

\--color-likely-false: #F97316; /\* Orange \*/

\--color-verified-false: #EF4444; /\* Red \*/

/\* UI Accents \*/

\--color-primary: #3B82F6; /\* Blue \*/

\--color-danger: #DC2626;

**Typography**

css

/\* Font Stack \*/

font-family: 'Geist', 'Inter', system-ui, sans-serif;

/\* Scale \*/

\--font-xs: 12px;

\--font-sm: 14px;

\--font-base: 16px;

\--font-lg: 18px;

\--font-xl: 20px;

\--font-2xl: 24px;

\--font-3xl: 30px;

/\* Weights \*/

\--weight-normal: 400;

\--weight-medium: 500;

\--weight-semibold: 600;

\--weight-bold: 700;

**Spacing**

css

\--spacing-xs: 4px;

\--spacing-sm: 8px;

\--spacing-md: 16px;

\--spacing-lg: 24px;

\--spacing-xl: 32px;

\--spacing-2xl: 48px;

**9.3 Key UI Components**

**Trust Meter Component**

tsx

interface TrustMeterProps {

score: number; // 0.00-1.00

size: 'sm' | 'md' | 'lg';

showLabel: boolean;

}

// Visual representation:

// ████████░░ 82% LIKELY_TRUE

**Vote Buttons Component**

tsx

interface VoteButtonsProps {

rumorId: string;

currentVote?: 'VERIFY' | 'UNCERTAIN' | 'DISPUTE';

onVote: (type: VoteType) => void;

disabled: boolean;

}

// Layout:

// \[✓ Verify\] \[? Uncertain\] \[✗ Dispute\]

**Rumor Card Component**

tsx

interface RumorCardProps {

rumor: {

rumor_id: string;

content: string;

trust_score: number;

classification?: Classification;

vote_count: number;

proof_count: number;

created_at: string;

};

compact: boolean; // For feed vs. detail view

}

\`\`\`

\### 9.4 Page Layouts

\#### Feed Page (\`/feed\`)

\`\`\`

┌─────────────────────────────────────────────┐

│ \[Logo\] Veritas \[Profile\] │

├─────────────────────────────────────────────┤

│ \[Sort: Latest ▼\] \[Filter: All ▼\] \[Search\] │

├─────────────────────────────────────────────┤

│ │

│ ┌─────────────────────────────────────┐ │

│ │ Rumor Card #1 │ │

│ │ Trust: ████████░░ 82% │ │

│ │ \[✓\] \[?\] \[✗\] │ │

│ └─────────────────────────────────────┘ │

│ │

│ ┌─────────────────────────────────────┐ │

│ │ Rumor Card #2 │ │

│ │ ... │ │

│ └─────────────────────────────────────┘ │

│ │

│ \[Load More\] │

└─────────────────────────────────────────────┘

\`\`\`

\#### Rumor Detail Page (\`/rumor/\[id\]\`)

\`\`\`

┌─────────────────────────────────────────────┐

│ \[← Back to Feed\] │

├─────────────────────────────────────────────┤

│ "Campus gym closing next week for..." │

│ Posted by Anonymous Member • 5 days ago │

│ │

│ ┌─────────────────────────────────────────┐ │

│ │ Trust Score: 82% LIKELY_TRUE │ │

│ │ ████████░░ │ │

│ │ │ │

│ │ Breakdown: │ │

│ │ • Weighted Votes (50%): 0.84 │ │

│ │ • Mature Proofs (30%): 1.00 │ │

│ │ • Momentum (20%): 0.75 │ │

│ └─────────────────────────────────────────┘ │

│ │

│ ┌─────────────────────────────────────────┐ │

│ │ Votes: 25 total │ │

│ │ 18 verify • 5 uncertain • 2 dispute │ │

│ └─────────────────────────────────────────┘ │

│ │

│ \[✓ Verify\] \[? Uncertain\] \[✗ Dispute\] │

│ │

│ ─────────────────────────────────────────── │

│ Proofs (3) │

│ ┌─────────────────────────────────────────┐ │

│ │ 📷 Photo • Trust: 85% • 12 votes │ │

│ │ \[👍 Supports\] \[🤷 Uncertain\] \[👎 Refutes\]│ │

│ └─────────────────────────────────────────┘ │

│ │

│ \[+ Submit Proof\] │

└─────────────────────────────────────────────┘

\`\`\`

\#### Dashboard Page (\`/dashboard\`)

\`\`\`

┌─────────────────────────────────────────────┐

│ Your Reputation │

│ │

│ 78 / 100 │

│ \[Expert 🏆\] │

│ │

│ Vote Weight: 0.88 │

├─────────────────────────────────────────────┤

│ Stats │

│ • Votes Cast: 127 │

│ • Accuracy Rate: 76.5% │

│ • Proofs Submitted: 8 │

├─────────────────────────────────────────────┤

│ Recent Reputation Changes │

│ ┌─────────────────────────────────────────┐ │

│ │ +7 Correct Vote │ │

│ │ "Gym closing..." • 2 days ago │ │

│ ├─────────────────────────────────────────┤ │

│ │ -4 Incorrect Vote │ │

│ │ "Exam canceled" • 5 days ago │ │

│ └─────────────────────────────────────────┘ │

└─────────────────────────────────────────────┘

**9.5 Responsive Breakpoints**

css

/\* Mobile First \*/

@media (min-width: 640px) { /\* sm \*/ }

@media (min-width: 768px) { /\* md \*/ }

@media (min-width: 1024px) { /\* lg \*/ }

@media (min-width: 1280px) { /\* xl \*/ }

**9.6 Accessibility Requirements**

- **Keyboard Navigation**: All actions accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels on all interactive elements
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: Clear visual focus states
- **Error Messages**: Clear, actionable error descriptions

**10\. Security & Privacy**

**10.1 Threat Model**

**Threat 1: Sybil Attack (Multiple Accounts)**

**Attack**: Malicious actor creates 100 fake accounts to manipulate votes  
**Mitigation**:

- Email verification (only \*.nust.edu.pk)
- Device fingerprinting (max 5 devices per account)
- Probationary period (7 days, 50% vote weight)
- Rate limiting (5 rumors/hour per account)
- Behavioral analysis (flag rapid sequential voting)

**Threat 2: Vote Brigading**

**Attack**: Coordinated group votes on rumor within minutes  
**Mitigation**:

- Momentum score penalizes volatility (>0.4 delta)
- Temporal clustering detection (>50% votes within 10s)
- New account brigade detection (>60% voters <7 days old)
- Cartel detection (Jaccard similarity >0.8)
- Vote weight discounting for suspicious patterns

**Threat 3: Identity De-anonymization**

**Attack**: Admin tries to link votes to email addresses  
**Mitigation**:

- Blind token issuance (email→token mapping never stored)
- Email stored only as SHA-256 hash
- All posts attributed to "Anonymous Member"
- No IP address logging (except 24h rate limiting)
- Device fingerprints stored as hashes

**Threat 4: Reputation Farming**

**Attack**: User builds high reputation then attacks system  
**Mitigation**:

- Quadratic vote weighting (sqrt prevents oligarchy)
- Reputation decay over time (planned for v2)
- 3:1 penalty ratio for proof posters (deters fabrication)
- Frozen rumors prevent "farming" on old rumors

**Threat 5: Admin Manipulation**

**Attack**: Admin manually changes trust scores  
**Mitigation**:

- Open-source algorithm (on GitHub)
- Public audit log (all calculations logged)
- Independent verification (users can download data)
- Admin actions limited (can only delete for policy violations)
- Calculations cryptographically signed (future enhancement)

**10.2 Data Privacy**

**Personal Data Collected**

| **Data** | **Purpose** | **Storage** | **Retention** |
| --- | --- | --- | --- |
| Email (hashed) | Sybil prevention | Database | Permanent |
| Username | Display | Database | Permanent |
| Password (hashed) | Authentication | Database | Permanent |
| Device fingerprint (hashed) | Multi-device access | Database | Until revoked |
| Reputation score | Voting weight | Database | Permanent |
| Vote history | Trust calculation | Database | Permanent |
| IP address | Rate limiting | Upstash Redis | 24 hours |

**Data NOT Collected**

- ❌ Real names
- ❌ Phone numbers
- ❌ IP addresses (beyond 24h)
- ❌ Analytics cookies
- ❌ Third-party trackers
- ❌ Email→Token mapping

**GDPR Compliance (if applicable)**

- **Right to Access**: Users can download their data
- **Right to Erasure**: Account deletion (soft delete, preserve vote integrity)
- **Right to Rectification**: Users can update password/devices
- **Data Portability**: JSON export of votes/reputation
- **Privacy by Design**: Minimal data collection

**10.3 Content Moderation Policy**

**Admin Powers (Limited)**

Admins can ONLY delete rumors for:

- ✅ Spam (duplicate posts, nonsense)
- ✅ Harassment (targeted attacks, doxxing)
- ✅ Illegal content (copyright, illicit materials)
- ✅ Policy violations (off-topic, non-NUST related)

Admins CANNOT:

- ❌ Change trust scores
- ❌ Delete votes
- ❌ Modify algorithm
- ❌ Shadowban users
- ❌ Delete based on content accuracy (that's community's job)

**User Reporting**

- Users can flag rumors for review
- Flags go to admin queue
- Admin must select valid reason from list
- All admin actions logged publicly

**10.4 Incident Response Plan**

**Scenario 1: Sybil Attack Detected**

- Automated detection flags suspicious accounts
- Admins review flagged accounts
- If confirmed: accounts banned, votes invalidated
- Affected rumors recalculated
- Incident logged in audit trail

**Scenario 2: Data Breach**

- Immediately rotate all JWT secrets
- Force password reset for all users
- Notify affected users via email
- Publish incident report
- Engage security audit firm

**Scenario 3: Algorithm Bug**

- Freeze all trust score calculations
- Identify affected rumors
- Fix bug, deploy patch
- Recalculate affected rumors
- Publish transparency report

**11\. Performance Requirements**

**11.1 Performance Targets**

| **Metric** | **Target** | **Critical Threshold** |
| --- | --- | --- |
| **API Response Time (p95)** | <500ms | <1s |
| **Page Load (p95)** | <2s | <3s |
| **Trust Score Recalc** | <3s | <5s |
| **Real-time Latency** | <1s | <2s |
| **Database Query (p95)** | <100ms | <200ms |
| **Uptime** | 99.5% | 99.0% |

**11.2 Load Testing Requirements**

**Test Scenarios**:

- **Normal Load**: 100 concurrent users, 1000 requests/min
- **Peak Load**: 500 concurrent users, 5000 requests/min
- **Spike Load**: 0→1000 users in 30 seconds
- **Sustained Load**: 200 concurrent users for 6 hours

**Tools**: k6 (load testing), Lighthouse CI (frontend performance)

**11.3 Optimization Strategies**

**Backend Optimizations**:

- Database query optimization (SELECT only needed fields)
- Eager loading (avoid N+1 queries)
- Response caching (Upstash Redis, 5-minute TTL)
- Database connection pooling
- Async task queue (QStash)

**Frontend Optimizations**:

- Code splitting (Next.js automatic)
- Image optimization (next/image)
- Lazy loading (below-fold content)
- Memoization (useMemo, React.memo)
- Virtual scrolling (react-window for long lists)

**Database Optimizations**:

- Proper indexes (see schema)
- Materialized views for complex queries (future)
- Partitioning large tables (future)

**12\. Success Metrics**

**12.1 Product Metrics (OKRs)**

**Objective 1: User Adoption**

- KR1: 4,000 registered users by Month 6
- KR2: 50% weekly active user rate
- KR3: Average 3 votes per active user per week

**Objective 2: Content Quality**

- KR1: >70% of frozen rumors classified as VERIFIED_TRUE or VERIFIED_FALSE
- KR2: <20% classified as UNCERTAIN
- KR3: Average trust score of frozen rumors >0.60

**Objective 3: System Integrity**

- KR1: Zero successful Sybil attacks
- KR2: <5% of votes flagged as suspicious
- KR3: Average user reputation >55

**Objective 4: Platform Health**

- KR1: 99.5% uptime
- KR2: <500ms API response time (p95)
- KR3: <2s page load time (p95)

**12.2 Analytics & Tracking**

**User Metrics**:

- Daily/Weekly/Monthly Active Users (DAU/WAU/MAU)
- Registration funnel completion rate
- User retention (Day 1, Day 7, Day 30)
- Average reputation score

**Content Metrics**:

- Rumors posted per day
- Votes per rumor (average)
- Proofs submitted per rumor
- Frozen rumor classification distribution

**Engagement Metrics**:

- Time on site (average)
- Votes per active user (average)
- Vote accuracy rate
- Proof submission rate

**System Metrics**:

- API response time (p50, p95, p99)
- Database query time
- Trust score recalculation time
- Error rate (4xx, 5xx)

**Tools**:

- Supabase Analytics (database queries)
- Vercel Analytics (frontend performance)
- Custom logging (backend metrics)
- UptimeRobot (uptime monitoring)

**13\. Constraints & Assumptions**

**13.1 Technical Constraints**

- **Free Tier Limits**:
  - Supabase: 500MB database, 1GB storage
  - Render: 512MB RAM, shared CPU
  - Upstash Redis: 10k commands/day
  - Vercel: Unlimited bandwidth (fair use)
- **No WebSockets**:
  - Vercel doesn't support WebSockets
  - Solution: Use Supabase real-time subscriptions
- **No Persistent Workers**:
  - Render free tier doesn't support background workers
  - Solution: Use Upstash QStash HTTP triggers
- **Cold Starts**:
  - Render free tier has 30-60s cold start after inactivity
  - Solution: Use Uptime Robot to ping every 5 minutes

**13.2 Business Constraints**

- **University-Only**:
  - Platform limited to NUST students (\*.nust.edu.pk)
  - No expansion to other universities in MVP
- **Non-Commercial**:
  - No ads, no monetization
  - Fully funded by university or donations
- **English Only**:
  - No multi-language support in MVP
- **Pakistan Timezone**:
  - All timestamps in PKT (UTC+5)

**13.3 Assumptions**

- **User Behavior**:
  - ✅ Users value anonymity
  - ✅ Users will vote honestly to build reputation
  - ✅ Honest minority exists (>40% of users)
  - ⚠️ Users understand tri-state voting (may need education)
- **Technical**:
  - ✅ NUST email system is reliable (OTPs delivered)
  - ✅ Students have smartphones (70%+ mobile traffic)
  - ✅ Campus WiFi is stable (may need offline mode later)
  - ⚠️ Device fingerprinting works (may have false positives)
- **Security**:
  - ✅ SHA-256 email hashing is sufficient for anonymity
  - ✅ JWT tokens are secure enough (RS256 signing)
  - ⚠️ CAPTCHA prevents most bots (but not all)

**14\. Risks & Mitigations**

**14.1 Technical Risks**

| **Risk** | **Impact** | **Probability** | **Mitigation** |
| --- | --- | --- | --- |
| **Database size exceeds 500MB** | High | Medium | Archive old rumors, implement pagination |
| **Render cold starts cause timeouts** | Medium | High | Uptime Robot pings, upgrade to paid tier if needed |
| **Supabase real-time fails** | High | Low | Fallback to polling (5s intervals) |
| **QStash quota exceeded** | Medium | Low | Batch recalculations, upgrade to paid |
| **Device fingerprinting false positives** | Low | Medium | Allow manual device verification via OTP |

**14.2 Product Risks**

| **Risk** | **Impact** | **Probability** | **Mitigation** |
| --- | --- | --- | --- |
| **Low user adoption** | High | Medium | Campus marketing campaign, influencer endorsements |
| **High % of UNCERTAIN classifications** | Medium | Medium | Improve evidence guidelines, user education |
| **Users don't understand voting** | Medium | High | Onboarding tutorial, tooltips, help center |
| **Platform used for harassment** | High | Low | Strict content policy, fast admin response |
| **Competing platform launches** | Medium | Low | Emphasize unique features (transparency, math) |

**14.3 Security Risks**

| **Risk** | **Impact** | **Probability** | **Mitigation** |
| --- | --- | --- | --- |
| **Sybil attack via email farming** | High | Medium | Device fingerprinting, probation period, CAPTCHA |
| **Vote brigading** | Medium | Medium | Momentum score, volatility detection, cartel flagging |
| **Admin abuse of power** | High | Low | Audit logs, limited admin powers, transparency |
| **Reputation farming** | Medium | Low | Quadratic weighting, frozen rumor restrictions |
| **Identity de-anonymization** | Critical | Very Low | Blind token system, no email→user mapping |

**14.4 Business Risks**

| **Risk** | **Impact** | **Probability** | **Mitigation** |
| --- | --- | --- | --- |
| **University blocks platform** | Critical | Low | Engage administration early, emphasize benefits |
| **Funding runs out** | High | Medium | Minimize costs (free tier), seek university grant |
| **Legal liability for content** | High | Low | Terms of service, safe harbor provisions, no editorship |
| **Students graduate (churn)** | Medium | High | Continuous recruitment of new students |

**15\. Development Roadmap**

**15.1 Phase 1: MVP Development (Weeks 1-8)**

**Week 1-2: Foundation**

- ✅ Project setup (Next.js, Django, Supabase)
- ✅ Database schema creation
- ✅ Authentication system (OTP, device fingerprinting)
- ✅ Basic UI components (RumorCard, TrustMeter)

**Week 3-4: Core Features**

- ✅ Rumor CRUD operations
- ✅ Tri-state voting system
- ✅ Vote weight snapshot implementation
- ✅ Trust score calculation (V, P, M)

**Week 5-6: Proof System**

- ✅ Proof submission (text, photo, link)
- ✅ Proof voting system
- ✅ Proof maturity logic
- ✅ Proof score contribution to rumor trust

**Week 7-8: Reputation & Polish**

- ✅ Reputation settlement logic
- ✅ User dashboard
- ✅ Audit log
- ✅ UI polish, responsive design

**15.2 Phase 2: Beta Testing (Weeks 9-10)**

**Week 9: Internal Testing**

- ✅ Deploy to staging (Vercel/Render)
- ✅ Load testing (k6)
- ✅ Security audit
- ✅ Bug fixes

**Week 10: Beta Launch**

- ✅ Invite 200 beta testers
- ✅ Collect feedback
- ✅ Monitor metrics
- ✅ Iterate on UX issues

**15.3 Phase 3: Production Launch (Weeks 11-12)**

**Week 11: Pre-Launch**

- ✅ Final bug fixes
- ✅ Performance optimization
- ✅ Marketing materials
- ✅ Onboarding tutorial

**Week 12: Launch**

- ✅ Open registration to all NUST students
- ✅ Campus-wide announcement
- ✅ Monitor for issues
- ✅ 24/7 on-call support

**15.4 Phase 4: Post-Launch (Weeks 13+)**

**Immediate (Weeks 13-16)**:

- Feature: Comment threading
- Feature: Push notifications (via email)
- Improvement: Advanced bot detection
- Improvement: Better evidence verification

**Short-Term (Months 4-6)**:

- Feature: Mobile app (React Native)
- Feature: Proof EXIF checking
- Feature: Photo authenticity verification
- Improvement: Reputation decay system

**Long-Term (Months 7-12)**:

- Feature: Multi-university support
- Feature: Advanced analytics dashboard
- Feature: Machine learning for anomaly detection
- Research: Publish academic paper

**16\. Appendices**

**16.1 Glossary**

| **Term** | **Definition** |
| --- | --- |
| **Blind Token Issuance** | System generates voting token without linking it to user's email |
| **Byzantine Fault Tolerance** | System can handle up to 58.6% malicious actors |
| **Frozen Rumor** | Rumor that has reached Day 60; trust score permanently locked |
| **Mature Proof** | Proof that has received ≥10 votes; contributes to rumor trust score |
| **Momentum Score** | Trust score component analyzing temporal voting patterns |
| **Probationary Account** | New account (<7 days old) with limited privileges |
| **Reputation Settlement** | Process of distributing reputation adjustments on Day 60 |
| **Sybil Attack** | Creating multiple fake accounts to manipulate votes |
| **Tri-State Voting** | Three voting options: Verify, Uncertain, Dispute |
| **Vote Weight Snapshot** | Locked vote weight calculated at time of voting |

**16.2 Acronyms**

| **Acronym** | **Full Form** |
| --- | --- |
| **API** | Application Programming Interface |
| **CAPTCHA** | Completely Automated Public Turing test to tell Computers and Humans Apart |
| **CORS** | Cross-Origin Resource Sharing |
| **CRUD** | Create, Read, Update, Delete |
| **DRF** | Django REST Framework |
| **JWT** | JSON Web Token |
| **KR** | Key Result (in OKRs) |
| **MVP** | Minimum Viable Product |
| **OKR** | Objectives and Key Results |
| **ORM** | Object-Relational Mapping |
| **OTP** | One-Time Password |
| **PRD** | Product Requirements Document |
| **UI** | User Interface |
| **UX** | User Experience |
| **WCAG** | Web Content Accessibility Guidelines |

**16.3 References**

- **Anthropic's Claude Documentation**: <https://docs.anthropic.com>
- **Django Documentation**: <https://docs.djangoproject.com>
- **Next.js Documentation**: <https://nextjs.org/docs>
- **Supabase Documentation**: <https://supabase.com/docs>
- **Upstash Documentation**: <https://docs.upstash.com>
- **Research Papers**:
  - "The Wisdom of Crowds" by Surowiecki
  - "Byzantine Fault Tolerance in Decentralized Systems"
  - "Reputation Systems for Anonymous Networks"

**16.4 Change Log**

| **Version** | **Date** | **Changes** | **Author** |
| --- | --- | --- | --- |
| 1.0 | 2026-02-07 | Initial PRD | System Architecture Team |