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
