# Backend Dockerfile

# Step 1: Build the project
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /myapp
COPY myapp/pom.xml ./
COPY myapp/src ./
RUN mvn clean package -DskipTests

# Step 2: Run the project
FROM openjdk:17-jdk-slim
WORKDIR /myapp
COPY --from=build myapp/target/myapp-0.0.1-SNAPSHOT.jar /myapp/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Replace 'your-app-name.jar' with your actual jar file name
