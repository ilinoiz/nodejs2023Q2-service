# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Open project

```
cd nodejs2023Q2-service
```

## Checkout to develop branch

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Use env file

**create .env file and copy-paste lines from .env.example file**

Port is 4000 by default. You can change to another it in .env file

## Running application

```
npm start
```

## Testing

After application **running** open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Check linter errors:

```
npm run lint
```

## Implemented endpoints:

- Users (`/user`)
  | Method | Description | Query | Notes |
  |------|------|------|-----|
  | **GET** | _Get all list of users_ | `/user` | |
  | **GET** | _Get user by id_ | `/user/{id}` | {id} is _uuid_ |
  | **POST** | _Create user_ | `/user` |
  | **PUT** | _Update existing user's password_ | `/user/{id}` | {id} is _uuid_ |
  | **DELETE** | _Delete existing user_ | `/user/{id}` | {id} is _uuid_ |

JSON body for **POST**:

```
{
  "login": string,
  "password": string
}
```

JSON body for **PUT**:

```
{
  "oldPassword": string,
  "newPassword": string
}
```

- Tracks (`/track`)
  | Method | Description | Query | Notes |
  |------|------|------|-----|
  | **GET** | _Get all list of tracks_ | `/track` | |
  | **GET** | _Get track by id_ | `/track/{id}` | {id} is _uuid_ |
  | **POST** | _Create track_ | `/track` | |
  | **PUT** | _Update existing track's fields_ | `/track/{id}` | {id} is _uuid_ |
  | **DELETE** | _Delete existing track_ | `/track/{id}` | {id} is _uuid_ |

JSON body for **POST** and **PUT**:

```
{
    "name": string,
    "duration": number,
    "artistId": string | null,
    "albumId": string | null
}
```

- Artists (`/artist`)
  | Method | Description | Query | Notes |
  |------|------|------|-----|
  | **GET** | _Get all list of artists_ | `/artist` | |
  | **GET** | _Get artist by id_ | `/artist/{id}` | {id} is _uuid_ |
  | **POST** | _Create artist_ | `/artist` | |
  | **PUT** | _Update existing artist's fields_ | `/artist/{id}` | {id} is _uuid_ |
  | **DELETE** | _Delete existing artist_ | `/artist/{id}` | {id} is _uuid_ |

JSON body for **POST** and **PUT**:

```
{
    "name": string,
    "grammy": boolean
}
```

- Albums (`/album`)
  | Method | Description | Query | Notes |
  |------|------|------|-----|
  | **GET** | _Get all list of albums_ | `/album` | |
  | **GET** | _Get album by id_ | `/album/{id}` | {id} is _uuid_ |
  | **POST** | _Create album_ | `/album` | |
  | **PUT** | _Update existing album's fields_ | `/album/{id}` | {id} is _uuid_ |
  | **DELETE** | _Delete existing album_ | `/album/{id}` | {id} is _uuid_ |

JSON body for **POST** and **PUT**:

```
{
    "year": number,
    "name": string,
    "artistId": string | null
}
```

- Favorites (`/favs`)
  | Method | Description | Query | Notes |
  |------|------|------|-----|
  | **GET** | _Get all list of favorites_ | `/favs` | |
  | **POST** | _Add album to favorites_ | `/favs/album/{albumId}` | {albumId} is _uuid_ |
  | **DELETE** | _Delete album from favorites_ | `/favs/album/{albumId}` | {albumId} is _uuid_ |
  | **POST** | _Add track to favorites_ | `/favs/track/{trackId}` | {trackId} is _uuid_ |
  | **DELETE** | _Delete track from favorites_ | `/favs/track/{trackId}` | {trackId} is _uuid_ |
  | **POST** | _Add artist to favorites_ | `/favs/artist/{artistId}` | {artistId} is _uuid_ |
  | **DELETE** | _Delete artist from favorites_ | `/favs/artist/{artistId}` | {artistId} is _uuid_ |
