import {Locator} from '@playwright/test';

export async function getTextValueFromElement(locator: Locator): Promise<string> {
    const textContent = (await locator.textContent()).trim();
    if (!textContent) {
        throw new Error('An element has no text content.');
    }
    return textContent;
}
