CREATE TABLE Teams
(
    TeamID      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Name        VARCHAR(100) NOT NULL UNIQUE,
    Slug        VARCHAR(100) NOT NULL UNIQUE,
    City        VARCHAR(100),
    FoundedYear INT,
    Stadium     VARCHAR(100)
);
CREATE TABLE Players
(
    PlayerID    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Name        VARCHAR(100) NOT NULL,
    Slug        VARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE         NOT NULL,
    Nationality VARCHAR(100),
    Position    VARCHAR(50),
);
CREATE TABLE Matches
(
    MatchID    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    HomeTeamID UUID         NOT NULL,
    AwayTeamID UUID         NOT NULL,
    MatchDate  DATE         NOT NULL,
    Venue      VARCHAR(255) NOT NULL,
    MatchType  VARCHAR(50)  NOT NULL CHECK (MatchType IN ('league', 'championship', 'friendly', 'cup')),
    Tournament VARCHAR(255),
    Stage      VARCHAR(50) CHECK (Stage IN ('round', 'quarterfinal', 'semifinal', 'final')),
    FOREIGN KEY (HomeTeamID) REFERENCES Teams (TeamID),
    FOREIGN KEY (AwayTeamID) REFERENCES Teams (TeamID)
);
CREATE TABLE GoalEvents
(
    GoalEventID    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    PlayerID       UUID        NOT NULL,
    MatchID        UUID        NOT NULL,
    OpponentTeamID UUID        NOT NULL,
    GoalTime       TIME        NOT NULL,
    GoalType       VARCHAR(50) NOT NULL CHECK (GoalType IN ('set_piece', 'open_play')),
    AssistID       UUID,
    FOREIGN KEY (PlayerID) REFERENCES Players (PlayerID),
    FOREIGN KEY (MatchID) REFERENCES Matches (MatchID),
    FOREIGN KEY (OpponentTeamID) REFERENCES Teams (TeamID),
    FOREIGN KEY (AssistID) REFERENCES Players (PlayerID)
);

-- Match 1: FCB Nyasa Big Bullets vs Mighty Mukuru Wanderers (League match)
INSERT INTO Matches (MatchID, HomeTeamID, AwayTeamID, MatchDate, Venue, MatchType, Tournament, Stage)
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'b72902ab-37ea-48c0-822d-3da316fb3eb5', -- FCB Nyasa Big Bullets
        '78cd5cc5-dfd8-493e-ba52-4581b33e3359', -- Mighty Mukuru Wanderers
        '2024-01-05',
        'Kamuzu Stadium',
        'league',
        'Super League',
        'round');

INSERT INTO GoalEvents (PlayerID, MatchID, OpponentTeamID, GoalTime, GoalType, AssistID)
VALUES ('1f9a7f6c-7503-448b-8dfa-e8c7af40bb75', -- Bob Longwe
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        '78cd5cc5-dfd8-493e-ba52-4581b33e3359',
        '14:23:00',
        'open_play',
        '8b659f73-c4f9-42d9-909f-3fd0e0e4a766'), -- Abraham Mwandenga assist
       ('35a9d93b-86dd-4ae3-b673-33e6b9a47975', -- Nature Kaonga
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        '78cd5cc5-dfd8-493e-ba52-4581b33e3359',
        '14:45:00',
        'set_piece',
        NULL);

-- Match 2: Silver Strikers vs MAFCO (League match)
INSERT INTO Matches (MatchID, HomeTeamID, AwayTeamID, MatchDate, Venue, MatchType, Tournament, Stage)
VALUES ('550e8400-e29b-41d4-a716-446655440000',
        'ca40e6c2-a97b-4b42-8aa7-c8538438262d', -- Silver Strikers
        '2cbf9340-a463-42e5-a987-5c29eb402de8', -- MAFCO
        '2024-01-06',
        'Silver Stadium',
        'league',
        'Super League',
        'round');

INSERT INTO GoalEvents (PlayerID, MatchID, OpponentTeamID, GoalTime, GoalType, AssistID)
VALUES ('71e762f8-228f-442e-9e29-7e93f25cbf5b', -- Binwell Katinji
        '550e8400-e29b-41d4-a716-446655440000',
        '2cbf9340-a463-42e5-a987-5c29eb402de8',
        '15:15:00',
        'open_play',
        '62333c3e-78d3-428a-8c81-a4166f97988b');
-- Stenie Davie assist

-- Match 3: Moyale Barracks vs FCB Nyasa Big Bullets (League match)
INSERT INTO Matches (MatchID, HomeTeamID, AwayTeamID, MatchDate, Venue, MatchType, Tournament, Stage)
VALUES ('6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '3c4d825a-2401-4152-9908-03249c85a8eb', -- Moyale Barracks
        'b72902ab-37ea-48c0-822d-3da316fb3eb5', -- FCB Nyasa Big Bullets
        '2024-01-12',
        'Moyale Barracks Stadium',
        'league',
        'Super League',
        'round');

INSERT INTO GoalEvents (PlayerID, MatchID, OpponentTeamID, GoalTime, GoalType, AssistID)
VALUES ('e08d030b-8fc2-4f76-a48c-9ff596af8282', -- Daudi Saiti
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '3c4d825a-2401-4152-9908-03249c85a8eb',
        '16:28:00',
        'set_piece',
        NULL);

-- Match 4: Mighty Mukuru Wanderers vs Silver Strikers (Cup match)
INSERT INTO Matches (MatchID, HomeTeamID, AwayTeamID, MatchDate, Venue, MatchType, Tournament, Stage)
VALUES ('7ca7c920-0ebe-21e2-91c5-11d15fd541d9',
        '78cd5cc5-dfd8-493e-ba52-4581b33e3359', -- Mighty Mukuru Wanderers
        'ca40e6c2-a97b-4b42-8aa7-c8538438262d', -- Silver Strikers
        '2024-01-19',
        'Kamuzu Stadium',
        'cup',
        'FDH Cup',
        'quarterfinal');

INSERT INTO GoalEvents (PlayerID, MatchID, OpponentTeamID, GoalTime, GoalType, AssistID)
VALUES ('9cfeb0e7-603d-4200-b971-b08f36cb9f29', -- Adiel Kaduya
        '7ca7c920-0ebe-21e2-91c5-11d15fd541d9',
        'ca40e6c2-a97b-4b42-8aa7-c8538438262d',
        '17:05:00',
        'open_play',
        '88f2ea57-ff33-4954-acc1-a276122d6bec'); -- Chikondi Kamanga assist