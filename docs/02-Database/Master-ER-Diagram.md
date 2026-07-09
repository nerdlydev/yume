# Master ER Diagram

While each domain manages its own data and schemas, this high-level master Entity-Relationship Diagram visualizes the conceptual relationships between the core entities across the Yume platform.

> [!NOTE]
> Physical foreign keys may not exist between bounded contexts to enforce strict domain isolation. Relationships are logically enforced via application logic (Drizzle ORM) or domain events.

```mermaid
erDiagram
    %% Identity Domain
    USERS {
        uuid id PK
        string email
        string hashed_password
        timestamp created_at
    }
    
    PROFILES {
        uuid user_id FK
        string username
        string bio
        string avatar_url
    }

    %% Aura Domain
    AURAS {
        uuid user_id FK
        float score
        int total_ratings
    }

    %% Companion Domain
    COMPANION_REQUESTS {
        uuid id PK
        uuid creator_id FK
        string activity_type
        string status
        timestamp created_at
    }

    COMPANION_INVITES {
        uuid request_id FK
        uuid invitee_id FK
        string status
    }

    %% Places Domain
    PLACES {
        uuid id PK
        string name
        point location
        string category
    }

    %% Experience Domain
    EXPERIENCES {
        uuid id PK
        uuid place_id FK
        string title
        timestamp start_time
        string status
    }

    EXPERIENCE_PARTICIPANTS {
        uuid experience_id FK
        uuid user_id FK
    }

    %% Journey Domain
    JOURNEY_MEMORIES {
        uuid id PK
        uuid user_id FK
        uuid experience_id FK
        string description
        jsonb media_urls
    }

    %% Relationships
    USERS ||--|| PROFILES : "has"
    USERS ||--|| AURAS : "has"
    USERS ||--o{ COMPANION_REQUESTS : "creates"
    USERS ||--o{ COMPANION_INVITES : "receives"
    
    COMPANION_REQUESTS ||--o{ COMPANION_INVITES : "includes"
    
    EXPERIENCES }o--|| PLACES : "hosted at"
    EXPERIENCES ||--o{ EXPERIENCE_PARTICIPANTS : "has"
    USERS ||--o{ EXPERIENCE_PARTICIPANTS : "joins"
    
    USERS ||--o{ JOURNEY_MEMORIES : "records"
    EXPERIENCES ||--o{ JOURNEY_MEMORIES : "generates"
```
