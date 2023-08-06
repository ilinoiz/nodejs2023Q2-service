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
git checkout develop-part2
```

## Installing NPM modules

```
npm install
```

## Use env file

**create .env file and copy-paste lines from .env.example file**

Port is 4000 by default. You can change to another one in .env file

## Running application with docker

To run docker use

```
docker network create home-library-service
```

then start application

```
npm run start:docker
```

and finally apply migration in another terminal (in parallel with docker)

```
npm run db:migrations:apply
```

now you can use app (running tests, call from postman, execute database, etc.)

## Running script for vulnerabilities scanning

About Docker scout: https://github.com/docker/scout-cli

You have to install docker scout from link: https://github.com/docker/scout-cli/releases/tag/v0.22.3 (docker-scout_0.22.3_windows_amd64.zip - for **windows**)

Unpack zip file and copy it in your local CLI plugin directory!!!!!

`%USERPROFILE%\.docker\cli-plugins` on Windows (for me it's C:\Users\Username\\.docker\cli-plugins)

then run:

for api

```
npm run vulnerability-scan:api
```

for db

```
npm run vulnerability-scan:db
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
