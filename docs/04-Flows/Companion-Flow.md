# Companion Flow

This sequence diagram illustrates the behavior when a User creates a new Companion Request and another user accepts it. 

Sequence diagrams are prioritized over static ER diagrams here because they clearly demonstrate system behavior, cross-domain communication, and the asynchronous nature of certain tasks (like notifications).

## Create Companion Request

```mermaid
sequenceDiagram
    autonumber
    
    actor U1 as User (Creator)
    participant FE as Frontend (React)
    participant API as Backend API (Bun)
    participant DB as Database (Postgres)
    participant Notif as Notification Service
    actor U2 as Other User (Invitee)
    participant Exp as Experience Module

    %% Creation Phase
    U1->>FE: Fills out Companion Request
    FE->>API: POST /companions
    API->>API: Validation (Zod)
    API->>DB: Save Companion Request
    DB-->>API: Returns Request ID
    API->>Notif: Trigger Notification Event
    API-->>FE: 201 Created
    FE-->>U1: Shows success message

    %% Notification Phase
    Notif->>U2: Sends Push/Email Notification (Companion Request)
    
    %% Acceptance Phase
    U2->>FE: Clicks "Accept"
    FE->>API: PATCH /companions/{id}/accept
    API->>DB: Update Status to 'Accepted'
    
    %% Cross-Domain Event
    API->>Exp: Trigger Experience Created Event
    Exp->>DB: Create new Experience record
    
    API-->>FE: 200 OK
    FE-->>U2: Shows matched screen
    
    %% Notify Creator
    API->>Notif: Trigger Notification Event
    Notif->>U1: Sends "Request Accepted" Notification
```
