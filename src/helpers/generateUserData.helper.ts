import {getNormalizedString} from './getNormalizedStrings.helper';
import {fakerPL} from '@faker-js/faker';

import {UserData} from '@_src/interfaces/userData.interface';

export function generateFirstName(): string {
    const firstName = fakerPL.person.firstName();
    return getNormalizedString(firstName);
}

export function generateLastName(): string {
    const lastName = fakerPL.person.lastName();
    return getNormalizedString(lastName);
}

export function generateEmail(userFirstName: string, userLastName: string): string {
    const userEmail = fakerPL.internet.email({
        firstName: userFirstName,
        lastName: userLastName,
    });
    return getNormalizedString(userEmail);
}

export function generateUserBirthDate(): string {
    return fakerPL.date.birthdate({mode: 'age', min: 18, max: 99}).toISOString().split('T')[0];
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
