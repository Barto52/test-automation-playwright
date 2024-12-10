import userAvatarsArray from '@_src/data/userAvatars.data';

export function getRandomAvatarId(): string {
    if (userAvatarsArray.length === 0) {
        console.warn(`The userAvatarArray is empty.`);
    }
    const randomAvatarId = userAvatarsArray[Math.floor(Math.random() * userAvatarsArray.length)];
    return randomAvatarId;
}
