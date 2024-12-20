import {getNormalizedString} from './getNormalizedStrings.helper';
import {fakerPL} from '@faker-js/faker';

import {UserDataInterface} from '@_src/interfaces/userData.interface';

//TODO: move to factory
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

export function generateUserPassword(length = 15): string {
    return fakerPL.internet.password({length});
}

export function generateUserData(): UserDataInterface {
    const userFirstName = generateFirstName();
    const userLastName = generateLastName();

    const userData = {
        firstName: userFirstName,
        lastName: userLastName,
        email: generateEmail(userFirstName, userLastName),
        birthDate: generateUserBirthDate(),
        password: generateUserPassword(),
    };
    return userData;
}
