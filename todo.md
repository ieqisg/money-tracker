mvc notes:
POST,DELETE,INSERT,UPDATE:
Client -> Routes (receives request from client) -> Middleware (validates authentication) -> Controller (extracts request data) -> Service (business rules) -> Models(interacts with the database) -> Database

GET:
Dtabase -> Model -> Service -> Controller -> Client


Authentication:
Double check if client directly talks to the database
Protect routes using session
Check how the data flow

Add a github contributions like for savings 
