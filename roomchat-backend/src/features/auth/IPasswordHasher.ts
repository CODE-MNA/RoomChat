export type IPasswordHasher = {
    hash : (value: string) => string
}

export class FakePasswordHasher implements IPasswordHasher {
    hash(value: string): string {
        return value
    }

}