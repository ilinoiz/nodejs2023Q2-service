# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=hls

# Optionally, you can set other environment variables for PostgreSQL configuration
# ENV POSTGRES_HOST=...
# ENV POSTGRES_PORT=...

# Expose the PostgreSQL default port (5432)
EXPOSE 5432