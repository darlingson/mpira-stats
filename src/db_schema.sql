CREATE TABLE Teams (
    TeamID UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    Name VARCHAR(100) NOT NULL UNIQUE,
    Slug VARCHAR(100) NOT NULL UNIQUE,
    City VARCHAR(100),
    FoundedYear INT,
    Stadium VARCHAR(100)
);
CREATE TABLE Players (
    PlayerID UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    Name VARCHAR(100) NOT NULL,
    Slug VARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Nationality VARCHAR(100),
    Position VARCHAR(50),
);
CREATE TABLE Matches (
    MatchID UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    HomeTeamID UUID NOT NULL,
    AwayTeamID UUID NOT NULL,
    MatchDate DATE NOT NULL,
    Venue VARCHAR(255) NOT NULL,
    MatchType VARCHAR(50) NOT NULL CHECK (MatchType IN ('league', 'championship', 'friendly', 'cup')),
    Tournament VARCHAR(255),
    Stage VARCHAR(50) CHECK (Stage IN ('round', 'quarterfinal', 'semifinal', 'final')),
    FOREIGN KEY (HomeTeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (AwayTeamID) REFERENCES Teams(TeamID)
);
CREATE TABLE GoalEvents (
    GoalEventID UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    PlayerID UUID NOT NULL,
    MatchID UUID NOT NULL,
    OpponentTeamID UUID NOT NULL,
    GoalTime TIME NOT NULL,
    GoalType VARCHAR(50) NOT NULL CHECK (GoalType IN ('set_piece', 'open_play')),
    AssistID UUID,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID),
    FOREIGN KEY (OpponentTeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (AssistID) REFERENCES Players(PlayerID)
);
