# Experience Flow

This document outlines the behavior and sequence of events when an Experience is completed. It demonstrates how multiple domains interact sequentially (Experience -> Feedback -> Aura -> Atlas -> Discover).

## Complete Experience Flow

```mermaid
sequenceDiagram
    autonumber
    
    actor U as User
    participant FE as Frontend (React)
    participant Exp as Experience Module
    participant Aura as Aura Module
    participant Atlas as Atlas Module
    participant Recs as Discover Module

    %% Experience Completion
    Exp->>Exp: Experience Scheduled End Time Reached
    Exp->>U: Prompts for Feedback
    
    %% Feedback Phase
    U->>FE: Submits Experience Feedback
    FE->>Exp: POST /experiences/{id}/feedback
    Exp-->>FE: 200 OK
    
    %% Aura Update (Reputation)
    Exp->>Aura: Trigger Event: Feedback Received
    Aura->>Aura: Calculate new Aura Score
    Aura->>Aura: Update User Reputation

    %% Atlas Update (Memory)
    Exp->>Atlas: Trigger Event: Experience Completed
    Atlas->>Atlas: Create new Atlas Memory (Journal/Map entry)
    
    %% Recommendations Update
    Atlas->>Recs: Trigger Event: Atlas Updated
    Recs->>Recs: Recalculate Recommendations for User
    
    %% Final State
    FE->>FE: Update UI with new Aura score and Atlas entry
```
