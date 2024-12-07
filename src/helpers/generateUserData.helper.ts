import {UserData} from '@_src/interfaces/userData.interface';
import {fakerPL} from '@faker-js/faker';

export function generateFirstName(): string {
    return fakerPL.person.firstName();
}

export function generateLastName(): string {
    return fakerPL.person.lastName();
}

export function generateEmail(userFirstName, userLastName): string {
    return fakerPL.internet.email({
        firstName: userFirstName,
        lastName: userLastName,
    });
}

export function generateUserBirthDate(): string {
    return fakerPL.date.birthdate({mode: 'age', min: 18, max: 99}).toString();
}

export function generateUserPassword(): string {
    return fakerPL.internet.password({length: 15});
}

export function generateUserData(): UserData {
    const firstName = generateFirstName();
    const lastName = generateLastName();

    const userData = {
        userFirstName: firstName,
        userLastName: lastName,
        userEmail: generateEmail(firstName, lastName),
        userBirthDate: generateUserBirthDate(),
        userPassword: generateUserPassword(),
    };
    return userData;
}
