import {fakerPL} from '@faker-js/faker';

import {getNormalizedString} from '@_src/helpers/getNormalizedString.helper';
import {UserDataInterface} from '@_src/interfaces/userData.interface';

export class UserDataFactory {
    generateFirstName(): string {
        const firstName = fakerPL.person.firstName();
        return getNormalizedString(firstName);
    }

    generateLastName(): string {
        const lastName = fakerPL.person.lastName();
        return getNormalizedString(lastName);
    }

    generateEmail(userFirstName: string, userLastName: string): string {
        const userEmail = fakerPL.internet.email({
            firstName: userFirstName,
            lastName: userLastName,
        });
        return getNormalizedString(userEmail);
    }

    generateUserBirthDate(): string {
        return fakerPL.date.birthdate({mode: 'age', min: 18, max: 99}).toISOString().split('T')[0];
    }

    generateUserPassword(length = 15): string {
        return fakerPL.internet.password({length});
    }

    generateUserData(): UserDataInterface {
        const userFirstName = this.generateFirstName();
        const userLastName = this.generateLastName();

        const userData = {
            firstName: userFirstName,
            lastName: userLastName,
            email: this.generateEmail(userFirstName, userLastName),
            birthDate: this.generateUserBirthDate(),
            password: this.generateUserPassword(),
        };
        return userData;
    }
}
