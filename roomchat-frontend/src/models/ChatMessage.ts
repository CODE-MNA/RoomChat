export type ChatMessage = {
    sender: string,
    message: string,
    UTC_timestamp: string,
    mine?:boolean,
    error?: boolean
}

